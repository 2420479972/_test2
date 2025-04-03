import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import BigNumber from "bignumber.js";
import { DateTime } from "luxon";
import { FormattedMessage } from "react-intl";
// import { usePublicClient } from "wagmi";
// import { useAppSelector } from "../../lib/hooks";
import { useError } from "../../hooks/useError";

// import { selectERC1229 } from "../../lib/features/contract/contractSlice";

// 生成随机地址的函数
const generateRandomAddress = () => {
  return '0x' + Array(40).fill(0).map(() => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};

// 生成随机时间的函数（不超过当前时间）
const generateRandomTime = () => {
  const now = DateTime.now();
  const randomDaysAgo = Math.floor(Math.random() * 100); // 随机生成0-100天前的时间
  return now.minus({ days: randomDaysAgo }).toSeconds();
};

// 生成随机数量的函数（100000-1000000之间的100的倍数）
const generateRandomAmount = () => {
  const min = 1000;
  const max = 10000;
  const step = 100;
  const random = Math.floor(Math.random() * ((max - min) / step + 1));
  return new BigNumber(min + random * step).times(1e18).toString();
};

// 生成一条随机记录的函数
const generateRandomRecord = () => {
  return {
    token: generateRandomAddress(),
    time: generateRandomTime(),
    amount: generateRandomAmount(),
    mul: new BigNumber(1.1).times(1e18).toString() // 固定比例1.1
  };
};

export default function StakeList() {
  const { showError } = useError();
  // const publicClient = usePublicClient();
  // const ERC1229Contract = useAppSelector(selectERC1229);
  const [hasMore, setHasMore] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  // const [loading, setLoading] = useState(false);

  // 模拟获取数据的函数，使用假数据
  const fetchData = useCallback(
    async () => {
      try {
        // 模拟网络请求的延迟
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 每页生成10条随机记录
        const fakeData = Array(10).fill(null).map(() => generateRandomRecord());
        
        return fakeData;
      } catch (error) {
        console.log({ error });

        if (error && typeof error === "object" && "shortMessage" in error) {
          showError(error.shortMessage as string);
        } else if (error && typeof error === "object" && "message" in error) {
          showError(error.message as string);
        } else {
          console.log(error);
          showError(JSON.stringify(error));
        }

        return [];
      }
    },
    [showError]
  );

  useEffect(() => {
    // setLoading(true);

    fetchData().then((res) => {
      // setLoading(false);
      setData(res);
    });

    // 设置定时器，每50毫秒向上滚动2px
    const scrollInterval = setInterval(() => {
      const scrollContainer = document.getElementById('scroll-container');
      if (scrollContainer) {
        scrollContainer.scrollTop += 2;
      }
    }, 50);

    return () => {
      clearInterval(scrollInterval);
    };
  }, [fetchData]);

  const fetchMoreData = async () => {
    const res = await fetchData();

    if (Array.isArray(res)) {
      setData((data) => [...data, ...res]);
    }

    // 为了测试无限滚动，这里始终保持hasMore为true
    // 实际应用中可能需要根据后端返回的数据判断是否还有更多数据
    setHasMore(true);
  };

  return (
    <div className="mt-[0.5em]">
      <div className="flex items-center justify-between gap-[0.25em] border-b border-[#4A6079] text-[#B2C5D2] font-bold">
        <p className="w-[6.5em] h-[2.75em] flex items-center">
          <FormattedMessage id="空投地址" />
        </p>

        {/* <p className="w-[6.5em] h-[2.75em] flex items-center justify-center">
          <FormattedMessage id="用户" />
        </p> */}

        <p className="flex-1 h-[2.75em] flex items-center justify-center">
          <FormattedMessage id="数量" />
        </p>

        <p className="w-[5em]  h-[2.75em] flex items-center justify-center">
          <FormattedMessage id="时间" />
        </p>

        <p className="w-[3.5em] h-[2.75em] flex items-center justify-center">
          <FormattedMessage id="比例" />
        </p>
      </div>

      <ul className="h-[15em] overflow-hidden relative" id="scroll-container">
      <InfiniteScroll
            pageStart={0}
            loadMore={fetchMoreData}
            initialLoad={false}
            hasMore={hasMore}
            useWindow={false}
          >
            {Array.isArray(data) && data.length > 0 ? (
              data.map(
                (
                  {
                    // user,
                    token,
                    time,
                    amount,
                    mul,
                  },
                  index
                ) => (
                  <li
                    key={index}
                    className="flex items-center justify-between gap-[0.5em] border-[#4A6079]  [&:not(:last-child)]:border-b"
                  >
                    <div className="w-[6.5em] h-[2.75em] flex items-center justify-center">
                      <p className="text-[0.875em]">
                        {token?.replace(/^(.{5}).*(.{5})$/, "$1****$2")}
                      </p>
                    </div>

                    {/* <div className="w-[6.5em] h-[2.75em] flex items-center justify-center">
                    <p className="text-[0.875em]">
                      {user?.replace(/^(.{5}).*(.{5})$/, "$1****$2")}
                    </p>
                  </div> */}

                    <div className="flex-1 h-[2.75em] flex items-center justify-center">
                      <p className="text-[0.875em]">
                        {BigNumber(amount || 0)
                          .dividedBy(1e18)
                          .toFormat(3)}
                      </p>
                    </div>

                    <div className="w-[5em] h-[2.75em] flex items-center justify-center text-center leading-nomoal">
                      <p className="text-[0.875em]">
                        {DateTime.fromSeconds(Number(time || 0)).toFormat(
                          "yyyy.MM.dd HH:mm"
                        )}
                      </p>
                    </div>

                    <div className="w-[3.5em] h-[2.75em] flex items-center justify-center">
                      <p className="text-[0.875em]">
                        {BigNumber(mul || 0)
                          .dividedBy(1e18)
                          .toFormat(3)}
                      </p>
                    </div>
                  </li>
                )
              )
            ) : (
              <li key="empty">
                <p className="h-[3em] flex items-center justify-center">
                  <FormattedMessage id="暂无数据" />
                </p>
              </li>
            )}
          </InfiniteScroll>
      </ul>
    </div>
  );
}
