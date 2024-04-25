import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex w-srceen h-screen bg-cover bg-center	"
      style={{ backgroundImage: "url(/bg1.jpg)" }}
    >
      <div className="flex w-screen h-screen bg-black/75">
        <div className="flex w-[40%] h-full 	">
          <Image
            src="/bg-2.gif"
            alt="bg-2"
            loading="lazy"
            height={900}
            width={600}
            style={{ width: "100%" }}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
