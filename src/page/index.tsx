import { useEffect, useState } from "react";
import {
  useReadContract,
  useAccount,
  useWriteContract,
  usePublicClient,
} from "wagmi";
import { selectERC1229 } from "../lib/features/contract/contractSlice";
import { setInfo, Info } from "../lib/features/info/infoSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import convertBigIntToString from "../lib/utils/bigInt2string";
import { selectInfo } from "../lib/features/info/infoSlice";
import { FormattedMessage } from "react-intl";
import { useError } from "../hooks/useError";

import Noticebar from "./Noticebar";
import DataSection from "./DataSection";
import BuyNode from "./BuyNode";
import PlatformPreSale from "./PlatformPreSale";
import PlatformAirdrop from "./PlatformAirdrop";
import AggregateAirdrop from "./AggregateAirdrop";
import Pledge from "./Stake";
import Meeting from "./Meeting";
import Footer from "../components/Footer";
import ErrorResult from "../components/ErrorResult";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

type Status = "normal" | "error" | "register" | "registered";
const checkAddressRegistered = (info: Info): boolean => {
  const { account_info } = info || {};
  const { parent } = account_info || {};
  const noParent =
    !parent || parent === "0x0000000000000000000000000000000000000000";

  return !noParent;
};

function Page() {
  const dispatch = useAppDispatch();
  const { showError } = useError();
  const ERC1229Contract = useAppSelector(selectERC1229);
  const { address } = useAccount();
  const info = useAppSelector(selectInfo);
  const noParent = !checkAddressRegistered(info);
  const url = window.location.href;
  const urlObj = new URL(url);
  const invitationValue = urlObj.searchParams.get("invitation");
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");
  const [status, setStatus] = useState<Status>("normal");

  // console.log("info", info);
  

  const { data, refetch, isLoading } = useReadContract({
    ...ERC1229Contract,
    functionName: "getinfo",
    args: [address],
  });

  const { refetch: getInvitationInfo } = useReadContract({
    ...ERC1229Contract,
    functionName: "getinfo",
    args: [invitationValue],
    query: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (data) {
      const info = convertBigIntToString(data);

      dispatch(setInfo(info as Info));
    }
  }, [data, dispatch]);

  useEffect(() => {
    let isMounted = true;

    if (!invitationValue || !noParent) {
      setStatus("normal");
      setErrorInfo("");
      setLoading(false);

      return;
    }

    setLoading(true);

    getInvitationInfo()
      .then(({ data }) => {
        if (!isMounted) return;

        const info = convertBigIntToString(data) as Info;
        const isInvitationRegistered = checkAddressRegistered(info);

        setLoading(false);

        if (!isInvitationRegistered) {
          setStatus("error");
          setErrorInfo("无效的邀请链接");
        } else {
          setStatus("register");
          setErrorInfo("");
        }
      })
      .catch((error) => {
        if (!isMounted) return;

        showError(JSON.stringify(error));
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [getInvitationInfo, invitationValue, noParent, showError]);

  const register = async () => {
    try {
      setLoading(true);

      const params = {
        ...ERC1229Contract,
        functionName: "register",
        args: [invitationValue],
        account: address,
      };

      const gas = await publicClient!.estimateContractGas(params);

      const { request } = await publicClient!.simulateContract({
        ...params,
        gas,
      });

      const hash = await writeContractAsync(request);

      await publicClient!.waitForTransactionReceipt({
        hash,
      });

      location.reload();

      // setErrorInfo(`Succeed! \n hash: ${hash}`);
      // setStatus("registered");
      // setLoading(false);
      refetch();
    } catch (error) {
      setLoading(false);
      setIsModalOpen(true);

      if (error && typeof error === "object" && "shortMessage" in error) {
        setErrorInfo(error.shortMessage as string);
      } else if (error && typeof error === "object" && "message" in error) {
        setErrorInfo(error.message as string);
      } else {
        console.log(error);
        setErrorInfo(error as string);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading || isLoading) {
    return <Loading />;
  }

  if (noParent && !invitationValue) {
    return (
      <ErrorResult>
        <FormattedMessage id="请通过邀请链接注册" />
      </ErrorResult>
    );
  }

  if (status === "error") {
    return (
      <ErrorResult>
        <FormattedMessage id={errorInfo} />
      </ErrorResult>
    );
  }

  if (status === "register") {
    return (
      <ErrorResult>
        <button
          onClick={register}
          type="button"
          className="w-full bg-[#0DD585]/20 px-[3em] py-[1em] flex items-center justify-center gap-[0.25em] rounded-[0.5em]"
        >
          <FormattedMessage id="立即注册" />
        </button>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="px-[1em] py-[1.5em]">
            <p className="text-[0.875em] leading-normal">{errorInfo}</p>
          </div>
        </Modal>
      </ErrorResult>
    );
  }

  if (status === "registered") {
    return (
      <ErrorResult>
        <div>
          <FormattedMessage id="registered" />
        </div>

        <a href={`https://testnet.bscscan.com/tx/${errorInfo}`} target="_blank">
          <button
            onClick={register}
            type="button"
            className="w-full bg-[#0DD585]/20 px-[3em] py-[1em] flex items-center justify-center gap-[0.25em] rounded-[0.5em]"
          >
            <FormattedMessage id="查看注册进度" />
          </button>
        </a>
      </ErrorResult>
    );
  }

  return (
    <main>
      <Noticebar />

      <DataSection />

      <BuyNode />

      <PlatformPreSale />

      <PlatformAirdrop />

      <AggregateAirdrop />

      <Pledge />

      <Meeting />

      <Footer />
    </main>
  );
}

export default Page;
