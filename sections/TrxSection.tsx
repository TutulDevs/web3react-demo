import { ethers } from "ethers";
import Link from "next/link";

const TrxSection = () => {
  const infuraProjectId = "1fe2bd55d0694881b4fbb8c1c5767c03";
  const infuraProjectSecret = "9c955c5c2bbf4f17bdf6758af4da9184";

  const provider = new ethers.providers.InfuraProvider("rinkeby", {
    projectId: infuraProjectId,
    projectSecret: infuraProjectSecret,
  });

  return (
    <>
      <Link href="/">
        <a className="logo">🏡</a>
      </Link>

      <section>
        <button type="button" onClick={() => console.log(provider)}>
          Connect
        </button>
      </section>
    </>
  );
};

export default TrxSection;
