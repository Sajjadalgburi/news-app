"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import AuthComponent from "@/src/components/AuthComponent";
import { useMutation } from "@apollo/client";
import { REGUSTER_NEW_USER } from "@/src/graphql/mutations";

// Define Zod Schema
export const formSchema = z.object({
  email: z.string().min(2).max(50).email("Invalid email address").nonempty(),
  password: z.string().min(6).max(30).nonempty(),
  username: z.string().min(2).max(50).nonempty(),
  confirmPassword: z.string().min(6).max(30).nonempty(),
});

// Infer TypeScript Type from Schema
export type FormValuesRegisterPage = z.infer<typeof formSchema>;

const RegisterPage = () => {
  // Define form
  const form = useForm<FormValuesRegisterPage>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [registerMutation, { error, loading }] = useMutation(REGUSTER_NEW_USER);

  const onSubmit = async ({
    email,
    password,
    username,
  }: FormValuesRegisterPage) => {
    try {
      const res = await registerMutation({
        variables: { email, password, name: username },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { message, status, token, success } = res.data?.register || {};

      // todo : do something with the token
      if (status === 400 && !success) {
        toast.error(message ?? "Registration failed. Please try again.");
      } else if (status === 200 && success) {
        toast.success(message ?? "Login successful! Redirecting...");
      } else {
        toast.error("Not sure what to do with this yet");
      }
    } catch (e) {
      toast.error(`An error occurred. ${e}`);
    } finally {
      form.reset();
      form.setValue("confirmPassword", "");
      form.setValue("username", "");
    }
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
