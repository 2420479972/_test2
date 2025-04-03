import {useEffect, useState} from "react";
import { FormattedMessage } from "react-intl";
import {useAccount, useWriteContract, usePublicClient, useReadContract} from "wagmi";
import { useAppSelector } from "../../lib/hooks";
import {
  selectERC1229,
  selectTtoken,
} from "../../lib/features/contract/contractSlice";
import { selectInfo } from "../../lib/features/info/infoSlice";
import { useError } from "../../hooks/useError";
import Loading from "../../components/Loading";
// import StakeList from "./StakeList";
// import AirdropList from "./AirdropList";
import BigNumber from "bignumber.js";
import New_Stake from "./New_Stake";
import New_Air from "./New_Air";
// import usdt from "/usdt.png";
// import {ERC1229Contract} from "../../lib/features/contract/defaultContracts.ts";

export default function Stake() {
  const { address } = useAccount();
  const { showError } = useError();
  const ERC1229Contract = useAppSelector(selectERC1229);
  const TtokenContract = useAppSelector(selectTtoken);
  const info = useAppSelector(selectInfo);
  const {
    stake_amount,
    // liquidity,
    // account_info,
    systeminfo,
  } = info || {};
  // const { stake_flag } = account_info || {};
  const usdtAddress = systeminfo?.longinfo?.usdt || "0x";
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<"stake" | "airdrop">("stake");

  const stake = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const approveParam = {
        address: usdtAddress!,
        abi: TtokenContract!.abi,
        functionName: "approve",
        args: [ERC1229Contract.address, BigInt(stake_amount || 0)],
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
        functionName: "stake",
        account: address,
      };

      const gas = await publicClient!.estimateContractGas(buyParams);

      const { request } = await publicClient!.simulateContract({
        ...buyParams,
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

  const unstake = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const params = {
        ...ERC1229Contract,
        functionName: "unstake",
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

  const changeType = (t: "stake" | "airdrop") => () => {
    setType(t);
  };

  const { data,refetch } = useReadContract({
    ...ERC1229Contract,
    functionName: "total_real_pool_stake_amount",
  });


  useEffect(() => {
    refetch();
  }, [data, refetch]);

  return (
    <section className="px-[0.5em] mt-[0.75em]">
      <div className="px-[0.5em] pt-[0.75em] pb-[1.25rem] bg-[#101C2A] rounded-[0.5em]">
        <div className="p-[0.5em] pb-[0.75em]  bg-[#041323] rounded-[0.5em]">
          {/*<div className="flex items-center justify-between flex-wrap gap-[0.25em]">*/}
          {/*  <div className="flex flex-1 items-center gap-[0.25em]">*/}
          {/*    <img src={usdt} alt="" className="w-[1.25em] h-[1.25em]" />*/}

          {/*    <p className="text-[0.75em] text-[#B2C5D2] leading-normal">*/}
          {/*      <FormattedMessage id="24小时平台交易金额" />*/}
          {/*    </p>*/}
          {/*  </div>*/}

          {/*  <p>*/}
          {/*    {BigNumber(String(data) || 0)*/}
          {/*      .dividedBy(1e18)*/}
          {/*      .toFormat(3)}*/}
          {/*  </p>*/}
          {/*</div>*/}

          {/* {!stake_flag ? ( */}
          {
              Number(BigNumber(stake_amount || 0)
                  .dividedBy(1e18)
                  .toFormat(3)) <= 0 && <div className="flex items-stretch justify-between gap-[0.25em] mt-[1em]">
                <div className="flex flex-1 bg-[#265BD8]/20 rounded-[0.25em]">
                  <p className="text-[#265BD8] text-[0.75em] leading-normal p-[0.5em]">
                    <FormattedMessage
                        id="质押USDT领取聚合空投"
                        values={{
                          amount: BigNumber(stake_amount || 0)
                              .dividedBy(1e18)
                              .toFormat(3),
                        }}
                    />
                  </p>
                </div>

                <button
                    onClick={stake}
                    type="button"
                    className="bg-[linear-gradient(0deg,#CF650F,#FF8B2D)] w-[4em] flex items-center justify-center rounded-[0.25em]"
                >
                  <p className="text-[0.75em]">
                    <FormattedMessage id="质押"/>
                  </p>
                </button>
              </div>
          }

          {/* ) : ( */}
          {
              Number(BigNumber(stake_amount || 0)
                  .dividedBy(1e18)
                  .toFormat(3)) > 0 && <div className="flex items-stretch justify-between gap-[0.25em] mt-[0.75em]">
                <div className="flex flex-1 bg-[#265BD8]/20 rounded-[0.25em]">
                  <p className="text-[#265BD8] text-[0.75em] leading-normal p-[0.5em]">
                    {
                      <FormattedMessage
                          id="提现USDT至余额"
                          values={{
                            amount: BigNumber(stake_amount || 0)
                                .dividedBy(1e18)
                                .toFormat(3),
                          }}
                      />
                    }

                  </p>
                </div>

                <button
                    onClick={unstake}
                    type="button"
                    className="bg-[linear-gradient(180deg,#0DD585,#139B65)] w-[4em] flex items-center justify-center rounded-[0.25em]"
                >
                  <p className="text-[0.75em]">
                    <FormattedMessage id="取现"/>
                  </p>
                </button>
              </div>
          }

          {/* )} */}
        </div>

        <div className="mt-[1em] font-bold flex items-center gap-[1em]">
          <p
              onClick={changeType("stake")}
              className={`transition-all ${
                  type === "stake"
                      ? "scale-100 text-white"
                      : "scale-[0.875] text-[#B2C5D2]"
              }`}
          >
            <FormattedMessage id="质押记录"/>
          </p>

          <p
              onClick={changeType("airdrop")}
              className={`transition-all ${
                  type === "airdrop"
                      ? "scale-100 text-white"
                      : "scale-[0.875] text-[#B2C5D2]"
              }`}
          >
            <FormattedMessage id="空投记录"/>
          </p>
        </div>

        {type === "stake" ? <New_Stake/> : <New_Air/>}
      </div>

      {loading && <Loading/>}
    </section>
  );
}
