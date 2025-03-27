"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import AuthComponent from "@/src/components/AuthComponent";
import { useMutation } from "@apollo/client";
import { LOG_USER_IN } from "@/src/graphql/mutations";

// Define Zod Schema
export const formSchema = z.object({
  email: z
    .string()
    .min(2)
    .max(50)
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z.string().min(6).max(30).nonempty("Password is required"),
});

// Infer TypeScript Type from Schema
export type FormValues = z.infer<typeof formSchema>;

const LoginPage = () => {
  // Define form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Define the mutation
  const [loginMutation, { error, loading }] = useMutation(LOG_USER_IN);
  // Handle form submission
  async function onSubmit({ email, password }: z.infer<typeof formSchema>) {
    try {
      const res = await loginMutation({
        variables: { email, password },
      });

      // todo : do something with the token
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { message, status, token } = res.data?.login || {};
      if (status === 400) {
        toast.error(message ?? "Login failed. Please try again.");
      } else if (status === 200) {
        toast.success("Login successful! Redirecting...");
      } else {
        toast.error("Not sure what to do with this yet");
      }
    } catch (e) {
      toast.error(`An error occurred. ${e}`);
    } finally {
      form.reset();
    }
  }

  return (
    <AuthComponent
      isLoggingIn={true}
      loading={loading}
      error={error}
      onSubmit={onSubmit}
      form={form}
    />
  );
};

export default LoginPage;
