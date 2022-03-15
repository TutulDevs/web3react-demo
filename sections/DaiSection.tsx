import { ethers } from "ethers";
import React from "react";

const DaiSection = () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);

  const daiAddress = "0x4B27946689E70b2d4024FCA65D79BF31447e94C8";

  const daiAbi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount)",
    "event Transfer(address indexed from, address indexed to, uint amount)",
  ];

  // The Contract object
  const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

  const daiToken = async () => {
    const name = await daiContract.name();
    console.log(name);
  };

  console.log(daiContract);

  return <h1 onClick={daiToken}>DaiSection</h1>;
};

export default DaiSection;
