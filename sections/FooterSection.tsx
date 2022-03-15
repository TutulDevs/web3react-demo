import Image from "next/image";

export const FooterSection = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container py-3 px-4 md:px-8 mx-auto flex items-center justify-between">
        <p>
          Created with ☕ by{" "}
          <a
            href="https://twitter.com/TutulDevs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:underline"
          >
            Tutul
          </a>
        </p>

        <a
          href="https://github.com/TutulDevs/web3react-demo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={"/icon-octocat.svg"}
            alt="GitHub"
            title="GitHub"
            aria-label="GitHub"
            width={32}
            height={32}
          />
        </a>
      </div>
    </footer>
  );
};
