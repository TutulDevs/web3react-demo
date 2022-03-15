import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { accountDataType } from "../src/types";

interface HeaderPropTypes {
  accountData: null | accountDataType;
}

export const HeaderSection = ({ accountData }: HeaderPropTypes) => {
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const { active } = useWeb3React();

  return (
    <header>
      <div className="container h-[64px] px-4 md:px-8 mx-auto flex items-center justify-between">
        {/* logo */}
        <Link href={"/"}>
          <a>
            <Image
              src={"/icon-wallet.png"}
              alt="Wallet Icon"
              width={36}
              height={36}
            />
          </a>
        </Link>

        {/* dropdown */}

        <div className="relative">
          <button
            type="button"
            className="px-4 py-1 rounded-full ring-2 ring-sky-300 focus-within:ring-sky-500 focus-within:bg-sky-100 ease-in duration-300 disabled:ring-slate-300 disabled:cursor-not-allowed"
            disabled={!active}
            onClick={() => setShowAccountInfo(true)}
          >
            {active ? "activated" : "0_0"}
          </button>

          {showAccountInfo && (
            <OutsideClickHandler
              onOutsideClick={() => setShowAccountInfo(false)}
            >
              <div className="absolute right-0 top-10 z-10 w-[300px] p-4 rounded-lg bg-white border shadow-md shadow-slate-300/50">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Tempore reprehenderit eos fugiat repudiandae consequatur
                assumenda ad consectetur suscipit nobis necessitatibus.
              </div>
            </OutsideClickHandler>
          )}
        </div>
      </div>
    </header>
  );
};
