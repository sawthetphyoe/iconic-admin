import React from "react";
import MainLayout from "@/app/components/MainLayout";

const ServerLoading: React.FC = () => {
  return (
    <MainLayout>
      <div
        className={"w-full flex items-center justify-center gap-5 mt-[200px]"}
      >
        <span className="loading loading-ring loading-lg text-secondary"></span>
      </div>
    </MainLayout>
  );
};

export default ServerLoading;
