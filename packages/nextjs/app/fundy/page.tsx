"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { parseEther } from "viem";
// import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const FundyRound: NextPage = () => {
  // const { address: connectedAddress } = useAccount();
  const [votedProjects, setVotedProjects] = useState<bigint[]>([]);
  const [fundingAmount, setFundingAmount] = useState<number>(0);

  const { data: projects, isLoading: isProjectsLoading } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getProjects",
    watch: true,
  });

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "fundProjectsByIds",
    args: [votedProjects.toString()],
    value: parseEther(fundingAmount.toString()),
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <div className="hero min-h-screen" style={{ backgroundImage: "url(/hero.svg)" }}>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h1 className="text-2xl">Funding round 1</h1>
        <progress className="progress w-56" value="70" max="100"></progress>
        {isProjectsLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          projects?.map(project => (
            <div key={project.id} className="card lg:card-side bg-base-100 shadow-xl mb-6">
              <figure>
                <img src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{project.name}</h3>
                <span>{project.balance.toString()}</span>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
                <div className="card-actions justify-end">
                  <label>Vote</label>
                  <input
                    type="checkbox"
                    onClick={() => {
                      setVotedProjects([...votedProjects, project.id]);
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
        <input
          type="number"
          onChange={event => {
            setFundingAmount(Number(event.target.value));
          }}
        />
        <button className="btn btn-primary" onClick={() => writeAsync()} disabled={isLoading}>
          {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Fund</>}
        </button>
      </div>
    </>
  );
};

export default FundyRound;
