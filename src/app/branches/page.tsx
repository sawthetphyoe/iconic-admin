import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import BranchTable from "@/components/branches/BranchTable";
import CreateBranchModal from "@/components/branches/CreateBranchModal";

const BranchesPage: React.FC = () => {
  return (
    <MainLayout>
      <div className={"w-full flex flex-col gap-8 items-start px-4"}>
        <div className={"flex justify-between items-center w-full"}>
          <h1 className={"font-semibold m-0 text-2xl"}>Branches</h1>
          <CreateBranchModal />
        </div>
        <BranchTable />
      </div>
    </MainLayout>
  );
};

export default BranchesPage;
