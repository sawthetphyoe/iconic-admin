"use client";

import React, { useState } from "react";
import { SearchStaffRequestDto } from "@/types/staff.types";
import useGetAllStaff from "@/hooks/staff/useGetAllStaff";
import LoadingPage from "@/app/loading";
import ErrorPage from "@/app/error";
import MainLayout from "@/components/layout/MainLayout";
import CreateStaffModal from "@/components/users/staff/CreateStaffModal";
import StaffTable from "@/components/users/staff/StaffTable";
import PageTitle from "@/components/common/PageTitle";

const StaffPage: React.FC = () => {
  const [staffFilterData, setStaffFilterData] = useState<
    Partial<SearchStaffRequestDto>
  >({});

  const SearchStaffQuery = useGetAllStaff(staffFilterData);

  if (SearchStaffQuery.isPending) return <LoadingPage />;

  if (SearchStaffQuery.isError) return <ErrorPage />;

  const staffData = SearchStaffQuery.data.payload;

  return (
    <MainLayout>
      <div className={"main-container"}>
        <section className={"flex justify-between w-full items-center"}>
          <PageTitle title={"Staff"} />
          <CreateStaffModal />
        </section>
        <section
          className={
            "w-full flex flex-col overflow-x-scroll gap-8 items-center"
          }
        >
          <StaffTable dataSource={staffData.dtoList} />
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

export default StaffPage;
