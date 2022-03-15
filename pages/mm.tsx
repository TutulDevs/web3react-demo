import React from "react";
import Link from "next/link";
import { MetaMaskSection } from "../sections/MetaMaskSection";

export default function MM() {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link href={"/"}>
          <a className="logo">🏡</a>
        </Link>

        <h2>MetaMask</h2>
      </div>
      <MetaMaskSection />
    </>
  );
}
