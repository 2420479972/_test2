export const fetchContracts = async () => {
  const response = await fetch("https://dev.egoistmusic.top/v1/contractapi");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { data, success } = await response.json();

  if (!success) {
    throw new Error("Request failed:");
  }

  const contractinfo = data?.contractinfo?.["97"] || {};

  const { ERC1229, ttoken } = contractinfo || {};

  const ERC1229Contract = {
    address: ERC1229?.address,
    abi: ERC1229?.abi,
  };

  const ttokenContract = {
    address: ttoken?.address,
    abi: ttoken?.abi,
  } as const;

  return {
    ERC1229Contract,
    ttokenContract,
  };
};
