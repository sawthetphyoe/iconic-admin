import React from "react";
import MainLayout from "@/components/MainLayout";

const ServerLoading: React.FC = () => {
  return (
    <MainLayout>
      <div
        className={"w-full flex items-center justify-center gap-5 mt-[15rem]"}
      >
        <span className="loading loading-ring loading-xs text-secondary"></span>
        <span className="loading loading-ring loading-sm text-secondary"></span>
        <span className="loading loading-ring loading-md text-secondary"></span>
        <span className="loading loading-ring loading-lg text-secondary"></span>
        <span className="loading loading-ring loading-md text-secondary"></span>
        <span className="loading loading-ring loading-sm text-secondary"></span>
        <span className="loading loading-ring loading-xs text-secondary"></span>
      </div>
    </MainLayout>
  );
};

export default ServerLoading;
