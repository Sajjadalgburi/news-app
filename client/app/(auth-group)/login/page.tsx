"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import AuthComponent from "@/src/components/AuthComponent";

// Define Zod Schema
export const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(100),
  username: z.string().min(2).max(50),
});

// Infer TypeScript Type from Schema
export type FormValues = z.infer<typeof formSchema>;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | unknown>(null);

  // Define form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      toast.success("You have successfully logged in!");
      // Handle API call or authentication logic
    } catch (e) {
      setError(e);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      setError(null);
      setLoading(false);
      form.reset();
    }
  };

  return (
    <AuthComponent
      isLoggingIn={true}
      loading={loading}
      error={error}
      onFormSubmit={onSubmit}
      form={form}
    />
  );
};

export default LoginPage;
