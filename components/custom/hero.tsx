import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 py-12 bg-linear-to-b from-amber-50 to-white">
      <div className="max-w-xl space-y-6">
        <h2 className="text-5xl font-bold text-gray-900 leading-tight">
          Ace Your Next Interview with{" "}
          <span className="text-amber-500">AI-Powered Practice</span>
        </h2>
        <p className="text-lg text-gray-600">
          InterviewGenie helps you sharpen your skills through realistic,
          AI-driven mock interviews. Get instant feedback, improve your answers,
          and walk into your next interview with confidence.
        </p>
        <Link href={"/interview"}>
          <Button
            className="bg-amber-400 text-white text-lg font-semibold hover:bg-amber-500 transition cursor-pointer"
            size={"lg"}
          >
            Start Practicing
            <span>
              <ArrowRight />
            </span>
          </Button>
        </Link>
      </div>

      <div className="mt-10 md:mt-0">
        <Image
          src="/interviewgenie-illustration.png"
          alt="Interview practice illustration"
          height={400}
          width={400}
          className="max-sm:hidden"
        />
      </div>
    </section>
  );
};

export default HeroSection;
