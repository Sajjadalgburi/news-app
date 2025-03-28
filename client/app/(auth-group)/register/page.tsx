"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import AuthComponent from "@/components/AuthComponent";
import { useMutation } from "@apollo/client";
import { REGISTER_NEW_USER } from "@/graphql/mutations";
import { useRouter } from "next/navigation";

// Define Zod Schema
export const formSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
    username: z
      .string()
      .min(2, "Username is required")
      .nonempty("Username is required"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Infer TypeScript Type from Schema
export type FormValuesRegisterPage = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const form = useForm<FormValuesRegisterPage>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  // Define the mutation
  const [registerMutation, { loading, error }] = useMutation(
    REGISTER_NEW_USER,
    {
      onCompleted: (data) => {
        const { message, status, success } = data?.register || {};

        if (status === 400 && !success) {
          toast.error(message ?? "Registration failed. Please try again.");
          return;
        }

        if (status === 200 && success) {
          toast.success(message ?? "Registration successful! Redirecting...");
          router.push("/");
        } else {
          toast.error("Unexpected response from server.");
        }
      },
      onError: (error) => {
        toast.error(`Registration failed: ${error.message}`);
      },
    },
  );

  // Handle form submission
  const onSubmit = (data: FormValuesRegisterPage) => {
    const { email, password, username } = data;
    registerMutation({
      variables: { email, password, name: username },
    }).finally(() => form.reset());
  };

  return (
    <AuthComponent
      isLoggingIn={false}
      loading={loading}
      error={error}
      onSubmit={onSubmit}
      form={form}
    />
  );
};

export default RegisterPage;
