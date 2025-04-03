import { useEffect, useState, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useAccount, useWriteContract, usePublicClient } from "wagmi";
import { DateTime } from "luxon";
import BigNumber from "bignumber.js";
import { useAppSelector } from "../../lib/hooks";
import { selectERC1229 } from "../../lib/features/contract/contractSlice";
import { useError } from "../../hooks/useError";

import bsc from "/bsc.png";
import bg1 from "/bg-hyut1.png";
import bg2 from "/bg-hyut2.png";
import icon1 from "/icon-hyut1.png";
import icon2 from "/icon-hyut2.png";
import icon_copy from "/icon-copy.png";
import icon_succeed from "/icon-succeed.png";
import icon_arrow from "/icon-arrow.png";

interface BaseInfo {
  time_start: bigint;
  time_end: bigint;
  token: `0x${string}`;
  wallet: `0x${string}`;
  totalamount: bigint;
  base_amount: bigint;
  info: string;
  already_received: bigint;
  flag: boolean;
}

interface AirdropItemProps {
  baseinfo: BaseInfo;
  index: number;
  setLoading: (loading: boolean) => void;
  isNode: boolean;
  rate: BigNumber;
}

export default function AirdropItem({
  baseinfo,
  index: i,
  setLoading,
  isNode,
  rate,
}: AirdropItemProps) {
  const {
    time_start,
    time_end,
    token,
    wallet,
    totalamount,
    base_amount,
    info,
    already_received,
    flag,
  } = baseinfo || {};
  const index = BigNumber(i).toNumber();
  const isOdd = index % 2 === 0;

  const offset = BigNumber(already_received?.toString() || 0)
    .dividedBy(totalamount?.toString() || 0)
    .multipliedBy(100)
    .decimalPlaces(2, BigNumber.ROUND_FLOOR)
    .toNumber();

  const percent = isNaN(offset) ? 0 : offset;

  const ERC1229Contract = useAppSelector(selectERC1229);
  const { showError } = useError();
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const [copyTokenSuccess, setCopyTokenSuccess] = useState(false);
  const [copyWalletSuccess, setCopyWalletSuccess] = useState(false);
  const [showMore, setShowMorw] = useState(false);
  const [disable, setDisable] = useState(false);

  const checkClaim = useCallback(async () => {
    try {
      const params = {
        ...ERC1229Contract,
        functionName: "airdrop",
        args: [index],
        account: address,
      };

      const gas = await publicClient!.estimateContractGas(params);

      await publicClient!.simulateContract({
        ...params,
        gas,
      });

      setDisable(false);
    } catch (error) {
      console.log({ error });

      setDisable(true);
    }
  }, [ERC1229Contract, index, address, publicClient]);

  useEffect(() => {
    checkClaim();
  }, [checkClaim]);

  const claim = (index: number) => async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const params = {
        ...ERC1229Contract,
        functionName: "airdrop",
        args: [index],
        account: address,
      };

      const gas = await publicClient!.estimateContractGas(params);

      const { request } = await publicClient!.simulateContract({
        ...params,
        gas,
      });

      const hash = await writeContractAsync(request);

      showError(`Succeed! \n hash: ${hash}`);

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

  const changeShowMore = (showMore: boolean) => () => {
    setShowMorw(showMore);
  };

  const copyToClipboard =
    (text: string, type: "token" | "wallet") => async () => {
      try {
        await navigator.clipboard.writeText(text);

        if (type === "token") {
          setCopyTokenSuccess(true);
          setTimeout(() => setCopyTokenSuccess(false), 2000);
        } else {
          setCopyWalletSuccess(true);
          setTimeout(() => setCopyWalletSuccess(false), 2000);
        }
      } catch (err) {
        showError(`Failed to copy text: ${err}`);
      }
    };

  return flag ? (
    <div
      className={`${
        isOdd ? "bg-[#5EFCFD]/5" : "bg-[#CB66FF]/5"
      } rounded-[0.5em] mx-[0.25em] overflow-hidden`}
    >
      <div className="relative w-full">
        <img src={isOdd ? bg1 : bg2} alt="" className="w-full" />

        <div className="absolute inset-0 flex justify-center items-center">
          <img
            src={isOdd ? icon1 : icon2}
            alt=""
            className="w-[2.25em] ml-[0.25em] mb-[1em]"
          />
        </div>

        <div className="absolute top-[0.5em] right-[0.5em]">
          <img src={bsc} alt="" className="w-[1.25em]" />
        </div>
      </div>

      <div className="px-[0.5em] mt-[0.5em]">
        <p className="text-[0.75em] text-[#B2C5D2]">
          <FormattedMessage id="代币地址" />
        </p>

        <div className="flex items-center gap-[0.5em] mt-[0.25em]">
          <p className="text-[0.75em]">
            {token?.replace(/^(.{5}).*(.{5})$/, "$1****$2")}
          </p>

          {copyTokenSuccess ? (
            <div className="flex items-center gap-[0.25em]">
              <img src={icon_succeed} alt="" className="size-[1.25em]" />

              <p className="text-[0.75em]">
                <FormattedMessage id="已复制" />
              </p>
            </div>
          ) : (
            <img
              src={icon_copy}
              alt=""
              className="size-[1.25em]"
              onClick={copyToClipboard(token || "", "token")}
            />
          )}
        </div>

        <div className="mt-[0.5em]">
          <p className="text-[0.75em] text-[#B2C5D2]">
            <FormattedMessage id="空投地址" />
          </p>
        </div>

        <div className="flex items-center gap-[0.5em] mt-[0.25em]">
          <p className="text-[0.75em]">
            {wallet?.replace(/^(.{5}).*(.{5})$/, "$1****$2")}
          </p>

          {copyWalletSuccess ? (
            <div className="flex items-center gap-[0.25em]">
              <img src={icon_succeed} alt="" className="size-[1.25em]" />

              <p className="text-[0.75em]">
                <FormattedMessage id="已复制" />
              </p>
            </div>
          ) : (
            <img
              src={icon_copy}
              alt=""
              className="size-[1.25em]"
              onClick={copyToClipboard(wallet || "", "wallet")}
            />
          )}
        </div>
      </div>

      <div className="p-[0.5em]">
        <button
          disabled={disable}
          className={`${
            disable ? "bg-[#C8C8C8]" : "bg-[#0DD585]"
          } text-white px-[1em] py-[0.5em] rounded-[0.25em] w-full`}
          onClick={claim(index)}
          type="button"
        >
          <FormattedMessage id="领取空投" />
        </button>
      </div>

      <p className="text-[#1691FF] font-bold px-[0.5em]">
        {BigNumber(totalamount?.toString() || 0)
          .dividedBy(1e18)
          .toFormat(3)}
      </p>

      <div className="flex items-center justify-between gap-[0.25em] px-[0.5em] mt-[0.5em]">
        <div className="bg-[#051626] h-[0.5em] flex-1 rounded-full relative">
          <div
            className="bg-[#1691FF] h-[0.5em] rounded-full absolute"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="text-[0.75em] text-[#B2C5D2]">{percent}%</p>
      </div>

      {showMore ? (
        <div className="mt-[1em] px-[0.5em]">
          <p className="text-[0.75em] text-[#B2C5D2]">
            <FormattedMessage id="空投总量" />
          </p>

          <div className="mt-[0.25em]">
            <p className="text-[0.75em]">
              {BigNumber(totalamount?.toString() || 0)
                .dividedBy(1e18)
                .toFormat(3)}
            </p>
          </div>

          <div className="mt-[0.5em]">
            <p className="text-[0.75em] text-[#B2C5D2]">
              <FormattedMessage id="一份数量" />
            </p>
          </div>

          <div className="mt-[0.25em]">
            <p className="text-[0.75em]">
              {BigNumber(base_amount?.toString() || 0)
                .dividedBy(1e18)
                .toFormat(3)}
            </p>
          </div>

          {isNode && (
            <>
              <div className="mt-[0.5em]">
                <p className="text-[0.75em] text-[#B2C5D2]">
                  <FormattedMessage id="进阶数量" />
                </p>
              </div>

              <div className="mt-[0.25em]">
                <p className="text-[0.75em]">
                  {BigNumber(base_amount?.toString() || 0)
                    .multipliedBy(rate)
                    .dividedBy(1e18)
                    .toFormat(3)}
                </p>
              </div>
            </>
          )}

          <div className="mt-[0.5em]">
            <p className="text-[0.75em] text-[#B2C5D2]">
              <FormattedMessage id="开放时间" />
            </p>
          </div>

          <div className="mt-[0.25em]">
            <p className="text-[0.75em]">
              {DateTime.fromSeconds(Number(time_start || 0)).toFormat(
                "yyyy.MM.dd HH:mm"
              )}
            </p>
          </div>

          <div className="mt-[0.5em]">
            <p className="text-[0.75em] text-[#B2C5D2]">
              <FormattedMessage id="结束时间" />
            </p>
          </div>

          <div className="mt-[0.25em]">
            <p className="text-[0.75em]">
              {DateTime.fromSeconds(Number(time_end || 0)).toFormat(
                "yyyy.MM.dd HH:mm"
              )}
            </p>
          </div>

          <div className="mt-[0.5em]">
            <p className="text-[0.75em] text-[#B2C5D2]">
              <FormattedMessage id="项目详情" />
            </p>
          </div>

          <div className="mt-[0.25em]">
            <p className="text-[0.75em]">{info}</p>
          </div>

          <div
            className="mt-[1em] mb-[0.75em] flex items-center justify-center gap-[0.25em]"
            onClick={changeShowMore(false)}
          >
            <p className="text-[0.75em] text-[#0DD585]">
              <FormattedMessage id="收起详情" />
            </p>

            <img src={icon_arrow} alt="" className="w-[0.75em] rotate-180" />
          </div>
        </div>
      ) : (
        <div
          className="mt-[1em] mb-[0.75em] flex items-center justify-center gap-[0.25em]"
          onClick={changeShowMore(true)}
        >
          <p className="text-[0.75em] text-[#0DD585]">
            <FormattedMessage id="展开详情" />
          </p>

          <img src={icon_arrow} alt="" className="w-[0.75em]" />
        </div>
      )}
    </div>
  ) : null;
}
