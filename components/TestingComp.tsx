import Image from "next/image";
import Link from "next/link";

const TestingComp = () => {
  return (
    <div>
      <Link href={"https://www.google.com"}>Click This Link</Link>
      <Image
        src={
          "https://media.istockphoto.com/id/1257951336/id/foto/payung-transparan-di-bawah-hujan-dengan-latar-belakang-percikan-tetes-air-konsep-cuaca-hujan.jpg?s=612x612&w=0&k=20&c=QKkZ5X-efQhVX2GoejsE4kJiGh4tw1KaaSrRGnVRh04="
        }
        width={200}
        height={200}
        alt="rain-img"
      />
    </div>
  );
};

export default TestingComp;
