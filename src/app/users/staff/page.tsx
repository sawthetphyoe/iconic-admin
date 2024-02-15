"use client";

import React, { useState } from "react";
import { SearchStaffRequestDto } from "@/types/staff.types";
import useSearchStaff from "@/hooks/staff/useSearchStaff";
import LoadingPage from "@/app/loading";
import ErrorPage from "@/app/error";
import MainLayout from "@/components/layout/MainLayout";
import CreateStaffModal from "@/components/users/staff/CreateStaffModal";
import StaffTable from "@/components/users/staff/StaffTable";

const StaffPage: React.FC = () => {
  const [staffFilterData, setStaffFilterData] = useState<
    Partial<SearchStaffRequestDto>
  >({});

  const SearchStaffQuery = useSearchStaff(staffFilterData);

  if (SearchStaffQuery.isPending) return <LoadingPage />;

  if (SearchStaffQuery.isError) return <ErrorPage />;

  const staffData = SearchStaffQuery.data.payload;

  return (
    <MainLayout>
      <div className={"w-full flex flex-col gap-8 items-start px-4"}>
        <section className={"flex justify-between w-full items-center"}>
          <h1 className={"font-semibold m-0 text-2xl"}>Staff</h1>
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
