"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import Link from "next/link";
import { FormValuesRegisterPage } from "@/app/(auth-group)/register/page";

interface Props {
  loading: boolean;
  onSubmit: (values: FormValuesRegisterPage) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  isLoggingIn: boolean;
  error: Error | null | unknown;
}

const AuthComponent = ({
  form,
  onSubmit,
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

  const watchConfirmPassword = form.watch("confirmPassword");
  const watchPassword = form.watch("password");
  const passwordMatch: boolean = watchConfirmPassword === watchPassword;

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {watchPassword.length > 5 && !isLoggingIn && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <span className="text-left text-sm line-clamp-1">
                    {watchPassword.length > 5 &&
                    watchConfirmPassword?.length > 1 ? (
                      !passwordMatch ? (
                        <p className="text-red-500">Passwords do not match</p>
                      ) : (
                        <p className="text-green-500">
                          Passwords match! You can proceed
                        </p>
                      )
                    ) : null}
                  </span>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="flex justify-center w-full">
            <Button
              disabled={
                loading || isLoggingIn
                  ? watchPassword.length < 6
                  : !passwordMatch
              }
              className="w-full cursor-pointer"
              type="submit">
              {buttonText}
            </Button>
          </div>
          <div className="border-b-1" />
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
