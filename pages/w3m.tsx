import Link from "next/link";

export default function w3m() {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link href={"/"}>
          <a className="logo">🏡</a>
        </Link>

        <h2>web3modal</h2>
      </div>

      <p>add it...</p>
    </>
  );
}
