import Navbar from "@/components/custom/navbar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1650px] mx-auto px-4 md:px-6 lg:px-8">
      <Navbar />
      {children}
    </div>
  );
};

export default RootLayout;
