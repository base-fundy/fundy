"use client";

import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
// import { parseEther } from "viem";
// import { useAccount } from "wagmi";
import { useDeployedContractInfo, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const FundyRound: NextPage = () => {
  // const { address: connectedAddress } = useAccount();
  const [fundingAmount, setFundingAmount] = useState<bigint>(BigInt(0));
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [shitCoinContract, setShitCoinContract] = useState<ShitCoinContract>("WhyDidHeLeave");
  const [roundEnded, setRoundEnded] = useState<boolean>(false);

  const { data: projects, isLoading: isProjectsLoading } = useScaffoldContractRead({
    contractName: "FundingRound",
    functionName: "getProjects",
    watch: true,
  });

  const { data: deployedFundingRoundContract } = useDeployedContractInfo("FundingRound");

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "FundingRound",
    functionName: "fund",
    args: [useDeployedContractInfo(shitCoinContract).data?.address, BigInt(10)],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  type ShitCoinContract = "WhyDidHeLeave" | "toby" | "Degen" | "mfercoin" | "Brett" | string;

  const { writeAsync: writeAsyncAllow, isLoading: isLoadingAllow } = useScaffoldContractWrite({
    contractName: shitCoinContract as string,
    functionName: "approve",
    args: [deployedFundingRoundContract?.address, fundingAmount.toString()],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      setIsApproved(true);
    },
  });

  const handleSetShitCoinContract = (newShitCoinContract: ShitCoinContract) => {
    setShitCoinContract(newShitCoinContract);
    setIsApproved(false);
  };

  return (
    <>
      <div className="hero min-h-screen" style={{ backgroundImage: "url(/hero.svg)" }}>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md"></div>
        </div>
      </div>
      <div className="mt-28">
        <div className="w-3/4 m-auto pb-20">
          <h1 className="text-9xl text-white">Round 1 – Catalyst</h1>
          <h2 className="text-3xl text-white mb-20 text-center">
            Dump your Memecoins for the Good & Expect the Unexpected
          </h2>
          <div className="my-20 text-center">
            <div className="mb-10">
              <ul className="menu bg-base-200 lg:menu-horizontal rounded-box gap-1">
                <li>
                  <button onClick={() => handleSetShitCoinContract("WhyDidHeLeave")}>
                    WhyDidHeLeave
                    <Image src="/why.jpeg" alt="WhyDidHeLeave" width={20} height={20} />
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSetShitCoinContract("Degen")}>
                    Degen
                    <Image src="/degen.webp" alt="Degen" width={20} height={20} />
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSetShitCoinContract("Brett")}>
                    Brett
                    <Image src="/brett.webp" alt="Brett" width={20} height={20} />
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSetShitCoinContract("mfercoin")}>
                    mfercoin
                    <Image src="/mfercoin.webp" alt="mfercoin" width={20} height={20} />
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSetShitCoinContract("toby")}>
                    toby
                    <Image src="/toby.webp" alt="toby" width={20} height={20} />
                  </button>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <input
                type="number"
                className="input input-bordered w-full max-w-xs mr-10"
                placeholder={`Amount in ${shitCoinContract}`}
                onChange={event => {
                  setFundingAmount(BigInt(event.target.value));
                }}
              />
              {!isApproved ? (
                <button
                  className="btn btn-ghost bg-purple-500 hover:bg-purple-300"
                  onClick={() => writeAsyncAllow()}
                  disabled={isLoadingAllow}
                >
                  {isLoadingAllow ? <span className="loading loading-spinner loading-sm"></span> : <>Approve</>}
                </button>
              ) : (
                <button
                  className="btn btn-ghost bg-purple-500 hover:bg-purple-300"
                  onClick={() => writeAsync()}
                  disabled={isLoading}
                >
                  {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Fund</>}
                </button>
              )}
            </div>
          </div>
          {isProjectsLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            projects?.map(project => (
              <div key={project.id} className="card lg:card-side bg-base-100 shadow-xl mb-6">
                <figure className="w-1/2 p-6">
                  <Image src={`/p${Number(project.id)}.png`} width="100" height="100" alt="P1" />
                </figure>
                <div className="card-body w-1/2">
                  <h3 className="card-title text-4xl">{project.name}</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <div className="card-actions justify-between">
                    {roundEnded && <button className="btn btn-ghost bg-orange-300 hover:bg-orange-300">project</button>}
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="w-full text-center pt-20">
            <button
              className="btn btn-ghost bg-purple-500 hover:bg-purple-300"
              onClick={() => setRoundEnded(true)}
              disabled={isLoadingAllow}
            >
              {isLoadingAllow ? <span className="loading loading-spinner loading-sm"></span> : <>End Round</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FundyRound;
