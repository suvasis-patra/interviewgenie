import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { Phone, PhoneOff } from "lucide-react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  image,
  type,
}: {
  image: string;
  type: "generation" | "interview";
}) => {
  const callStatus = CallStatus.ACTIVE;
  const isSpeaking = false;
  return (
    <section className="mt-8 px-4">
      <h3 className="text-3xl font-bold">Interview Generation</h3>
      <div className="flex w-full justify-center gap-20 mt-10 md:mt-20">
        <div className="interview-card">
          <Image
            src={"/interviewgenie.svg"}
            alt="interviewer"
            height={120}
            width={120}
            className="rounded-full relative z-20"
          />
          <h3 className="text-3xl font-semibold">AI Interviewer</h3>
          {isSpeaking && <span className="animate-speak" />}
        </div>
        <div className="interview-card">
          <Avatar className="w-30 h-30 bg-amber-600 relative z-20">
            <AvatarImage src={image} className="bg-amber-600" />
            <AvatarFallback className="bg-amber-500 font-semibold text-3xl text-white">
              Y
            </AvatarFallback>
          </Avatar>
          <h3 className="text-3xl font-semibold">You</h3>
          {isSpeaking && <span className="animate-speak" />}
        </div>
      </div>
      <div className="w-full flex justify-center mt-8 md:mt-16">
        {callStatus !== "ACTIVE" ? (
          <button
            className={cn(
              "relative flex items-center gap-3 px-6 py-3 rounded-full text-white font-semibold text-lg shadow-lg shadow-amber-300/40 transition-all duration-200 cursor-pointer",
              callStatus === "CONNECTING"
                ? "bg-amber-400 cursor-wait"
                : "bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-95"
            )}
          >
            <span
              className={cn(
                "absolute inset-0 m-auto w-16 h-16 animate-ping rounded-full bg-amber-300 opacity-40",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
              <Phone className="w-5 h-5" />
            </span>
            <span className="relative">
              {callStatus === "INACTIVE"
                ? "Start Call"
                : callStatus === "CONNECTING"
                  ? "Connecting..."
                  : "Call"}
            </span>
          </button>
        ) : (
          <button
            className="relative flex items-center gap-3 px-6 py-3 rounded-full 
             bg-linear-to-r from-red-500 to-red-600 
             text-white font-semibold text-lg shadow-lg shadow-red-300/40 
             hover:from-red-600 hover:to-red-700 
             active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
              <PhoneOff className="w-5 h-5" />
            </span>
            End Call
          </button>
        )}
      </div>
    </section>
  );
};

export default Agent;
