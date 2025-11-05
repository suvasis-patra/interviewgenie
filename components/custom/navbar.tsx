"use client";

import Link from "next/link";
import Image from "next/image";

import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { SpinnerCustom } from "./Spinner";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data, isPending } = authClient.useSession();
  const isAuthenticated = data !== null;
  const name = data?.user?.name ?? "U";
  const image = data?.user?.image ?? "https://github.com/shadcn.png";
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <nav className="w-full flex justify-between items-center py-5 px-3">
      <div>
        <div className="inline-flex w-full justify-center items-center gap-3">
          <Image
            src={"./interviewgenie.svg"}
            alt="interviewgenie"
            width={30}
            height={30}
          />
          <div className="text-2xl font-bold text-amber-400">
            Interview<span className="text-black">Genie</span>
          </div>
        </div>
      </div>
      <div>
        {isPending ? (
          <SpinnerCustom />
        ) : isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={image} />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
            <Button onClick={handleLogout}>logout</Button>
          </div>
        ) : (
          <Link href={"/login"}>
            <Button
              className="cursor-pointer bg-amber-400 hover:bg-amber-500 transition duration-150"
              size={"lg"}
            >
              login
              <span>
                <LogIn />
              </span>
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
