import React from "react";
import MainLayout from "@/components/layout/MainLayout";

const LoadingPage: React.FC = () => {
  return (
    <MainLayout>
      <div
        className={"w-full flex items-center justify-center gap-5 mt-[15rem]"}
      >
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    </MainLayout>
  );
};

export default LoadingPage;
