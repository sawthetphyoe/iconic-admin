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
      <div className={"w-full my-6 flex flex-col gap-12 items-start"}>
        <section className={"w-full flex flex-col items-start gap-6"}>
          <header className={"w-full flex gap-4 items-center"}>
            <h1 className={"text-2xl font-semibold"}>Staff Details</h1>
            <EditStaffModal key={staff.updatedAt} staff={staff} />
          </header>
          <List className="w-full flex flex-col gap-4 items-start">
            <List.Item label={"Full Name"} value={staff.fullName} />
            <List.Item label={"Username"} value={staff.username} />
            <List.Item label={"Email"} value={staff.email} />
            <List.Item label={"Role"} value={getDisplayRole(staff.role)} />
            <List.Item label={"Branch"} value={staff.branch?.name || "-"} />
            <List.Item
              label={"Created Date"}
              value={dayjs(staff.createdAt).format("DD/MM/YYYY")}
            />
            <List.Item label={"Created By"} value={staff.createdBy} />
            {staff.updatedAt && (
              <List.Item
                label={"Updated Date"}
                value={
                  staff.updatedAt
                    ? dayjs(staff.updatedAt).format("DD/MM/YYYY")
                    : "-"
                }
              />
            )}
            {staff.updatedBy && (
              <List.Item label={"Updated By"} value={staff.updatedBy || "-"} />
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
