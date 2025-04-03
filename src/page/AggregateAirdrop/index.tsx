import { useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  useReadContract,
  useAccount,
  useWriteContract,
  usePublicClient,
} from "wagmi";
import { DateTime } from "luxon";
import BigNumber from "bignumber.js";
import { useAppSelector } from "../../lib/hooks";
import {
  selectERC1229,
  selectTtoken,
} from "../../lib/features/contract/contractSlice";
import Modal from "../../components/Modal";
import { useError } from "../../hooks/useError";
import { selectInfo } from "../../lib/features/info/infoSlice";
import Loading from "../../components/Loading";
import AirdropItem from "./AirdropItem";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import add from "/icon-add.png";

const initFormData = {
  token: "",
  wallet: "",
  time_start: "",
  time_end: "",
  info: "",
  totalamount: "",
  base_amount: "",
  already_received: "",
};

const initErrors = {
  token: "",
  wallet: "",
  time_start: "",
  time_end: "",
  info: "",
  totalamount: "",
  base_amount: "",
  already_received: "",
};

export default function AggregateAirdrop() {
  const ERC1229Contract = useAppSelector(selectERC1229);
  const TtokenContract = useAppSelector(selectTtoken);
  const { showError } = useError();
  const info = useAppSelector(selectInfo);
  const { systeminfo, account_info } = info || {};
  const { product_statu } = account_info || {};
  const { post_aggregate_airdrop_price, node2vip_add_rate, usdt } =
    systeminfo?.longinfo || {};
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initFormData);

  const [errors, setErrors] = useState(initErrors);

  const { data: res } = useReadContract({
    ...ERC1229Contract,
    functionName: "get_aggregate_airdrops",
    args: [0, 10],
  });

  const { data: nodevipinfo } = useReadContract({
    ...ERC1229Contract,
    functionName: "get_nodevipinfo",
    args: [address, 0, 0],
  });

  const { n_vip } = (nodevipinfo as { n_vip: bigint }) || {};

  const vipNum = Number(n_vip) || 0;

  const rate = useMemo(
    () =>
      BigNumber(node2vip_add_rate || 0)
        .dividedBy(1e18)
        .multipliedBy(vipNum)
        .plus(1.1),
    [vipNum, node2vip_add_rate]
  );

  const isNode = useMemo(() => {
    return product_statu === 0;
  }, [product_statu]);

  const data = useMemo(
    () =>
      Array.isArray(res) && res.length > 0
        ? res.filter(({ baseinfo }) => {
            return baseinfo?.flag;
          })
        : [],

    [res]
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setFormData(initFormData);
    setErrors(initErrors);
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));

    setErrors((pre) => ({
      ...pre,
      [name]: "",
    }));
  };

  const handleDateTimeChange =
    (name: "time_start" | "time_end") => (date: Date | null) => {
      if (date) {
        const value = DateTime.fromJSDate(date).toFormat("yyyy-MM-dd HH:mm");

        setFormData((pre) => ({
          ...pre,
          [name]: value,
        }));
      } else {
        setFormData((pre) => ({
          ...pre,
          [name]: "",
        }));
      }

      setErrors((pre) => ({
        ...pre,
        [name]: "",
      }));
    };

  const validate = () => {
    let valid = true;
    const newErrors = { ...initErrors };

    if (!formData.token) {
      newErrors.token = "Required!";
      valid = false;
    }

    if (!formData.wallet) {
      newErrors.wallet = "Required!";
      valid = false;
    }

    if (!formData.time_start) {
      newErrors.time_start = "Required!";
      valid = false;
    }

    if (!formData.time_end) {
      newErrors.time_end = "Required!";
      valid = false;
    }

    if (!formData.info) {
      newErrors.info = "Required!";
      valid = false;
    }

    if (!formData.totalamount) {
      newErrors.totalamount = "Required!";
      valid = false;
    }

    if (!formData.base_amount) {
      newErrors.base_amount = "Required!";
      valid = false;
    }

    if (!formData.already_received) {
      newErrors.already_received = "Required!";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const {
        token,
        wallet,
        time_start,
        time_end,
        info,
        totalamount,
        base_amount,
        already_received,
      } = formData;

      try {
        setLoading(true);

        // const allowance = await publicClient!.readContract({
        //   address: usdt!,
        //   abi: TtokenContract!.abi,
        //   functionName: "allowance",
        //   args: [address, ERC1229Contract.address],
        // });

        // if (
        //   BigNumber((allowance as string) || 0).lt(
        //     post_aggregate_airdrop_price || 0
        //   )
        // ) {
        if (token === usdt) {
          const approveParam = {
            address: usdt!,
            abi: TtokenContract!.abi,
            functionName: "approve",
            args: [
              ERC1229Contract.address,
              BigNumber(post_aggregate_airdrop_price || 0)
                .plus(BigNumber(totalamount).multipliedBy(1e18))
                .toFixed(),
            ],
            account: address,
          };

          const approveGas = await publicClient!.estimateContractGas(
            approveParam
          );

          const { request: approve } = await publicClient!.simulateContract({
            ...approveParam,
            gas: approveGas,
          });

          const approveHash = await writeContractAsync(approve);

          await publicClient!.waitForTransactionReceipt({
            hash: approveHash,
          });
        } else {
          const approveUSDTParam = {
            address: usdt!,
            abi: TtokenContract!.abi,
            functionName: "approve",
            args: [
              ERC1229Contract.address,
              BigInt(post_aggregate_airdrop_price || 0),
            ],
            account: address,
          };

          const approveUSDTGas = await publicClient!.estimateContractGas(
            approveUSDTParam
          );

          const { request: approveUSDT } = await publicClient!.simulateContract(
            {
              ...approveUSDTParam,
              gas: approveUSDTGas,
            }
          );

          const approveUSDTHash = await writeContractAsync(approveUSDT);

          const approveTokenParam = {
            address: token as "0x{string}",
            abi: TtokenContract!.abi,
            functionName: "approve",
            args: [
              ERC1229Contract.address,
              BigNumber(totalamount).multipliedBy(1e18).toFixed(),
            ],
            account: address,
          };

          const approveTokenGas = await publicClient!.estimateContractGas(
            approveTokenParam
          );

          const { request: approveToken } =
            await publicClient!.simulateContract({
              ...approveTokenParam,
              gas: approveTokenGas,
            });

          const approveTokenHash = await writeContractAsync(approveToken);

          await publicClient!.waitForTransactionReceipt({
            hash: approveUSDTHash,
          });

          await publicClient!.waitForTransactionReceipt({
            hash: approveTokenHash,
          });
        }

        // }

        // const approveReceipt = await publicClient!.waitForTransactionReceipt({

        const arg = {
          time_start: DateTime.fromFormat(
            time_start,
            "yyyy-MM-dd HH:mm"
          ).toSeconds(),
          time_end: DateTime.fromFormat(
            time_end,
            "yyyy-MM-dd HH:mm"
          ).toSeconds(),
          token: token,
          wallet: wallet,
          totalamount: BigNumber(totalamount).multipliedBy(1e18).toFixed(),
          base_amount: BigNumber(base_amount).multipliedBy(1e18).toFixed(),
          info: info,
          already_received: BigNumber(already_received)
            .multipliedBy(1e18)
            .toFixed(),
          flag: false,
        };

        const params = {
          ...ERC1229Contract,
          functionName: "post_aggregate_airdrop",
          args: [arg],
          account: address,
        };

        const gas = await publicClient!.estimateContractGas(params);

        const { request } = await publicClient!.simulateContract({
          ...params,
          gas,
        });

        const hash = await writeContractAsync(request);

        showError(`Succeed! \n hash: ${hash}`);
        closeModal();

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
    }
  };

  return (
    <section className="px-[0.5em]">
      <div className="py-[1.125em] px-[0.25em] flex items-center justify-between gap-[0.5em]">
        <p className="font-bold">
          <FormattedMessage id="聚合空投" />
        </p>
        {product_statu === 2 && (
          <button
            onClick={openModal}
            type="button"
            className="bg-[#0DD585]/20 px-[0.375em] py-[0.5em] flex items-center justify-center gap-[0.25em] rounded-[0.125em]"
          >
            <img src={add} alt="" className="size-[0.5em]" />

            <p className="text-[0.75em]">
              <FormattedMessage id="发布空投" />
            </p>
          </button>
        )}
      </div>

      <Swiper slidesPerView={Array.isArray(data) && data.length > 2 ? 2.2 : 2}>
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map(({ baseinfo, index }) => (
            <SwiperSlide key={index}>
              <AirdropItem
                baseinfo={baseinfo}
                index={index}
                setLoading={setLoading}
                isNode={isNode}
                rate={rate}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="max-h-[80vh] overflow-auto">
          <div className="px-[1em] py-[1.5em]">
            <form onSubmit={handleSubmit}>
              <div className="mb-[0.75em]">
                <label
                  htmlFor="token"
                  className="block text-[0.875em] text-[#B2C5D2]"
                >
                  <FormattedMessage id="代币地址" />
                </label>

                <input
                  type="text"
                  id="token"
                  name="token"
                  value={formData.token}
                  onChange={handleChange}
                  placeholder="0x..."
                  className="mt-[0.5em] w-full bg-[#041323] px-[0.5em] py-[0.75em] rounded-[0.5em]"
                />
                {errors.token && (
                  <p className="text-red-500 text-sm mt-1">{errors.token}</p>
                )}
              </div>

              <div className="mb-[0.75em]">
                <label
                  htmlFor="wallet"
                  className="block text-[0.875em] text-[#B2C5D2]"
                >
                  <FormattedMessage id="空投地址" />
                </label>

                <input
                  type="text"
                  id="wallet"
                  name="wallet"
                  value={formData.wallet}
                  onChange={handleChange}
                  placeholder="0x..."
                  className="mt-[0.5em] w-full bg-[#041323] px-[0.5em] py-[0.75em] rounded-[0.5em]"
                />
                {errors.wallet && (
                  <p className="text-red-500 text-sm mt-1">{errors.wallet}</p>
                )}
              </div>

              <div className="mb-[0.75em]">
                <label
                  htmlFor="time_start"
                  className="block text-[0.875em] text-[#B2C5D2]"
                >
                  <FormattedMessage id="开放时间" />
                </label>

                <DatePicker
                  withPortal
                  showTimeSelect
                  timeFormat="HH:mm:ss"
                  dateFormat="yyyy-MM-dd HH:mm"
                  id="time_start"
                  name="time_start"
                  // value={formData.time_start}
                  selected={
                    formData?.time_start ? new Date(formData.time_start) : null
                  }
                  onChange={handleDateTimeChange("time_start")}
                  className="mt-[0.5em] w-full bg-[#041323] px-[0.5em] py-[0.75em] rounded-[0.5em] relative"
                />
                {/* <input
                  type="datetime-local"
                  id="time_start"
                  name="time_start"
                  value={formData.time_start}
                  onChange={handleChange}
                  className="mt-[0.5em] w-full bg-[#041323] px-[0.5em] py-[0.75em] rounded-[0.5em] relative"
                /> */}
                {errors.time_start && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.time_start}
                  </p>
                )}
              </div>

              <div className="mb-[0.75em]">
                <label
                  htmlFor="time_end"
                  className="block text-[0.875em] text-[#B2C5D2]"
                >
                  <FormattedMessage id="结束时间" />
                </label>

                <DatePicker
                  withPortal
                  showTimeSelect
                  timeFormat="HH:mm:ss"
                  dateFormat="yyyy-MM-dd HH:mm"
                  id="time_end"
                  name="time_end"
                  // value={formData.time_end}
                  selected={
                    formData?.time_end ? new Date(formData.time_end) : null
                  }
                  onChange={handleDateTimeChange("time_end")}
                  className="mt-[0.5em] w-full bg-[#041323] px-[0.5em] py-[0.75em] rounded-[0.5em] relative"
                />
                {/* <input
                  type="datetime-local"
                  id="time_end"
                  name="time_end"
                  value={formData.time_end}
                  onChange={handleChange}
                  className="mt-[0.5em] w-full bg-[#041323] px-[0.5em] py-[0.75em] rounded-[0.5em] relative"
                /> */}
                {errors.time_end && (
                  <p className="text-red-500 text-sm mt-1">{errors.time_end}</p>
                )}
              </div>

              <div className="mb-[0.75em]">
                <label
                  htmlFor="totalamount"
                  className="block text-[0.875em] text-[#B2C5D2]"
                >
                  <FormattedMessage id="空投总量" />
                </label>

                <input
                  type="text"
                  id="totalamount"
                  name="totalamount"
                  value={formData.totalamount}
                  onChange={handleChange}
                  // placeholder="10000"
                  className="mt-[0.5em] w-full bg-[#041323] px-[0.5em] py-[0.75em] rounded-[0.5em]"
                />
                {errors.totalamount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.totalamount}
                  </p>
                )}
              </div>

              <div className="mb-[0.75em]">
                <label
                  htmlFor="base_amount"
                  className="block text-[0.875em] text-[#B2C5D2]"
                >
                  <FormattedMessage id="一份数量" />
                </label>

                <input
                  type="text"
                  id="base_amount"
                  name="base_amount"
                  value={formData.base_amount}
                  onChange={handleChange}
                  // placeholder="10"
                  className="mt-[0.5em] w-full bg-[#041323] px-[0.5em] py-[0.75em] rounded-[0.5em]"
                />
                {errors.base_amount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.base_amount}
                  </p>
                )}
              </div>

              <div className="mb-[0.75em]">
                <label
                  htmlFor="already_received"
                  className="block text-[0.875em] text-[#B2C5D2]"
                >
                  <FormattedMessage id="已空投数量" />
                </label>

                <input
                  type="text"
                  id="already_received"
                  name="already_received"
                  value={formData.already_received}
                  onChange={handleChange}
                  // placeholder="0"
                  className="mt-[0.5em] w-full bg-[#041323] px-[0.5em] py-[0.75em] rounded-[0.5em]"
                />
                {errors.already_received && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.already_received}
                  </p>
                )}
              </div>

              <div className="mb-[0.75em]">
                <label
                  htmlFor="info"
                  className="block text-sm font-medium text-gray-700"
                >
                  <FormattedMessage id="项目详情" />
                </label>

                <textarea
                  id="info"
                  name="info"
                  value={formData.info}
                  onChange={handleChange}
                  className="mt-[0.5em] w-full bg-[#041323] px-[0.5em] py-[0.75em] rounded-[0.5em] resize-none"
                  rows={4}
                />
                {errors.info && (
                  <p className="text-red-500 text-sm mt-1">{errors.info}</p>
                )}
              </div>

              <div className="flex items-center gap-[1em]">
                <p className="flex items-end gap-[0.5em]">
                  <span className="font-bold">
                    {BigNumber(post_aggregate_airdrop_price || 0)
                      .dividedBy(1e18)
                      .toFormat(3)}
                  </span>

                  <span className="text-[0.875em] text-[#5C6E7A]">USDT</span>
                </p>

                <button
                  type="submit"
                  className="bg-[#0DD585] text-white p-[1em] rounded-[0.25em] flex-1"
                >
                  <FormattedMessage id="提交" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      {loading && <Loading />}
    </section>
  );
}
