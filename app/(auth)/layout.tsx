import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1450px] mx-auto px-4 md:px-6 lg:px-8 flex items-center gap-5 h-screen justify-between">
      <div>
        <Image
          src={"./interviewgenie-authpage.svg"}
          alt="interviewgenie"
          height={500}
          width={400}
        />
      </div>
      <div>{children}</div>
    </div>
  );
}
