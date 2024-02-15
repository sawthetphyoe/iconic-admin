import React from "react";

const LoginLoading: React.FC = () => {
  return (
    <div
      className={"w-full min-h-screen flex items-center justify-center gap-5"}
    >
      <span className="loading loading-ring loading-xs text-primary"></span>
      <span className="loading loading-ring loading-sm text-primary"></span>
      <span className="loading loading-ring loading-md text-primary"></span>
      <span className="loading loading-ring loading-lg text-primary"></span>
      <span className="loading loading-ring loading-md text-primary"></span>
      <span className="loading loading-ring loading-sm text-primary"></span>
      <span className="loading loading-ring loading-xs text-primary"></span>
    </div>
  );
};

export default LoginLoading;
