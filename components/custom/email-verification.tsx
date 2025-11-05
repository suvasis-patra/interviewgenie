import Link from "next/link";

import { MailCheck } from "lucide-react";

import ShowMessage from "./message";

const EmailVerification = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-10 text-center">
      <MailCheck size={64} className="text-amber-400" />
      <h2 className="text-2xl font-semibold text-white">Check your inbox</h2>
      <p className="text-gray-400 text-sm max-w-[380px]">
        We&apos;ve sent a verification link to your email. Please verify your
        address to activate your account.
      </p>
      <ShowMessage
        type="info"
        message="Once verified, you can sign in to start interview practice."
      />
      <Link
        href="/login"
        className="text-amber-500 underline hover:text-amber-400 transition"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default EmailVerification;
