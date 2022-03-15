import Link from "next/link";
import dynamic from "next/dynamic";
const CoinbaseSectionNoSSR = dynamic(
  () => import("../sections/w3rSection"),
  { ssr: false }
);

export default function w3r() {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link href={"/"}>
          <a className="logo">🏡</a>
        </Link>

        <h2>web3react</h2>
      </div>

      <CoinbaseSectionNoSSR />
    </>
  );
}
