"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { parseEther } from "viem";
// import { useAccount } from "wagmi";
import { useDeployedContractInfo, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const FundyRound: NextPage = () => {
  // const { address: connectedAddress } = useAccount();
  const [votedProjects, setVotedProjects] = useState<bigint[]>([]);
  const [fundingAmount, setFundingAmount] = useState<bigint>(BigInt(0));
  const [isApproved, setIsApproved] = useState<boolean>(false);

  const { data: projects, isLoading: isProjectsLoading } = useScaffoldContractRead({
    contractName: "FundingRound",
    functionName: "getProjects",
    watch: true,
  });

  const { data: deployedFundingRoundContract } = useDeployedContractInfo("FundingRound");

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "FundingRound",
    functionName: "contributeAndVote",
    args: [votedProjects, fundingAmount],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: writeAsyncAllow, isLoading: isLoadingAllow } = useScaffoldContractWrite({
    contractName: "MockUSDC",
    functionName: "approve",
    args: [deployedFundingRoundContract?.address, BigInt(100000)],
    value: parseEther(fundingAmount.toString()),
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      setIsApproved(true);
    },
  });

  return (
    <>
      <div className="hero min-h-screen" style={{ backgroundImage: "url(/hero.svg)" }}>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md"></div>
        </div>
      </div>
      <div className="mt-28">
        <div className="w-3/4 m-auto">
          <h1 className="text-9xl text-white">Round 1 – Catalyst</h1>
          <h2 className="text-3xl text-white mb-20">
            Offer a helping hand fort the innovative gnome, that likes to tinker.
          </h2>
          {isProjectsLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            projects?.map(project => (
              <div key={project.id} className="card lg:card-side bg-base-100 shadow-xl mb-6">
                <figure className="w-1/2">
                  <img src={`https://picsum.photos/id/${Number(project.id) + 100}/400`} alt="Album" />
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
                    <div className="badge badge-lg bg-orange-300">
                      <div className="p-5">Votes: {project.votingPoints.toString()}</div>
                    </div>
                    <div className="flex">
                      <label className="mr-2">select</label>
                      <input
                        type="checkbox"
                        className="toggle toddle-success"
                        checked={votedProjects.includes(project.id)}
                        onChange={() => {
                          setVotedProjects(
                            votedProjects.includes(project.id)
                              ? votedProjects.filter(id => id !== project.id)
                              : [...votedProjects, project.id],
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="my-20 text-right">
            <input
              type="number"
              className="input input-bordered w-full max-w-xs mr-10"
              placeholder="Amount in USDC"
              onChange={event => {
                setFundingAmount(BigInt(event.target.value));
              }}
            />
            {isApproved ? (
              <button
                className="btn btn-ghost bg-purple-500"
                onClick={() => writeAsyncAllow()}
                disabled={isLoadingAllow}
              >
                {isLoadingAllow ? <span className="loading loading-spinner loading-sm"></span> : <>Approve</>}
              </button>
            ) : (
              <button className="btn btn-ghost bg-purple-500" onClick={() => writeAsync()} disabled={isLoading}>
                {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Fund</>}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FundyRound;
