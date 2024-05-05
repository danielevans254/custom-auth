import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center">
      <Image src="/logo.svg" alt="Logo" width={40} height={40} />
      <h1 className="text-white text-2xl font-bold pl-2">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
    </div>
  );
}

export default Logo;