import { createAppSlice } from "../../createAppSlice";
// import { fetchContracts } from "./contractAPI";
import { ERC1229Contract, ttokenContract } from "./defaultContracts";

export interface IContract {
  address: `0x${string}`;
  abi: Array<object>;
}

interface IContracts {
  ERC1229Contract: IContract;
  ttokenContract: IContract;
  status: "idle" | "loading" | "failed";
}

const initialState: IContracts = {
  ERC1229Contract: ERC1229Contract as IContract,
  ttokenContract: ttokenContract as IContract,
  status: "idle",
};

export const contractSlice = createAppSlice({
  name: "contract",
  initialState,
  reducers: () => ({}),
  // reducers: (create) => ({
  //   refreshContracts: create.asyncThunk(
  //     async () => {
  //       const response = await fetchContracts();
  //       return response;
  //     },
  //     {
  //       pending: (state) => {
  //         state.status = "loading";
  //       },
  //       fulfilled: (state, action) => {
  //         state.status = "idle";
  //         state.ERC1229Contract = action.payload.ERC1229Contract;
  //         state.ttokenContract = action.payload.ttokenContract;
  //       },
  //       rejected: (state) => {
  //         state.status = "failed";
  //       },
  //     }
  //   ),
  // }),
  selectors: {
    selectERC1229: (contracts) => contracts.ERC1229Contract,
    selectTtoken: (contracts) => contracts.ttokenContract,
    selectStatus: (contracts) => contracts.status,
  },
});

// export const { refreshContracts } = contractSlice.actions;
export const { selectERC1229, selectTtoken, selectStatus } =
  contractSlice.selectors;
