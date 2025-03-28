"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import AuthComponent from "@/components/AuthComponent";
import { useMutation } from "@apollo/client";
import { LOG_USER_IN } from "@/graphql/mutations";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import { User } from "@/__generated__/graphql";

// Define Zod Schema
export const formSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

// Infer TypeScript Type from Schema
export type FormValues = z.infer<typeof formSchema>;

const LoginPage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();
  const { setUser } = useUser();

  // Define the mutation
  const [loginMutation, { loading, error }] = useMutation(LOG_USER_IN, {
    onCompleted: (data) => {
      const { user, status, message } = data?.login || {};

      if (status === 400) {
        toast.error(message ?? "Login failed. Please try again.");
        return;
      }

      if (status === 200) {
        setUser(user as User);
        toast.success("Login successful! Redirecting...");
        router.push("/");
      } else {
        toast.error("Unexpected response from server.");
      }
    },
    onError: (error) => {
      toast.error(`Login failed: ${error.message}`);
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    loginMutation({ variables: data }).finally(() => form.reset());
  };

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
