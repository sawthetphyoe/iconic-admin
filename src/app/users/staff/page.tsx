import React from "react";
import MainLayout from "@/components/MainLayout";
import StaffTable from "@/components/StaffTable";

const StaffPage: React.FC = () => {
  return (
    <MainLayout>
      <StaffTable />
    </MainLayout>
  );
};

export default StaffPage;
