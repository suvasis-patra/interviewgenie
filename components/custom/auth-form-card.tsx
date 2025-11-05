import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";

type TAuthFormCard = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  isAuthPage: boolean;
};

const AuthformCard = ({
  children,
  title,
  description,
  isAuthPage,
}: TAuthFormCard) => {
  return (
    <Card className="rounded-2xl border-amber-500 border">
      <CardHeader>
        {isAuthPage && (
          <div className="flex w-full justify-center items-center gap-3">
            <Image
              src={"./interviewgenie.svg"}
              alt="interviewgenie"
              width={50}
              height={50}
            />
            <div className="text-3xl font-bold text-amber-400">
              Interview<span className="text-black">Genie</span>
            </div>
          </div>
        )}
        {title && <CardTitle className="text-center">{title}</CardTitle>}
        {description && (
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AuthformCard;
