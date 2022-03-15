import dynamic from "next/dynamic";
const NoSSRTrxSection = dynamic((): any => import("../sections/TrxSection"), {
  ssr: false,
});

//import  TrxSection  from "../sections/TrxSection";

export default function Trx() {
  return <NoSSRTrxSection />;
}
