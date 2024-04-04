import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import PageTitle from "@/components/common/PageTitle";
import CreatePaymentTypeModal from "@/components/payment-types/CreatePaymentTypeModal";
import MemberTypesTable from "@/components/member-types/MemberTypesTable";
import CreateMemberTypeModal from "@/components/member-types/CreateMemberTypeModal";

const PaymentTypesPage: React.FC = () => {
  return (
    <MainLayout>
      <div className={"main-container"}>
        <div className={"flex justify-between items-center w-full"}>
          <PageTitle title={"Member Types"} />
          <CreateMemberTypeModal />
        </div>
        <MemberTypesTable />
      </div>
    </MainLayout>
  );
};

export default PaymentTypesPage;
