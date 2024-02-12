"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import TextField from "@/components/TextField";

type LoginFormField = {
  username: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const router = useRouter();
  const methods = useForm({
    mode: "onChange",
  });

  const [loginForm, setLoginForm] = useState<LoginFormField>({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    router.push("/");
  };

  return (
    <FormProvider {...methods}>
      <form
        className={"flex flex-col gap-6 w-full max-w-md"}
        onSubmit={methods.handleSubmit(handleLogin)}
      >
        <TextField<LoginFormField>
          name={"username"}
          value={loginForm.username}
          placeholder="Enter username or email"
          onFieldChange={(value) => {
            setLoginForm((oldState) => ({ ...oldState, username: value }));
          }}
          rules={{
            required: {
              value: true,
              message: "Username is required",
            },
          }}
        />

        <TextField<LoginFormField>
          type={"password"}
          name={"password"}
          placeholder={"Enter your password"}
          value={loginForm.password}
          onFieldChange={(value) => {
            setLoginForm((oldState) => ({ ...oldState, password: value }));
          }}
          rules={{
            required: {
              value: true,
              message: "Password is required",
            },
          }}
        />
        <button type={"submit"} className="btn btn-primary w-full">
          Login
        </button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
