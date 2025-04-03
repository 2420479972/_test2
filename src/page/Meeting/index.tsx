import { FormattedMessage } from "react-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { useReadContract } from "wagmi";
import { DateTime } from "luxon";
import { useAppSelector } from "../../lib/hooks";
import { selectERC1229 } from "../../lib/features/contract/contractSlice";

import bg from "/bg-meeting.png";
import bg1 from "/bg-meeting1.png";
import local from "/local.png";
import time from "/time.png";

const TimeTag = ({
  start,
  end,
  now,
}: {
  start: number;
  end: number;
  now: number;
}) => {
  // 未开始
  if (now < start) {
    return (
      <div className="bg-[#FF8B2D]/20 rounded-[0.125em] p-[0.1875em]">
        <div className="text-[0.75em] text-[#FF8B2D]">
          <FormattedMessage id="未开始" />
        </div>
      </div>
    );
  }

  // 已结束
  if (now > end) {
    <div className="bg-[#7396A7]/20 rounded-[0.125em] p-[0.1875em]">
      <div className="text-[0.75em] text-[#7396A7]">
        <FormattedMessage id="已结束" />
      </div>
    </div>;
  }

  // 已开始
  return (
    <div className="bg-[#0DD585]/20 rounded-[0.125em] p-[0.1875em]">
      <div className="text-[0.75em] text-[#0DD585]">
        <FormattedMessage id="已开始" />
      </div>
    </div>
  );
};

export default function Meeting() {
  const ERC1229Contract = useAppSelector(selectERC1229);
  const { data } = useReadContract({
    ...ERC1229Contract,
    functionName: "get_aggregate_alliances",
    args: [0, 10],
  });
  const hasData = Array.isArray(data) && data.length > 0;

  return hasData ? (
    <section className="px-[0.5em]">
      <div className="py-[1.125em] px-[0.25em] font-bold">
        <FormattedMessage id="联盟会议" />
      </div>

      <Swiper slidesPerView={Array.isArray(data) && data.length > 2 ? 2.2 : 2}>
        {data.map(({ baseinfo, index: i }) => {
          const { url, time_start, time_end, info } = baseinfo || {};
          const index = Number(i || 0);
          const isOdd = index % 2 === 0;
          const start = Number(time_start || 0);
          const end = Number(time_end || 0);
          const now = DateTime.now().toSeconds();

          return (
            <SwiperSlide key={index}>
              <a className="block mx-[0.25em]" href={url} target="_blank">
                <div className="relative">
                  <img src={isOdd ? bg : bg1} alt="" className="w-full" />

                  <div className="absolute bottom-[0.5em] inset-x-[0.5em] flex items-center justify-between flex-wrap gap-[0.5em]">
                    <div className="flex items-center gap-[0.5em] flex-wrap">
                      <div className="bg-black rounded-[0.125em] overflow-hidden">
                        <div className="bg-[#0DD585]/20 p-[0.1875em]">
                          <div className="text-[0.75em] text-[#0DD585]">
                            <FormattedMessage id="免费" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-black rounded-[0.125em] overflow-hidden">
                        <div className="bg-[#10506D] p-[0.1875em]">
                          <div className="text-[0.75em]">
                            <FormattedMessage
                              id={`${isOdd ? "社交" : "会议"}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black rounded-[0.125em] overflow-hidden">
                      <TimeTag start={start} end={end} now={now} />
                    </div>
                  </div>
                </div>

                <div className="px-[0.5em] mt-[0.75em]">
                  <div className="flex items-center gap-[0.5em]">
                    <img src={local} alt="" className="w-[0.75em] h-[0.75em]" />

                    <p className="text-[#B2C5D2] text-[0.75em] flex-1 truncate">
                      {info}
                    </p>
                  </div>

                  <div className="flex items-center gap-[0.25em] mt-[0.875em]">
                    <img src={time} alt="" className="w-[0.75em] h-[0.75em]" />

                    <p className="text-[#B2C5D2] text-[0.75em] flex-1 truncate">
                      {DateTime.fromSeconds(start).toFormat("yyyy.MM.dd HH:mm")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-[0.5em]"></div>
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  ) : null;
}
