import dynamic from "next/dynamic";
const NoSSRDaiSection = dynamic((): any => import("../sections/DaiSection"), {
  ssr: false,
});

export default function Dai() {
  return <NoSSRDaiSection />;
}
