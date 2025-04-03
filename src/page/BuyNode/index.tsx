import { useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  useReadContract,
  usePublicClient,
  useWriteContract,
  useAccount,
} from "wagmi";
import { DateTime } from "luxon";
import BigNumber from "bignumber.js";
import {
  selectERC1229,
  selectTtoken,
} from "../../lib/features/contract/contractSlice";
import { selectInfo } from "../../lib/features/info/infoSlice";
import { selectIsEn } from "../../lib/features/locale/localeSlice";
import { useAppSelector } from "../../lib/hooks";
import Modal from "../../components/Modal";
import { useError } from "../../hooks/useError";
import node from "/node.png";
import airdrop from "/airdrop.png";
import ambassador from "/ambassador.png";
import question from "/question.png";
import dollar from "/dollar.png";
import time from "/time.png";
import cart from "/cart.png";
import Loading from "../../components/Loading";

const statusEnum = {
  ambassador: 2,
  vip: 1,
  node: 0,
};

export default function BuyNode() {
  const { showError } = useError();
  const isEn = useAppSelector(selectIsEn);
  const info = useAppSelector(selectInfo);
  const { account_info } = info || {};
  const { buy_flag } = account_info || {};
  const publicClient = usePublicClient();
  const ERC1229Contract = useAppSelector(selectERC1229);
  const TtokenContract = useAppSelector(selectTtoken);
  const [infoId, setInfoId] = useState("nodeInfo");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useReadContract({
    ...ERC1229Contract,
    functionName: "get_product_infos",
  });
  const { writeContractAsync } = useWriteContract();
  const [loading, setLoading] = useState(false);
  const usdtAddress = info?.systeminfo?.longinfo?.usdt || "0x";
  const { address } = useAccount();

  if (
    buy_flag ||
    !Array.isArray(data) ||
    (Array.isArray(data) && data.length === 0)
  ) {
    return null;
  }

  const Img = ({ info }: { info: string }) => {
    switch (info) {
      case "ambassador":
        return (
          <div className="w-[3.125em] h-[3.125em] p-[0.1875em] rounded-full bg-[#BD4193]/20">
            <img src={ambassador} alt="" className="w-full h-full" />
          </div>
        );

      case "vip":
        return (
          <div className="w-[3.125em] h-[3.125em] p-[0.1875em] rounded-full bg-[#56AD62]/20">
            <img src={airdrop} alt="" className="w-full h-full" />
          </div>
        );

      default:
        return (
          <div className="w-[3.125em] h-[3.125em] p-[0.1875em] rounded-full bg-[#5265A7]/20">
            <img src={node} alt="" className="w-full h-full" />
          </div>
        );
    }
  };

  const Title = ({ info }: { info: string }) => {
    switch (info) {
      case "ambassador":
        return (
          <div
            className={`${
              isEn ? "text-[1em]" : "text-[1.125em]"
            } font-medium bg-clip-text text-transparent bg-[linear-gradient(0deg,#EEB1FD_0.3662109375%,#FFFFFF_100%)]`}
          >
            <FormattedMessage id="参与大使" />
          </div>
        );

      case "vip":
        return (
          <div
            className={`${
              isEn ? "text-[1em]" : "text-[1.125em]"
            } font-medium bg-clip-text text-transparent bg-[linear-gradient(0deg,#C3F69A_0.3662109375%,#FFFFFF_100%)]`}
          >
            <FormattedMessage id="参与空投" />
          </div>
        );

      default:
        return (
          <div
            className={`${
              isEn ? "text-[1em]" : "text-[1.125em]"
            } font-medium bg-clip-text text-transparent bg-[linear-gradient(0deg,#AFECFB_0.3662109375%,#FFFFFF_100%)]`}
          >
            <FormattedMessage id="参与节点" />
          </div>
        );
    }
  };

  const TimeTag = ({
    start,
    end,
    now,
  }: {
    start: number;
    end: number;
    now: number;
  }) => {
    // 待开放
    if (now < start) {
      return (
        <div className="bg-[#FF8B2D]/20 rounded-[0.125em] p-[0.1875em]">
          <div className="text-[0.75em] text-[#FF8B2D]">
            <FormattedMessage id="等待开放" />
          </div>
        </div>
      );
    }

    // 已结束
    if (now > end) {
      <div className="bg-[#7396A7]/20 rounded-[0.125em] p-[0.1875em]">
        <div className="text-[0.75em] text-[#7396A7]">
          <FormattedMessage id="已经结束" />
        </div>
      </div>;
    }

    // 进行中
    return (
      <div className="bg-[#0DD585]/20 rounded-[0.125em] p-[0.1875em]">
        <div className="text-[0.75em] text-[#0DD585]">
          <FormattedMessage id="正在进行" />
        </div>
      </div>
    );
  };

  const openModal = (info: string) => () => {
    switch (info) {
      case "ambassador":
        setInfoId("ambassadorInfo");
        break;
      case "vip":
        setInfoId("vipInfo");
        break;

      default:
        setInfoId("nodeInfo");
        break;
    }

    setIsModalOpen(true);
  };

  const buy = (info: string, price: string) => async () => {
    try {
      const status = statusEnum[info as keyof typeof statusEnum];

      setLoading(true);

      const approveParam = {
        address: usdtAddress!,
        abi: TtokenContract!.abi,
        functionName: "approve",
        args: [ERC1229Contract.address, BigInt(price)],
        account: address,
      };

      const approveGas = await publicClient!.estimateContractGas(approveParam);

      const { request: approve } = await publicClient!.simulateContract({
        ...approveParam,
        gas: approveGas,
      });

      const approveHash = await writeContractAsync(approve);

      await publicClient!.waitForTransactionReceipt({
        hash: approveHash,
      });

      const buyParams = {
        ...ERC1229Contract,
        functionName: "buy",
        args: [`${status}`],
        account: address,
      };

      const gas = await publicClient!.estimateContractGas(buyParams);

      const { request } = await publicClient!.simulateContract({
        ...buyParams,
        gas,
      });

      const hash = await writeContractAsync(request);

      showError(`Succeed! \n hash: ${hash}`);

      await publicClient!.waitForTransactionReceipt({
        hash,
      });

      location.reload();

      // setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error && typeof error === "object" && "shortMessage" in error) {
        showError(error.shortMessage as string);
      } else if (error && typeof error === "object" && "message" in error) {
        showError(error.message as string);
      } else {
        showError(JSON.stringify(error));
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="px-[0.75em]">
      <div className="py-[1.125em] font-bold">
        <FormattedMessage id="购买节点" />
      </div>

      <div className="bg-white/5 px-[0.625em] py-[0.75em] rounded-[0.4375em] flex flex-col gap-[0.75em]">
        {data.map(({ info, price, time_start, time_end }) => {
          const start = Number(time_start || 0);
          const end = Number(time_end || 0);
          const now = DateTime.now().toSeconds();
          const isStart = now > start;

          return (
            <div
              key={info}
              className="bg-[#041323] p-[0.625em] rounded-[0.4375em] relative"
            >
              {isEn && (
                <div className="flex items-center justify-end gap-[0.1875em]">
                  {/* 未参与Tag */}
                  <div className="bg-[#7396A7]/20 rounded-[0.125em] p-[0.1875em]">
                    <div className="text-[0.75em] text-[#7396A7]">
                      <FormattedMessage id="未参与" />
                    </div>
                  </div>

                  {/* 已参与Tag */}
                  {/* <div className="bg-[#1691FF]/20 rounded-[0.125em] p-[0.1875em]">
                    <div className="text-[0.75em] text-[#1691FF]">
                      <FormattedMessage id="已参与" />
                    </div>
                  </div> */}

                  <TimeTag start={start} end={end} now={now} />
                </div>
              )}

              <div className="flex items-stretch gap-[0.5em]">
                <Img info={info} />

                <div className="pt-[0.125em] flex-1 flex flex-col justify-between">
                  <div className="flex items-center gap-[0.5em]">
                    <Title info={info} />

                    <div className="pt-[0.125em]">
                      <img
                        src={question}
                        alt=""
                        className="size-[0.875em]"
                        onClick={openModal(info)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-[0.5em] lg:pl-0">
                    <div className="flex items-center gap-[0.5em]">
                      <div className="flex items-center gap-[0.25em]">
                        <img
                          src={dollar}
                          alt=""
                          className="w-[0.75em] h-[0.75em]"
                        />

                        <div className="w-[3.5em]">
                          <p className="text-[#B2C5D2] text-[0.75em]">
                            {BigNumber(price || 0)
                              .dividedBy(1e18)
                              .toFormat(3)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-[0.25em]">
                        <img
                          src={time}
                          alt=""
                          className="w-[0.75em] h-[0.75em]"
                        />

                        <div className="w-[6.125em]">
                          <p className="text-[#B2C5D2] text-[0.75em]">
                            {DateTime.fromSeconds(
                              isStart ? end : start
                            ).toFormat("yyyy.MM.dd HH:mm")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <img
                      src={cart}
                      alt=""
                      className="w-[1.625em] h-[1.625em]"
                      onClick={buy(info, price)}
                    />
                  </div>
                </div>
              </div>

              {!isEn && (
                <div className="absolute top-[0.5em] right-[0.5em] flex items-center gap-[0.1875em]">
                  {/* 未参与Tag */}
                  <div className="bg-[#7396A7]/20 rounded-[0.125em] p-[0.1875em]">
                    <div className="text-[0.75em] text-[#7396A7]">
                      <FormattedMessage id="未参与" />
                    </div>
                  </div>

                  {/* 已参与Tag */}
                  {/* <div className="bg-[#1691FF]/20 rounded-[0.125em] p-[0.1875em]">
                    <div className="text-[0.75em] text-[#1691FF]">
                      <FormattedMessage id="已参与" />
                    </div>
                  </div> */}

                  <TimeTag start={start} end={end} now={now} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="px-[1em] py-[1.5em]">
          <p className="text-[0.875em] leading-normal">
            <FormattedMessage id={infoId} />
          </p>
        </div>
      </Modal>

      {loading && <Loading />}
    </section>
  );
}
