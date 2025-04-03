import { FormattedMessage } from "react-intl";
import BigNumber from "bignumber.js";
import {
  selectInfo,
  selectTotalToken,
  selectTokenName,
} from "../../lib/features/info/infoSlice";
import { selectIsEn } from "../../lib/features/locale/localeSlice";
import { useAppSelector } from "../../lib/hooks";

import bg_data from "/bg-data.png";

export default function DataSection() {
  const isEn = useAppSelector(selectIsEn);
  const info = useAppSelector(selectInfo);
  const totalToken = useAppSelector(selectTotalToken);
  const tokenName = useAppSelector(selectTokenName);
  const { liquidity, number_user } = info || {};
  const liquidityNumber = BigNumber(liquidity || 0)
    .dividedBy(1e18)
    .toFormat(3);
  const userNumber = BigNumber(number_user || 0).toFormat();

  return (
    <section className="p-[0.75em]">
      <div className="relative">
        <img className="absolute w-full h-full" src={bg_data} alt="" />

        <div className="pt-[5em] pb-[0.625em] px-[0.625em] font-bold relative">
          <div className="flex items-center justify-between">
            <div className={`${isEn ? "w-[6.625em]" : "w-[4.25em]"}`}>
              <div className="text-[0.75em]">
                <FormattedMessage id="流动性池" />
              </div>
            </div>

            <div className="bg-[#041323] px-[0.5em] py-[0.625em] flex-1 rounded-[0.1875em]">
              <p className="text-[0.875em]">{liquidityNumber}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-[0.5em]">
            <div className={`${isEn ? "w-[6.625em]" : "w-[4.25em]"}`}>
              <div className="text-[0.75em]">
                <FormattedMessage id="平台用户" />
              </div>
            </div>

            <div className="bg-[#041323] px-[0.5em] py-[0.625em] flex-1 rounded-[0.1875em]">
              <p className="text-[0.875em]">{userNumber}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-[0.5em]">
            <div className={`${isEn ? "w-[6.625em]" : "w-[4.25em]"}`}>
              <div className="text-[0.75em]">
                <FormattedMessage
                  id="代币"
                  values={{
                    name: tokenName || "",
                  }}
                />
              </div>
            </div>

            <div className="bg-[#041323] px-[0.5em] py-[0.625em] flex-1 rounded-[0.1875em]">
              <p className="text-[0.875em]">
                {BigNumber(totalToken || 0)
                  .dividedBy(1e18)
                  .toFormat(3)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
