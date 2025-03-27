import React from "react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "./ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/app/(auth-group)/login/page";
import Link from "next/link";

interface Props {
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFormSubmit: (values: any) => void;
  form: UseFormReturn<FormValues>;
  isLoggingIn: boolean;
  error: Error | null | unknown;
}

const AuthComponent = ({
  form,
  onFormSubmit,
  isLoggingIn = true,
  loading,
  error,
}: Props) => {
  const buttonText = loading
    ? isLoggingIn
      ? "Logging In"
      : "Registering"
    : isLoggingIn
    ? "Login"
    : "Register";

  return (
    <section className="flex flex-col w-80 p-4 rounded-xl space-y-4 md:mt-[10rem] shadow-xl justify-center bg-accent max-w-7xl mx-auto">
      <h1 className="md:text-4xl text-lg font-semibold capitalize text-center">
        {isLoggingIn ? "Login" : "Register"}
      </h1>
      <span className="text-center text-sm text-gray-500">
        {isLoggingIn
          ? "Welcome back! Login to your account to continue"
          : "Register a new account"}
      </span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
          {isLoggingIn === false ? (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="someone" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="someone@gmail.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center w-full">
            <Button className="w-full cursor-pointer" type="submit">
              {buttonText}
            </Button>
          </div>
          <div className=" divider" />
          <div className="text-center text-sm text-gray-500">
            {isLoggingIn ? (
              <>
                <span>Don&apos;t have an account?</span>
                <Link href="/register" className="underline ml-1">
                  Register Here
                </Link>
              </>
            ) : (
              <>
                <span>Already have an account?</span>
                <Link href="/login" className="underline ml-1">
                  Login Here
                </Link>
              </>
            )}
          </div>
        </form>
      </Form>
      <span>
        {error ? (
          <p className="text-red-500 text-center">An error occurred</p>
        ) : null}
      </span>
    </section>
  );
};

export default AuthComponent;
