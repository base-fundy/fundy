import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const erc20ABI = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "allowance",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decreaseAllowance",
    inputs: [
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
      {
        name: "subtractedValue",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "increaseAllowance",
    inputs: [
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
      {
        name: "addedValue",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
];
const inheritedFunctionsERC20 = {
  allowance: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
  approve: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
  balanceOf: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
  decimals: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
  decreaseAllowance: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
  increaseAllowance: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
  name: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
  symbol: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
  totalSupply: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
  transfer: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
  transferFrom: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
};

const externalContracts = {
  84532: {
    Degen: {
      address: "0x07B8FF46Cc6e366Fe12e4d3D47825000d9948eCD",
      abi: erc20ABI,
      inheritedFunctions: inheritedFunctionsERC20,
    },
    toby: {
      address: "0x030996ec60617Fe293B4A51c97bE0973C9ECDF33",
      abi: erc20ABI,
      inheritedFunctions: inheritedFunctionsERC20,
    },
    WhyDidHeLeave: {
      address: "0x9080cFe04A99afeBF37EaA40441c4191B46c2cd1",
      abi: erc20ABI,
      inheritedFunctions: inheritedFunctionsERC20,
    },
    mfercoin: {
      address: "0xf45b4dE5C02A7FD2cb137145fb52e7D6d5a9a32e",
      abi: erc20ABI,
      inheritedFunctions: inheritedFunctionsERC20,
    },
    Brett: {
      address: "0xB77Ff06d00179F0811E9788B2cBA6A2b0011B165",
      abi: erc20ABI,
      inheritedFunctions: inheritedFunctionsERC20,
    },
    FundingRound: {
      address: "0x2e5D68899078913751DaE2f6aF8f47F604E4ce94",
      abi: [
        {
          inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        { inputs: [], name: "ShitCoinAlreadyExists", type: "error" },
        { inputs: [], name: "ShitCoinNotApproved", type: "error" },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "address", name: "shitCoin", type: "address" },
            { indexed: false, internalType: "uint256", name: "totalAmount", type: "uint256" },
            { indexed: false, internalType: "address", name: "projectAddress", type: "address" },
          ],
          name: "DynamicStream",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "address", name: "shitCoin", type: "address" },
            { indexed: false, internalType: "uint256", name: "totalAmount", type: "uint256" },
            { indexed: false, internalType: "address", name: "projectAddress", type: "address" },
          ],
          name: "ExponentialStream",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "address", name: "shitCoin", type: "address" },
            { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
          ],
          name: "Funded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "address", name: "contributor", type: "address" },
            { indexed: false, internalType: "uint256[]", name: "projectIds", type: "uint256[]" },
            { indexed: false, internalType: "uint256", name: "totalAmount", type: "uint256" },
          ],
          name: "FundsContributed",
          type: "event",
        },
        { anonymous: false, inputs: [], name: "FundsDistributed", type: "event" },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "address", name: "shitCoin", type: "address" },
            { indexed: false, internalType: "uint256", name: "totalAmount", type: "uint256" },
            { indexed: false, internalType: "address", name: "projectAddress", type: "address" },
          ],
          name: "LinearStream",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
            { indexed: true, internalType: "address", name: "newOwner", type: "address" },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "uint256", name: "projectId", type: "uint256" },
            { indexed: false, internalType: "string", name: "name", type: "string" },
            { indexed: false, internalType: "address", name: "recipient", type: "address" },
          ],
          name: "ProjectCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, internalType: "address", name: "newShitCoin", type: "address" }],
          name: "ShitCoinAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, internalType: "uint256", name: "requestId", type: "uint256" },
            { indexed: false, internalType: "uint256[]", name: "randomWords", type: "uint256[]" },
          ],
          name: "fulfilledRandomWords",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, internalType: "uint256", name: "requestId", type: "uint256" }],
          name: "requestedRandomness",
          type: "event",
        },
        {
          inputs: [],
          name: "LOCKUP_DYNAMIC",
          outputs: [{ internalType: "contract ISablierV2LockupDynamic", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "LOCKUP_LINEAR",
          outputs: [{ internalType: "contract ISablierV2LockupLinear", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "VRFGateway",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "string", name: "name", type: "string" },
            { internalType: "address", name: "recipient", type: "address" },
          ],
          name: "createProject",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "projectAddress", type: "address" },
            { internalType: "address", name: "shitCoin", type: "address" },
            { internalType: "uint256", name: "randomWord", type: "uint256" },
          ],
          name: "createStream",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint32", name: "_callbackGasLimit", type: "uint32" }],
          name: "endFoundingRound",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "requestId", type: "uint256" },
            { internalType: "uint256[]", name: "randomWords", type: "uint256[]" },
          ],
          name: "fulfillRandomWords",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "shitCoin", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          name: "fund",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getProjects",
          outputs: [
            {
              components: [
                { internalType: "uint256", name: "id", type: "uint256" },
                { internalType: "uint256", name: "votingPoints", type: "uint256" },
                { internalType: "string", name: "name", type: "string" },
                { internalType: "address", name: "recipient", type: "address" },
                { internalType: "address[]", name: "shitcoins", type: "address[]" },
                { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
              ],
              internalType: "struct FundingRound.Project[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "projects",
          outputs: [
            { internalType: "uint256", name: "id", type: "uint256" },
            { internalType: "uint256", name: "votingPoints", type: "uint256" },
            { internalType: "string", name: "name", type: "string" },
            { internalType: "address", name: "recipient", type: "address" },
          ],
          stateMutability: "view",
          type: "function",
        },
        { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
        {
          inputs: [{ internalType: "address", name: "_VRFGateway", type: "address" }],
          name: "setGatewayAddress",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "newShitCoin", type: "address" }],
          name: "setShitCoin",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "shitCoinList",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "shitCoin", type: "address" }],
          name: "shitCoins",
          outputs: [{ internalType: "bool", name: "approved", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

// const externalContracts = {} as const;

export default externalContracts satisfies GenericContractsDeclaration;
