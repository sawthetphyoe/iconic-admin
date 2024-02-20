import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import BranchTable from "@/components/branches/BranchTable";
import CreateBranchModal from "@/components/branches/CreateBranchModal";
import PageTitle from "@/components/common/PageTitle";

const BranchesPage: React.FC = () => {
  return (
    <MainLayout>
      <div className={"main-container"}>
        <div className={"flex justify-between items-center w-full"}>
          <PageTitle title={"Branches"} />
          <CreateBranchModal />
        </div>
        <BranchTable />
      </div>
    </MainLayout>
  );
};

export default BranchesPage;
