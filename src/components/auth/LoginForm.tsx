"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import TextField from "@/components/common/TextField";
import useAuthLogin from "@/hooks/useAuthLogin";
import { deleteCookie, hasCookie, setCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "@/store";
import { toast } from "react-toastify";

type LoginFormField = {
  username: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const methods = useForm({
    mode: "onChange",
  });

  const [loginForm, setLoginForm] = useState<LoginFormField>({
    username: "",
    password: "",
  });

  const AuthLoginMutation = useAuthLogin();

  useEffect(() => {
    dispatch(removeUser());
    deleteCookie("accessToken");
  }, [dispatch]);

  useEffect(() => {
    if (AuthLoginMutation.isSuccess) {
      setCookie("accessToken", AuthLoginMutation.data.payload.accessToken);
      hasCookie("accessToken") && router.replace("/");
    } else if (AuthLoginMutation.isError) {
      const errorMessage =
        (typeof AuthLoginMutation.error.data?.message === "string"
          ? AuthLoginMutation.error.data?.message
          : AuthLoginMutation.error.data?.message[0]) ||
        AuthLoginMutation.error.message;
      toast.error(errorMessage);
    }
  }, [
    AuthLoginMutation.isSuccess,
    AuthLoginMutation.error,
    AuthLoginMutation.isError,
    AuthLoginMutation.data,
    router,
    dispatch,
  ]);

  const handleLogin = () => {
    AuthLoginMutation.mutate(loginForm);
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
        <button
          type={"submit"}
          className="btn btn-primary w-full"
          disabled={AuthLoginMutation.isPending}
        >
          {AuthLoginMutation.isPending ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
