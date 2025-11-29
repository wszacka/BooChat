import Image from "next/image";
import sendIcon from "@/images/send.svg";

export default function CurrentChat() {
  return (
    <>
      <div>
        <form>
          <input type="text"></input>
          <button>
            <Image src={sendIcon} alt="sendIc" width={20} />
          </button>
        </form>
      </div>
    </>
  );
}
