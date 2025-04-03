import { useEffect, useRef, useState } from "react";
import { selectInfo } from "../../lib/features/info/infoSlice";
import { useAppSelector } from "../../lib/hooks";

import notice from "/notice.png";

export default function NoticeBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [isFirstScroll, setIsFirstScroll] = useState(true);
  const info = useAppSelector(selectInfo);
  const { systeminfo } = info || {};
  const { otherinfo } = systeminfo || {};
  const { notice: text } = otherinfo || {};

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    const isContentOverflow = content.offsetWidth > container.offsetWidth;
    setIsOverflow(isContentOverflow);

    if (isContentOverflow) {
      const duration = content.offsetWidth / 60;
      setAnimationDuration(duration);
      document.documentElement.style.setProperty(
        "--NoticeBar-width",
        `${container.offsetWidth}px`
      );
    }
  }, [text]);

  useEffect(() => {
    const updateNoticeBarWidth = () => {
      if (containerRef.current) {
        document.documentElement.style.setProperty(
          "--NoticeBar-width",
          `${containerRef.current.offsetWidth}px`
        );
      }
    };

    window.addEventListener("resize", updateNoticeBarWidth);
    return () => window.removeEventListener("resize", updateNoticeBarWidth);
  }, []);

  useEffect(() => {
    if (isOverflow && isFirstScroll) {
      const timer = setTimeout(() => {
        setIsFirstScroll(false);
      }, animationDuration * 1000 + 1000);
      return () => clearTimeout(timer);
    }
  }, [isOverflow, animationDuration, isFirstScroll]);

  return (
    <div className="bg-[#265BD8]/20 pl-[1.25em] pr-[0.5em] py-[0.625em] flex items-stretch gap-[0.5em] overflow-hidden">
      <img src={notice} alt="" className="w-[1.5em] h-[1.5em]" />

      <div ref={containerRef} className="flex-1 relative overflow-hidden">
        <div
          className="whitespace-nowrap text-[#1691FF] text-[0.875em] absolute left-0 inset-y-0 w-fit h-full flex items-center"
          ref={contentRef}
        >
          <p
            style={
              isOverflow
                ? {
                    animationName: `${
                      isFirstScroll ? "firstScroll" : "subsequentScroll"
                    }`,
                    animationDuration: `${animationDuration}s`,
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                    animationDelay: `${isFirstScroll ? "1000ms" : "0ms"}`,
                  }
                : undefined
            }
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
