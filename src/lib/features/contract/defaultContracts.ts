export const ERC1229Contract = {
  address: "0x3909E03e3A8C102733658C21Ef662B86096C492D",
  abi: [
    {
      "inputs": [],
      "name": "InvalidInitialization",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotInitializing",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "version",
          "type": "uint64"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "airdrop",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "blocktime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum Ienum.product_status",
          "name": "product_statu",
          "type": "uint8"
        }
      ],
      "name": "buy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "buy_platform_subscription",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fake_add_pool_stake_amount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "get_aggregate_airdrops",
      "outputs": [
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "time_start",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "time_end",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "wallet",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "totalamount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "base_amount",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "info",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "already_received",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "flag",
                  "type": "bool"
                }
              ],
              "internalType": "struct Istruct.s_aggregate_airdrop",
              "name": "baseinfo",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "internalType": "struct Istruct.s_show_aggregate_airdrop[]",
          "name": "_aggregate_airdrops",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "get_aggregate_alliances",
      "outputs": [
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "url",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "time_start",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "time_end",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "info",
                  "type": "string"
                }
              ],
              "internalType": "struct Istruct.s_aggregate_alliance",
              "name": "baseinfo",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "internalType": "struct Istruct.s_show_aggregate_alliance[]",
          "name": "_aggregate_alliances",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "get_airdrop_infos",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "mul",
              "type": "uint256"
            }
          ],
          "internalType": "struct Istruct.s_airdrop_info[]",
          "name": "_airdrop_infos",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "get_node_list",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "get_nodevipinfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address[]",
              "name": "vips",
              "type": "address[]"
            },
            {
              "internalType": "uint256",
              "name": "n_vip",
              "type": "uint256"
            }
          ],
          "internalType": "struct Istruct.s_show_node_vip",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "get_platform_airdrops",
      "outputs": [
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "info",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "time_start",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "totalamount",
                  "type": "uint256"
                }
              ],
              "internalType": "struct Istruct.s_platform_airdrop",
              "name": "baseinfo",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "internalType": "struct Istruct.s_show_platform_airdrop[]",
          "name": "_platform_airdrops",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "get_platform_subscription",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "already_received",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalamount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time_start",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time_end",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "baseamount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "baseprice",
              "type": "uint256"
            }
          ],
          "internalType": "struct Istruct.s_platform_subscription",
          "name": "_platform_subscription",
          "type": "tuple"
        },
        {
          "internalType": "uint256",
          "name": "havebuyed",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "get_product_infos",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "info",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time_start",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time_end",
              "type": "uint256"
            }
          ],
          "internalType": "struct Istruct.s_product_info[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "get_stake_infos",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "flag",
              "type": "bool"
            }
          ],
          "internalType": "struct Istruct.s_stake_info[]",
          "name": "_stake_infos",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getinfo",
      "outputs": [
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "parent",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "buy_flag",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "stake_flag",
                  "type": "bool"
                },
                {
                  "internalType": "enum Ienum.product_status",
                  "name": "product_statu",
                  "type": "uint8"
                }
              ],
              "internalType": "struct Istruct.s_account_info",
              "name": "account_info",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "liquidity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "number_user",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "components": [
                    {
                      "internalType": "address",
                      "name": "merchant_add",
                      "type": "address"
                    },
                    {
                      "internalType": "uint256",
                      "name": "number_user",
                      "type": "uint256"
                    }
                  ],
                  "internalType": "struct Istruct.s_baseinfo",
                  "name": "baseinfo",
                  "type": "tuple"
                },
                {
                  "components": [
                    {
                      "internalType": "address",
                      "name": "tokenRouter",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "usdt",
                      "type": "address"
                    },
                    {
                      "internalType": "uint256",
                      "name": "buy2parent_rate",
                      "type": "uint256"
                    },
                    {
                      "internalType": "uint256",
                      "name": "node2vip_add_rate",
                      "type": "uint256"
                    },
                    {
                      "internalType": "uint256",
                      "name": "post_aggregate_airdrop_price",
                      "type": "uint256"
                    }
                  ],
                  "internalType": "struct Istruct.s_longinfo",
                  "name": "longinfo",
                  "type": "tuple"
                },
                {
                  "components": [
                    {
                      "internalType": "string",
                      "name": "notice",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "telegram_link",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "twitter_link",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "link_1",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "link_2",
                      "type": "string"
                    }
                  ],
                  "internalType": "struct Istruct.s_otherinfo",
                  "name": "otherinfo",
                  "type": "tuple"
                },
                {
                  "components": [
                    {
                      "internalType": "contract TokenRepository",
                      "name": "liquidity_pool",
                      "type": "address"
                    }
                  ],
                  "internalType": "struct Istruct.s_initinfo",
                  "name": "initinfo",
                  "type": "tuple"
                }
              ],
              "internalType": "struct Istruct.s_systeminfo",
              "name": "systeminfo",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "stake_amount",
              "type": "uint256"
            }
          ],
          "internalType": "struct Istruct.s_show_info",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "addrs",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "baseamount",
          "type": "uint256"
        }
      ],
      "name": "platform_airdrop",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "platform_subscription",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "already_received",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalamount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "time_start",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "time_end",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "baseamount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "baseprice",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "time_start",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time_end",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "wallet",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "totalamount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "base_amount",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "info",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "already_received",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "flag",
              "type": "bool"
            }
          ],
          "internalType": "struct Istruct.s_aggregate_airdrop",
          "name": "_aggregate_airdrop",
          "type": "tuple"
        }
      ],
      "name": "post_aggregate_airdrop",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "parent",
          "type": "address"
        }
      ],
      "name": "register",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "time_start",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "time_end",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "wallet",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "totalamount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "base_amount",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "info",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "already_received",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "flag",
                  "type": "bool"
                }
              ],
              "internalType": "struct Istruct.s_aggregate_airdrop",
              "name": "baseinfo",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "internalType": "struct Istruct.s_show_aggregate_airdrop[]",
          "name": "_aggregate_airdrops",
          "type": "tuple[]"
        }
      ],
      "name": "set_aggregate_airdrop",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "url",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "time_start",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time_end",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "info",
              "type": "string"
            }
          ],
          "internalType": "struct Istruct.s_aggregate_alliance[]",
          "name": "_aggregate_alliances",
          "type": "tuple[]"
        }
      ],
      "name": "set_aggregate_alliance",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "merchant_add",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "number_user",
              "type": "uint256"
            }
          ],
          "internalType": "struct Istruct.s_baseinfo",
          "name": "baseinfo",
          "type": "tuple"
        }
      ],
      "name": "set_baseinfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "blocktime",
          "type": "uint256"
        }
      ],
      "name": "set_blocktime",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_fake_add_pool_stake_amount",
          "type": "uint256"
        }
      ],
      "name": "set_fake_add_pool_stake_amount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "tokenRouter",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "usdt",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "buy2parent_rate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "node2vip_add_rate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "post_aggregate_airdrop_price",
              "type": "uint256"
            }
          ],
          "internalType": "struct Istruct.s_longinfo",
          "name": "longinfo",
          "type": "tuple"
        }
      ],
      "name": "set_longinfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "notice",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "telegram_link",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "twitter_link",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "link_1",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "link_2",
              "type": "string"
            }
          ],
          "internalType": "struct Istruct.s_otherinfo",
          "name": "otherinfo",
          "type": "tuple"
        }
      ],
      "name": "set_otherinfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "info",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "time_start",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "totalamount",
              "type": "uint256"
            }
          ],
          "internalType": "struct Istruct.s_platform_airdrop[]",
          "name": "_platform_airdrops",
          "type": "tuple[]"
        }
      ],
      "name": "set_platform_airdrop",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "already_received",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalamount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time_start",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time_end",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "baseamount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "baseprice",
              "type": "uint256"
            }
          ],
          "internalType": "struct Istruct.s_platform_subscription",
          "name": "_platform_subscription",
          "type": "tuple"
        }
      ],
      "name": "set_platform_subscription",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum Ienum.product_status",
          "name": "status",
          "type": "uint8"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "info",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time_start",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time_end",
              "type": "uint256"
            }
          ],
          "internalType": "struct Istruct.s_product_info",
          "name": "product_info",
          "type": "tuple"
        }
      ],
      "name": "set_product_info",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "stake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "systeminfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "merchant_add",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "number_user",
              "type": "uint256"
            }
          ],
          "internalType": "struct Istruct.s_baseinfo",
          "name": "baseinfo",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "address",
              "name": "tokenRouter",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "usdt",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "buy2parent_rate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "node2vip_add_rate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "post_aggregate_airdrop_price",
              "type": "uint256"
            }
          ],
          "internalType": "struct Istruct.s_longinfo",
          "name": "longinfo",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "notice",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "telegram_link",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "twitter_link",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "link_1",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "link_2",
              "type": "string"
            }
          ],
          "internalType": "struct Istruct.s_otherinfo",
          "name": "otherinfo",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "contract TokenRepository",
              "name": "liquidity_pool",
              "type": "address"
            }
          ],
          "internalType": "struct Istruct.s_initinfo",
          "name": "initinfo",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "total_real_pool_stake_amount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unstake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "user_buyed_amount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw_liquidity_pool",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
};

export const ttokenContract = {
  address: "0xbBA21FA8CD9f801d9A33653bf4E284bD8cD61EC5",
  abi: [
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "symbol",
          type: "string",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "allowance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientAllowance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientBalance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "approver",
          type: "address",
        },
      ],
      name: "ERC20InvalidApprover",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "ERC20InvalidReceiver",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSpender",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
