"use client";

import MainLayout from "@/components/layout/MainLayout";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import React from "react";
import useGetStaffDetails from "@/hooks/staff/useGetStaffDetails";
import { useParams } from "next/navigation";
import LoadingPage from "@/app/loading";
import ErrorPage from "@/app/error";
import List from "@/components/common/List";
import dayjs from "dayjs";
import DeleteStaffModal from "@/components/users/staff/DeleteStaffModal";
import { StaffRole } from "@/lib/enums";
import getDisplayRole from "@/utils/getDisplayRole";
import EditStaffModal from "@/components/users/staff/EditStaffModal";
import PageTitle from "@/components/common/PageTitle";

const StaffDetailPage = () => {
  const params = useParams();
  const GetStaffDetailsQuery = useGetStaffDetails(params.id as string);

  if (GetStaffDetailsQuery.isPending) return <LoadingPage />;

  if (GetStaffDetailsQuery.isError) return <ErrorPage />;

  const staff = GetStaffDetailsQuery.data.payload;

  return (
    <MainLayout>
      <Breadcrumbs
        items={[
          { name: "Staff", link: "/users/staff" },
          { name: staff.fullName },
        ]}
      />
      <div className={"main-container my-5"}>
        <section className={"w-full flex flex-col items-start"}>
          <header className={"w-full flex gap-4 items-center"}>
            <PageTitle title={"Staff Details"} />
            <EditStaffModal key={staff.updatedAt} staff={staff} />
          </header>
          <List className="w-full flex flex-col items-start">
            <List.Item label={"Full Name"} content={staff.fullName} />
            <List.Item label={"Username"} content={staff.username} />
            <List.Item label={"Email"} content={staff.email} />
            <List.Item label={"Role"} content={getDisplayRole(staff.role)} />
            <List.Item label={"Branch"} content={staff.branch?.name || "-"} />
            <List.Item
              label={"Created Date"}
              content={dayjs(staff.createdAt).format("DD/MM/YYYY")}
            />
            <List.Item label={"Created By"} content={staff.createdBy} />
            {staff.updatedAt && (
              <List.Item
                label={"Updated Date"}
                content={
                  staff.updatedAt
                    ? dayjs(staff.updatedAt).format("DD/MM/YYYY")
                    : "-"
                }
              />
            )}
            {staff.updatedBy && (
              <List.Item
                label={"Updated By"}
                content={staff.updatedBy || "-"}
              />
            )}
          </List>
        </section>
        {staff.role !== StaffRole.SuperAdmin && (
          <section className={""}>
            <DeleteStaffModal staff={staff} />
          </section>
        )}
      </div>
    </MainLayout>
  );
};

export default StaffDetailPage;
