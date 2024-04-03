import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hardhat } from "viem/chains";
import { useAccount } from "wagmi";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
// import { SwitchTheme } from "~~/components/SwitchTheme";
// import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";
import { Faucet } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;
  const { address: connectedAddress } = useAccount();
  const pathname = usePathname();

  const { writeAsync: writeAsyncUSDC, isLoading: isLoadingUSDC } = useScaffoldContractWrite({
    contractName: "WhyDidHeLeave",
    functionName: "mint",
    args: [connectedAddress, BigInt(100000)],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="min-h-0 h-[20rem] py-5 px-1 mb-11 lg:mb-0 bg-white">
      {pathname !== "/" && (
        <div>
          <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
            <div className="flex flex-col md:flex-row gap-2 pointer-events-auto">
              <button
                className="btn btn-info btn-sm font-normal"
                onClick={() => writeAsyncUSDC()}
                disabled={isLoadingUSDC}
              >
                {isLoadingUSDC ? <span className="loading loading-spinner loading-sm"></span> : <>WhyDidHeLeave $</>}
              </button>
              {nativeCurrencyPrice > 0 && (
                <div>
                  <div className="btn btn-info btn-sm font-normal gap-1 cursor-auto">
                    <CurrencyDollarIcon className="h-4 w-4" />
                    <span>{nativeCurrencyPrice}</span>
                  </div>
                </div>
              )}
              {isLocalNetwork && (
                <>
                  <Faucet />
                  <Link href="/blockexplorer" passHref className="btn btn-info btn-sm font-normal gap-1">
                    <MagnifyingGlassIcon className="h-4 w-4" />
                    <span>Block Explorer</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-end items-center gap-8 h-full">
        <h3 className="w-full text-center">Build with the help of Gnomes, and ...</h3>
        <div className="flex justify-center items-center gap-8 align-top">
          <Image src="/secret.svg" alt="Secret Logo" width={170} height={170} />
          <Image src="/base.svg" alt="Secret Logo" width={170} height={170} />
          <Image src="/sablier.svg" alt="Secret Logo" width={170} height={170} />
          <Image src="/buidlguidl.svg" alt="Secret Logo" width={200} height={200} />
        </div>
        <div className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <div className="flex justify-center items-center gap-2">
              <p className="m-0 text-center">
                Gnomish – built with <HeartIcon className="inline-block h-4 w-4" /> at
              </p>
              <a
                className="flex justify-center items-center gap-1"
                href="https://ethbucharest.xyz/"
                target="_blank"
                rel="noreferrer"
              >
                ETHBucharest 2024
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
