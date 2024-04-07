"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import PageTitle from "@/components/common/PageTitle";
import CustomersTable from "@/components/users/customers/CustomersTable";
import useGetAllCustomers from "@/hooks/customers/useGetAllCustomers";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import LoadingPage from "@/app/loading";

const CustomersPage: React.FC = () => {
  const GetAllCustomersQuery = useGetAllCustomers();

  if (GetAllCustomersQuery.isPending) return <LoadingPage />;

  if (GetAllCustomersQuery.isError) return <Error />;

  const dataSource = GetAllCustomersQuery.data.payload;
  return (
    <MainLayout>
      <div className={"main-container"}>
        <section className={"flex justify-between w-full items-center"}>
          <PageTitle title={"Customers"} />
        </section>
        <section
          className={
            "w-full flex flex-col overflow-x-scroll gap-8 items-center"
          }
        >
          <CustomersTable dataSource={dataSource} />
          {/*<Pagination*/}
          {/*  currentPage={staffData.currentPage}*/}
          {/*  currentSize={staffData.currentSize}*/}
          {/*  totalPage={staffData.totalPage}*/}
          {/*  totalRecord={staffData.totalRecord}*/}
          {/*  onChange={(page) => {*/}
          {/*    console.log(page);*/}
          {/*  }}*/}
          {/*/>*/}
        </section>
      </div>
    </MainLayout>
  );
};

export default CustomersPage;
