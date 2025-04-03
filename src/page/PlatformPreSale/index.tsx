import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  useReadContract,
  useAccount,
  useWriteContract,
  usePublicClient,
} from "wagmi";
import { DateTime } from "luxon";
import BigNumber from "bignumber.js";
import {
  selectInfo,
  setTotalToken,
  setTokenName,
} from "../../lib/features/info/infoSlice";
// import { selectIsEn } from "../../lib/features/locale/localeSlice";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import {
  selectERC1229,
  selectTtoken,
} from "../../lib/features/contract/contractSlice";
import { useError } from "../../hooks/useError";
import Loading from "../../components/Loading";

export default function PlatformPreSale() {
  const { address } = useAccount();
  const { showError } = useError();
  // const isEn = useAppSelector(selectIsEn);
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectInfo);
  const ERC1229Contract = useAppSelector(selectERC1229);
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const usdtAddress = info?.systeminfo?.longinfo?.usdt || "0x";
  const TtokenContract = useAppSelector(selectTtoken);
  const [loading, setLoading] = useState(false);

  const { data, refetch } = useReadContract({
    ...ERC1229Contract,
    functionName: "get_platform_subscription",
    account: address,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [subscription, buyed] = (data as [any, number]) || [];

  const {
    already_received,
    totalamount,
    price,
    time_start,
    time_end,
    token,
    baseamount,
    baseprice,
  } = subscription || {};

  console.log(price);
  

  const { data: name } = useReadContract({
    address: token!,
    abi: TtokenContract!.abi,
    functionName: "name",
    account: address,
  });

  useEffect(() => {
    dispatch(setTokenName(name as string));
  }, [dispatch, name]);

  const offset = BigNumber(already_received?.toString() || 0)
    .dividedBy(totalamount?.toString() || 0)
    .multipliedBy(100)
    .decimalPlaces(2, BigNumber.ROUND_FLOOR)
    .toNumber();

  const percent = isNaN(offset) ? 0 : offset;

  useEffect(() => {
    const total = BigInt(totalamount || 0);
    const received = BigInt(already_received || 0);
    const amount = total - received;

    dispatch(setTotalToken(amount.toString()));
  }, [already_received, dispatch, totalamount]);

  const buy = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const approveParam = {
        address: usdtAddress!,
        abi: TtokenContract!.abi,
        functionName: "approve",
        args: [ERC1229Contract.address, BigInt(baseprice)],
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
        functionName: "buy_platform_subscription",
        account: address,
      };

      const gas = await publicClient!.estimateContractGas(buyParams);

      const { request } = await publicClient!.simulateContract({
        ...buyParams,
        gas,
      });

      const hash = await writeContractAsync(request);

      await publicClient!.waitForTransactionReceipt({
        hash,
      });

      showError(`Succeed! \n hash: ${hash}`);
      refetch();
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log({ error });

      if (error && typeof error === "object" && "shortMessage" in error) {
        showError(error.shortMessage as string);
      } else if (error && typeof error === "object" && "message" in error) {
        showError(error.message as string);
      } else {
        console.log(error);
        showError(JSON.stringify(error));
      }
    }
  };

  return (
    <section className="px-[0.75em]">
      <div className="py-[1.125em] font-bold">
        <FormattedMessage id="平台预售" />
      </div>

      <div className="grid gap-[0.75em]">
        <div className="relative flex items-center gap-[1em] p-[0.75em] after:content-[''] after:absolute after:z-0 after:inset-0 after:rounded-[0.5em] after:p-[0.0625em] after:bg-[linear-gradient(0deg,#B938C9,#51B3DC)] after:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] after:![mask-composite:exclude] after:pointer-events-none">
          <div>
            <div className="relative size-[5.5em]">
              <svg
                className="size-full rotate-90"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  strokeWidth={3}
                  className="stroke-current text-white/5"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  strokeWidth={3}
                  strokeDasharray={100}
                  strokeDashoffset={100 - percent}
                  strokeLinecap="round"
                  className={`stroke-current text-[#1691FF] ${
                    percent === 0 ? "hidden" : ""
                  }`}
                />
              </svg>

              <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <p className="text-center text-[0.75em] font-bold">
                  {percent}%
                </p>

                <p className="text-center text-[0.75em] mt-[0.5em] text-[#B2C5D2]">
                  <FormattedMessage id="占比" />
                </p>
              </div>
            </div>

            <div className="mt-[1em]">
              <button
                onClick={buy}
                type="button"
                className="bg-[#0DD585] text-white  py-[0.5em] rounded-[0.25em] w-full"
              >
                <p className="text-[0.75em]">
                  <FormattedMessage id="认购" />
                </p>
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              {/* <div className={`${isEn ? "w-[6.5em]" : "w-[4em]"}`}> */}
              <div className="w-[4em]">
                <div className="text-[0.75em]">
                  <FormattedMessage id="代币总量" />
                </div>
              </div>

              <p className="flex-1 text-[0.875em]">
                {BigNumber(totalamount || 0)
                  .dividedBy(1e18)
                  .toFormat(3)}
              </p>
            </div>

            <div className="flex items-center justify-betwee mt-[0.5em]">
              {/* <div className={`${isEn ? "w-[6.5em]" : "w-[4em]"}`}> */}
              <div className="w-[4em]">
                <div className="text-[0.75em]">
                  <FormattedMessage id="上线价格" />
                </div>
              </div>

              <p className="flex-1 text-[0.875em]">
                {BigNumber(price || 0)
                  .dividedBy(1e18)
                  .toFormat(3)}
              </p>
            </div>

            <div className="flex items-center justify-between mt-[0.5em]">
              {/* <div className={`${isEn ? "w-[6.5em]" : "w-[4em]"}`}> */}
              <div className="w-[4em]">
                <div className="text-[0.75em]">
                  <FormattedMessage id="代币地址" />
                </div>
              </div>

              <p className="flex-1 text-[0.875em]">
                {token?.replace(/^(.{5}).*(.{6})$/, "$1****$2")}
              </p>
            </div>

            <div className="flex items-center justify-between mt-[0.5em]">
              {/* <div className={`${isEn ? "w-[6.5em]" : "w-[4em]"}`}> */}
              <div className="w-[4em]">
                <div className="text-[0.75em]">
                  <FormattedMessage id="开放时间" />
                </div>
              </div>

              <p className="flex-1 text-[0.875em]">
                {DateTime.fromSeconds(Number(time_start || 0)).toFormat(
                  "yyyy.MM.dd HH:mm"
                )}
              </p>
            </div>

            <div className="flex items-center justify-between mt-[0.5em]">
              {/* <div className={`${isEn ? "w-[6.5em]" : "w-[4em]"}`}> */}
              <div className="w-[4em]">
                <div className="text-[0.75em]">
                  <FormattedMessage id="结束时间" />
                </div>
              </div>

              <p className="flex-1 text-[0.875em]">
                {DateTime.fromSeconds(Number(time_end || 0)).toFormat(
                  "yyyy.MM.dd HH:mm"
                )}
              </p>
            </div>

            <div className="flex items-center justify-betwee mt-[0.5em]">
              {/* <div className={`${isEn ? "w-[6.5em]" : "w-[4em]"}`}> */}
              <div className="w-[4em]">
                <div className="text-[0.75em]">
                  <FormattedMessage id="每份数量" />
                </div>
              </div>

              <p className="flex-1 text-[0.875em]">
                {BigNumber(baseamount || 0)
                  .dividedBy(1e18)
                  .toFormat(3)}
              </p>
            </div>

            <div className="flex items-center justify-betwee mt-[0.5em]">
              {/* <div className={`${isEn ? "w-[6.5em]" : "w-[4em]"}`}> */}
              <div className="w-[4em]">
                <div className="text-[0.75em]">
                  <FormattedMessage id="每份价格" />
                </div>
              </div>

              <p className="flex-1 text-[0.875em]">
                {BigNumber(baseprice || 0)
                  .dividedBy(1e18)
                  .toFormat(3)}
              </p>
            </div>

            <div className="flex items-center justify-betwee mt-[0.5em]">
              {/* <div className={`${isEn ? "w-[6.5em]" : "w-[4em]"}`}> */}
              <div className="w-[4em]">
                <div className="text-[0.75em]">
                  <FormattedMessage id="已购数量" />
                </div>
              </div>

              <p className="flex-1 text-[0.875em]">
                {BigNumber(buyed || 0)
                  .dividedBy(1e18)
                  .toFormat()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {loading && <Loading />}
    </section>
  );
}
