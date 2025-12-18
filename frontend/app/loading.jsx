import ghost from "@/images/ghost-icon.svg";
import Image from "next/image";
export default function Loading() {
  return (
    <>
      <div id="loading">
        <Image src={ghost} alt="loading..." width={70} id="loading-pic" />
      </div>
    </>
  );
}
