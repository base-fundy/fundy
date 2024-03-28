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
    args: [votedProjects],
    value: parseEther(fundingAmount.toString()),
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="card card-compact w-64 bg-secondary text-primary-content shadow-xl m-4">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Funding round 1</h2>
        <div className="card-actions items-center flex-col gap-1 text-lg">
          <h2 className="font-bold m-0">All Projects</h2>
          {isProjectsLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <ul className="list-disc pl-4">
              {projects?.map(project => (
                <li key={project.id}>
                  {`${project.id} ${project.name} - Balance: ${project.balance}`}
                  <input
                    type="checkbox"
                    onClick={() => {
                      setVotedProjects([...votedProjects, project.id]);
                    }}
                  />
                </li>
              ))}
            </ul>
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
      </div>
    </div>
  );
};

export default FundyRound;
