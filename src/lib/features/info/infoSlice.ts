import { createAppSlice } from "../../createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

type HexString = `0x${string}`;

interface BaseInfo {
  merchant_add: HexString;
  number_user: string;
}

interface LongInfo {
  tokenRouter: HexString;
  usdt: HexString;
  buy2parent_rate: string;
  node2vip_add_rate: string;
  post_aggregate_airdrop_price: string;
}

interface OtherInfo {
  notice: string;
  telegram_link: string;
  twitter_link: string;
  link_1: string;
  link_2: string;
}

interface InitInfo {
  liquidity_pool: HexString;
}

interface SystemInfo {
  baseinfo: BaseInfo;
  longinfo: LongInfo;
  otherinfo: OtherInfo;
  initinfo: InitInfo;
}

interface AccountInfo {
  parent: HexString;
  buy_flag: boolean;
  stake_flag: boolean;
  product_statu: number;
}

export interface Info {
  account_info?: AccountInfo;
  liquidity?: string;
  number_user?: string;
  systeminfo?: SystemInfo;
  stake_amount?: string;
}

interface InfoState {
  info: Info;
  totalToken: string;
  tokenName: string;
}

const initialState: InfoState = {
  info: {},
  totalToken: "0",
  tokenName: "",
};

export const infoSlice = createAppSlice({
  name: "info",
  initialState,
  reducers: (create) => ({
    setInfo: create.reducer((state, action: PayloadAction<Info>) => {
      state.info = action.payload;
    }),
    setTotalToken: create.reducer((state, action: PayloadAction<string>) => {
      state.totalToken = action.payload;
    }),
    setTokenName: create.reducer((state, action: PayloadAction<string>) => {
      state.tokenName = action.payload;
    }),
  }),
  selectors: {
    selectInfo: (selector) => selector.info,
    selectTotalToken: (selector) => selector.totalToken,
    selectTokenName: (selector) => selector.tokenName,
  },
});

export const { setInfo, setTotalToken,setTokenName } = infoSlice.actions;
export const { selectInfo, selectTotalToken,selectTokenName } = infoSlice.selectors;
