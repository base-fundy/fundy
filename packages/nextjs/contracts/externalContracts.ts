import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const externalContracts = {
  84532: {
    MockUSDC: {
      address: "0x8AD9aD7A3c31fB0c38EC884F520eC8155fD33246",
      abi: [
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
      ],
      inheritedFunctions: {
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
      },
    },
    FundingRound: {
      address: "0x2E2Ed0Cfd3AD2f1d34481277b3204d807Ca2F8c2",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "mUSDCAddress",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "LOCKUP_DYNAMIC",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract ISablierV2LockupDynamic",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "contributeAndVote",
          inputs: [
            {
              name: "projectIds",
              type: "uint256[]",
              internalType: "uint256[]",
            },
            {
              name: "totalAmount",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "createProject",
          inputs: [
            {
              name: "name",
              type: "string",
              internalType: "string",
            },
            {
              name: "recipient",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "createStream",
          inputs: [
            {
              name: "amount0",
              type: "uint128",
              internalType: "uint128",
            },
            {
              name: "amount1",
              type: "uint128",
              internalType: "uint128",
            },
            {
              name: "projectAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "streamId",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "distributeFunds",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "getProjects",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "tuple[]",
              internalType: "struct FundingRound.Project[]",
              components: [
                {
                  name: "id",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "votingPoints",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "name",
                  type: "string",
                  internalType: "string",
                },
                {
                  name: "recipient",
                  type: "address",
                  internalType: "address",
                },
              ],
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getTotalUSDCBalance",
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
          name: "projects",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "id",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "votingPoints",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "name",
              type: "string",
              internalType: "string",
            },
            {
              name: "recipient",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "event",
          name: "Debug",
          inputs: [
            {
              name: "number",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "FundsContributed",
          inputs: [
            {
              name: "contributor",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "projectIds",
              type: "uint256[]",
              indexed: false,
              internalType: "uint256[]",
            },
            {
              name: "totalAmount",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "FundsDistributed",
          inputs: [],
          anonymous: false,
        },
        {
          type: "event",
          name: "ProjectCreated",
          inputs: [
            {
              name: "projectId",
              type: "uint256",
              indexed: true,
              internalType: "uint256",
            },
            {
              name: "name",
              type: "string",
              indexed: false,
              internalType: "string",
            },
            {
              name: "recipient",
              type: "address",
              indexed: false,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
      ],
      inheritedFunctions: {},
    },
  },
  84532: {
    FundingRound: {
      address: "0x9c98B787073d276922e2143FF9C0174e11Ca61e4",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "mUSDCAddress",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "LOCKUP_DYNAMIC",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract ISablierV2LockupDynamic",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "contributeAndVote",
          inputs: [
            {
              name: "projectIds",
              type: "uint256[]",
              internalType: "uint256[]",
            },
            {
              name: "totalAmount",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "createProject",
          inputs: [
            {
              name: "name",
              type: "string",
              internalType: "string",
            },
            {
              name: "recipient",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "createStream",
          inputs: [
            {
              name: "amount0",
              type: "uint128",
              internalType: "uint128",
            },
            {
              name: "amount1",
              type: "uint128",
              internalType: "uint128",
            },
            {
              name: "projectAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "streamId",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "distributeFunds",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "getProjects",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "tuple[]",
              internalType: "struct FundingRound.Project[]",
              components: [
                {
                  name: "id",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "votingPoints",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "name",
                  type: "string",
                  internalType: "string",
                },
                {
                  name: "recipient",
                  type: "address",
                  internalType: "address",
                },
              ],
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getTotalUSDCBalance",
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
          name: "projects",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "id",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "votingPoints",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "name",
              type: "string",
              internalType: "string",
            },
            {
              name: "recipient",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "event",
          name: "Debug",
          inputs: [
            {
              name: "number",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "FundsContributed",
          inputs: [
            {
              name: "contributor",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "projectIds",
              type: "uint256[]",
              indexed: false,
              internalType: "uint256[]",
            },
            {
              name: "totalAmount",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "FundsDistributed",
          inputs: [],
          anonymous: false,
        },
        {
          type: "event",
          name: "ProjectCreated",
          inputs: [
            {
              name: "projectId",
              type: "uint256",
              indexed: true,
              internalType: "uint256",
            },
            {
              name: "name",
              type: "string",
              indexed: false,
              internalType: "string",
            },
            {
              name: "recipient",
              type: "address",
              indexed: false,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

// const externalContracts = {} as const;

export default externalContracts satisfies GenericContractsDeclaration;
