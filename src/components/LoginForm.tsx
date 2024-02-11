"use client";

import React from "react";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/");
  };

  return (
    <form className={"flex flex-col gap-8 w-full max-w-md"}>
      <input
        type="text"
        placeholder="Enter username or email"
        className="input input-bordered input-secondary w-full"
      />
      <input
        type="password"
        placeholder="Enter your password"
        className="input input-bordered input-secondary w-full"
      />
      <button
        className="btn btn-secondary w-full"
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
