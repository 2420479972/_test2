import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import BigNumber from "bignumber.js";
import { DateTime } from "luxon";
import { FormattedMessage } from "react-intl";
import { usePublicClient } from "wagmi";
import { useAppSelector } from "../../lib/hooks";
import { useError } from "../../hooks/useError";

import { selectERC1229 } from "../../lib/features/contract/contractSlice";
export default function AirdropList() {
  const { showError } = useError();
  const publicClient = usePublicClient();
  const ERC1229Contract = useAppSelector(selectERC1229);
  const [hasMore, setHasMore] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (page: number) => {
      try {
        const res = await publicClient!.readContract({
          ...ERC1229Contract,
          functionName: "get_airdrop_infos",
          args: [page * 10, 10],
        });

        setLoading(false);
        return Array.isArray(res) ? res : [];
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
    [ERC1229Contract, publicClient, showError]
  );

  useEffect(() => {
    setLoading(true);

    fetchData(0).then((res) => {
      setLoading(false);

      if (Array.isArray(res) && res.length === 10) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }

      setData(res);
    });
  }, [fetchData]);

  const fetchMoreData = async (page: number) => {
    const res = await fetchData(page);

    if (Array.isArray(res)) {
      setData((data) => [...data, ...res]);
    }

    if (Array.isArray(res) && res.length === 10) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
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

      <ul className="max-h-[15em] overflow-y-auto">
        {loading ? (
          <li key="empty">
            <p className="h-[3em] flex items-center justify-center">
              Loading...
            </p>
          </li>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={fetchMoreData}
            initialLoad={false}
            hasMore={hasMore}
            loader={
              <div
                className="loader h-[3em] flex items-center justify-center"
                key="loader"
              >
                Loading ...
              </div>
            }
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
        )}
      </ul>
    </div>
    // <InfiniteScroller
    //   pageStart={0}
    //   loadMore={fetchMoreData}
    //   hasMore={true}
    //   useWindow={false}
    // >
    //   {data.map((item) => (
    //     <div key={item}>{item}</div>
    //   ))}
    // </InfiniteScroller>

    //   <table className="w-full [&_tr]:h-[2.75em] [&_tr]:border-b [&_tr]:border-[#4A6079] [&_th]:text-left">
    //     <thead className="text-[#B2C5D2]">
    //       <tr>
    //         <th>
    //           <FormattedMessage id="类型" />
    //         </th>
    //         <th>
    //           <FormattedMessage id="数量" />
    //         </th>
    //         <th>
    //           <FormattedMessage id="时间" />
    //         </th>
    //       </tr>
    //     </thead>

    //     <tbody className="max-h-[12em] overflow-y-auto">
    //       {/* <div className="h-[12em] overflow-y-auto"> */}
    //       <tr>
    //         <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
    //         <td>Malcolm Lockyer</td>
    //         <td>1961</td>
    //       </tr>
    //       <tr>
    //         <td>Witchy Woman</td>
    //         <td>The Eagles</td>
    //         <td>1972</td>
    //       </tr>
    //       <tr>
    //         <td>Shining Star</td>
    //         <td>Earth, Wind, and Fire</td>
    //         <td>1975</td>
    //       </tr>
    //       <tr>
    //         <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
    //         <td>Malcolm Lockyer</td>
    //         <td>1961</td>
    //       </tr>
    //       <tr>
    //         <td>Witchy Woman</td>
    //         <td>The Eagles</td>
    //         <td>1972</td>
    //       </tr>
    //       <tr>
    //         <td>Shining Star</td>
    //         <td>Earth, Wind, and Fire</td>
    //         <td>1975</td>
    //       </tr>
    //       <tr>
    //         <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
    //         <td>Malcolm Lockyer</td>
    //         <td>1961</td>
    //       </tr>
    //       <tr>
    //         <td>Witchy Woman</td>
    //         <td>The Eagles</td>
    //         <td>1972</td>
    //       </tr>
    //       <tr>
    //         <td>Shining Star</td>
    //         <td>Earth, Wind, and Fire</td>
    //         <td>1975</td>
    //       </tr>
    //       <tr>
    //         <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
    //         <td>Malcolm Lockyer</td>
    //         <td>1961</td>
    //       </tr>
    //       <tr>
    //         <td>Witchy Woman</td>
    //         <td>The Eagles</td>
    //         <td>1972</td>
    //       </tr>
    //       <tr>
    //         <td>Shining Star</td>
    //         <td>Earth, Wind, and Fire</td>
    //         <td>1975</td>
    //       </tr>
    //       <tr>
    //         <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
    //         <td>Malcolm Lockyer</td>
    //         <td>1961</td>
    //       </tr>
    //       <tr>
    //         <td>Witchy Woman</td>
    //         <td>The Eagles</td>
    //         <td>1972</td>
    //       </tr>
    //       <tr>
    //         <td>Shining Star</td>
    //         <td>Earth, Wind, and Fire</td>
    //         <td>1975</td>
    //       </tr>
    //     </tbody>
    //   </table>
  );
}
