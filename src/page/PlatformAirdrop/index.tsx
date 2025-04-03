import { FormattedMessage } from "react-intl";
import { useReadContract } from "wagmi";
import { DateTime } from "luxon";
import BigNumber from "bignumber.js";
import { selectIsEn } from "../../lib/features/locale/localeSlice";
import { useAppSelector } from "../../lib/hooks";
import { selectERC1229 } from "../../lib/features/contract/contractSlice";
import Countdown from "./Countdown";

import bsc from "/bsc.png";

export default function PlatformAirdrop() {
  const isEn = useAppSelector(selectIsEn);
  const ERC1229Contract = useAppSelector(selectERC1229);

  const { data } = useReadContract({
    ...ERC1229Contract,
    functionName: "get_platform_airdrops",
    args: [0, 10],
  });

  return (
    <section className="px-[0.75em]">
      <div className="py-[1.125em] font-bold">
        <FormattedMessage id="平台空投" />
      </div>

      <div className="grid gap-[0.75em]">
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map(({ baseinfo, price }, i) => {
            const { info, time_start, token, totalamount } = baseinfo;

            return (
              <div
                key={i}
                className="relative flex items-center gap-[1em] p-[0.75em] after:content-[''] after:absolute after:z-0 after:inset-0 after:rounded-[0.5em] after:p-[0.0625em] after:bg-[linear-gradient(0deg,#B938C9,#51B3DC)] after:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] after:![mask-composite:exclude] after:pointer-events-none"
              >
                <Countdown startTime={time_start} />

                <div className="flex-1">
                  <p className="font-bold leading-normal flex items-center gap-[0.25em]">
                    <img src={bsc} alt="" className="w-[1.25em] h-[1.25em]" />

                    {info}
                  </p>

                  <div className="flex items-center justify-between mt-[1em]">
                    <div className={`${isEn ? "w-[6.5em]" : "w-[4em]"}`}>
                      <div className="text-[0.75em]">
                        <FormattedMessage id="代币价格" />
                      </div>
                    </div>

                    <p className="flex-1 text-[0.875em]">
                      {BigNumber(price || 0)
                        .dividedBy(1e18)
                        .toFormat(3)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-[0.5em]">
                    <div className={`${isEn ? "w-[6.5em]" : "w-[4em]"}`}>
                      <div className="text-[0.75em]">
                        <FormattedMessage id="空投总量" />
                      </div>
                    </div>

                    <p className="flex-1 text-[0.875em]">
                      {BigNumber(totalamount || 0)
                        .dividedBy(1e18)
                        .toFormat(3)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-[0.5em]">
                    <div className={`${isEn ? "w-[6.5em]" : "w-[4em]"}`}>
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
                    <div className={`${isEn ? "w-[6.5em]" : "w-[4em]"}`}>
                      <div className="text-[0.75em]">
                        <FormattedMessage id="合约地址" />
                      </div>
                    </div>

                    <p className="flex-1 text-[0.875em]">
                      {token?.replace(/^(.{5}).*(.{6})$/, "$1****$2")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
