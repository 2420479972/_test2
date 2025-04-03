import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { selectInfo } from "../lib/features/info/infoSlice";
import { useAppSelector } from "../lib/hooks";

import safe1 from "/safe1.png";
import safe2 from "/safe2.png";
import safe3 from "/safe3.png";
import safe4 from "/safe4.png";
import link1 from "/link1.png";
import link2 from "/link2.png";
import link3 from "/link3.png";
import link4 from "/link4.png";
import partner1 from "/partner1.png";
import partner2 from "/partner2.png";
import partner3 from "/partner3.png";
import partner4 from "/partner4.png";
import partner5 from "/partner5.png";
import partner6 from "/partner6.png";
import partner7 from "/partner7.png";
import partner8 from "/partner8.png";

const safeItems = [
  { id: 1, src: safe1, label: "0漏洞风险" },
  { id: 2, src: safe2, label: "功能完善" },
  { id: 3, src: safe3, label: "公开透明" },
  { id: 4, src: safe4, label: "资金控制权" },
];

const partners1 = [
  { id: 1, src: partner1 },
  { id: 2, src: partner2 },
  { id: 3, src: partner3 },
  { id: 4, src: partner4 },
];

const partners2 = [
  { id: 5, src: partner5 },
  { id: 6, src: partner6 },
  { id: 7, src: partner7 },
  { id: 8, src: partner8 },
];
const getLabel = (id: number) => {
  const item = safeItems.find((item) => item.id === id);
  return item?.label || "";
};

export default function BuyNode() {
  const [selectId, setSelectId] = useState(1);
  const info = useAppSelector(selectInfo);
  const { systeminfo } = info || {};
  const { otherinfo } = systeminfo || {};
  const { telegram_link, twitter_link, link_1, link_2 } = otherinfo || {};

  const linkItems = [
    { id: 1, src: link1, href: telegram_link },
    { id: 2, src: link2, href: twitter_link },
    { id: 3, src: link3, href: link_1 },
    { id: 4, src: link4, href: link_2 },
  ];

  const changeSelectId = (id: number) => () => {
    setSelectId(id);
  };

  const goToLink = (link?: string) => () => {
    if (link) {
      window.open(link);
    }
  };

  return (
    <section className="px-[0.75em]">
      <div className="py-[1.125em] font-bold text-center">
        <p className="text-[0.875em]">
          <FormattedMessage id={getLabel(selectId)} />
        </p>
      </div>

      <div className="flex items-center justify-center gap-[1.875em]">
        {safeItems.map(({ id, src }) => (
          <img
            key={id}
            src={src}
            alt=""
            className={`w-[3.5em] transition-all ${
              selectId === id
                ? "scale-100 opacity-100"
                : "scale-[0.8] opacity-80"
            }`}
            onClick={changeSelectId(id)}
          />
        ))}
      </div>

      <div className="py-[1.75em] font-bold text-center">
        <FormattedMessage id="战略合作伙伴" />
      </div>

      <div className="flex items-center justify-between h-[1.75em]">
        {partners1.map(({ id, src }) => (
          <img key={id} src={src} alt="" className="h-full" />
        ))}
      </div>

      <div className="flex items-center justify-between h-[1.75em] mt-[0.5em]">
        {partners2.map(({ id, src }) => (
          <img key={id} src={src} alt="" className="h-full" />
        ))}
      </div>

      <div className="flex items-center justify-center gap-[1.5em] h-[2em] mt-[1.875em]">
        {linkItems.map(({ id, src, href }) => (
          <img
            key={id}
            src={src}
            alt=""
            className="h-full"
            onClick={goToLink(href)}
          />
        ))}
      </div>

      <div className="pt-[1.125em] pb-[1.875em] text-center font-medium text-[#B2C5D2]">
        <p className="text-[0.75em]">© 2024 AUC. All Rights Reserved.</p>
      </div>
    </section>
  );
}
