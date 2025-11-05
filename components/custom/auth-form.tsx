"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "../ui/form";
import FormField from "./FormField";
import { SpinnerCustom } from "./Spinner";
import AuthformCard from "./auth-form-card";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { ZUserLogin, ZUserRegister } from "@/lib/schemas/user";
import EmailVerification from "./email-verification";

const AuthForm = ({ action }: { action: "sign-up" | "sign-in" }) => {
  const isSignin = action === "sign-in";
  const formSchema = isSignin ? ZUserLogin : ZUserRegister;
  const [isEmailVerificationRequired, setIsEmailVerificationRequired] =
    useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues:
      action === "sign-up"
        ? { name: "", email: "", password: "" }
        : { email: "", password: "" },
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    const { name, email, password } = data;
    try {
      if (isSignin) {
        await authClient.signIn.email(
          { email, password, callbackURL: "/dashboard" },
          {
            onError: (context) => {
              console.log("ERROR :", context.error.message);
              if (context.error.status === 403) {
                toast.error("Please verify your email to continue");
                return;
              }
              if (context.error.status === 401) {
                toast.error("Invalid credentials!");
                return;
              }
              toast.error(
                context.error.message || "Something went wrong. Try again!"
              );
            },
            onSuccess: (context) => {
              console.log(context.data);
              router.push("/dashboard");
            },
          }
        );
      } else {
        if (!name) {
          return;
        }
        await authClient.signUp.email(
          {
            name,
            email,
            password,
            callbackURL: "/dashboard",
          },
          {
            onError: (context) => {
              console.log("ERROR :", context.error.message);
              toast.error("Something went wrong. Try again....");
            },
            onSuccess: () => {
              toast.success("Verify your email to continue...");
              setIsEmailVerificationRequired(true);
            },
          }
        );
      }
    } catch (error) {
      toast.error("Something went wrong. Try again....");
      console.log(error);
    }
  };
  return (
    <div className="w-full md:min-w-[500px] rounded-2xl">
      <div className="rounded-2xl">
        <AuthformCard
          title={
            !isSignin ? "Create Your InterviewGenie Account" : "Welcome Back!"
          }
          description={
            !isSignin
              ? "Join InterviewGenie and unlock personalized, AI-driven mock interviews designed to boost your confidence, sharpen your answers, and help you succeed in any interview."
              : "Sign in to continue your journey with InterviewGenie — your AI-powered coach for mastering interviews and landing your dream job."
          }
          isAuthPage
        >
          {isEmailVerificationRequired ? (
            <EmailVerification />
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                {!isSignin && (
                  <FormField
                    name="name"
                    label="Name"
                    control={form.control}
                    placeholder="Enter your name..."
                    disabled={form.formState.isSubmitting}
                  />
                )}
                <FormField
                  name="email"
                  label="Email"
                  control={form.control}
                  placeholder="Enter your email..."
                  type="email"
                  disabled={form.formState.isSubmitting}
                />
                <FormField
                  name="password"
                  label="Password"
                  control={form.control}
                  placeholder="********"
                  type="password"
                  disabled={form.formState.isSubmitting}
                />
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full bg-amber-400 hover:bg-amber-500 transition duration-150 cursor-pointer mt-4"
                >
                  {form.formState.isSubmitting ? (
                    <SpinnerCustom />
                  ) : isSignin ? (
                    "Click to login"
                  ) : (
                    "Click to register"
                  )}
                </Button>
              </form>
              <p className="text-center w-full mt-3">
                {isSignin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <Link
                  href={isSignin ? "/register" : "/login"}
                  className="text-amber-500 underline"
                >
                  {isSignin ? "register" : "login"}
                </Link>
              </p>
            </Form>
          )}
        </AuthformCard>
      </div>
    </div>
  );
};

export default AuthForm;
