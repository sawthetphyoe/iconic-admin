import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import StaffTable from "@/components/users/StaffTable";

const StaffPage: React.FC = () => {
  return (
    <MainLayout>
      <div className={"w-full flex flex-col gap-8 items-start px-4"}>
        <div>
          <h1 className={"font-semibold m-0 text-2xl"}>Staff</h1>
        </div>
        <StaffTable />
      </div>
    </MainLayout>
  );
};

export default StaffPage;
