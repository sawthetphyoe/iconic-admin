import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import PageTitle from "@/components/common/PageTitle";
import PaymentTypesTable from "@/components/payment-types/PaymentTypesTable";
import CreatePaymentTypeModal from "@/components/payment-types/CreatePaymentTypeModal";

const PaymentTypesPage: React.FC = () => {
  return (
    <MainLayout>
      <div className={"main-container"}>
        <div className={"flex justify-between items-center w-full"}>
          <PageTitle title={"Payment Types"} />
          <CreatePaymentTypeModal />
        </div>
        <PaymentTypesTable />
      </div>
    </MainLayout>
  );
};

export default PaymentTypesPage;
