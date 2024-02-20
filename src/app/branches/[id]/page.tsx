"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useParams, usePathname, useRouter } from "next/navigation";
import useGetBranchDetails from "@/hooks/branches/useGetBranchDetails";
import LoadingPage from "@/app/loading";
import ErrorPage from "@/app/error";
import EditBranchModal from "@/components/branches/EditBranchModal";
import List from "@/components/common/List";
import DeleteBranchModal from "@/components/branches/DeleteBranchModal";
import BranchStaffTable from "@/components/branches/BranchStaffTable";
import BranchItemsTable from "@/components/branches/BranchItemsTable";
import AddItemModal from "@/components/branches/AddItemModal";

const BranchDetailsPage: React.FC = () => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const GetBranchDetailsQuery = useGetBranchDetails(params.id as string);

  if (GetBranchDetailsQuery.isPending) return <LoadingPage />;

  if (GetBranchDetailsQuery.isError) return <ErrorPage />;

  const {
    name,
    address,
    staffCount,
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
  } = GetBranchDetailsQuery.data.payload;

  return (
    <MainLayout>
      <Breadcrumbs
        items={[{ name: "Branches", link: "/branches" }, { name }]}
      />
      <div className={"w-full my-6 flex flex-col gap-12 items-start"}>
        <section className={"w-full flex flex-col items-start gap-6"}>
          <header className={"w-full flex gap-4 items-center"}>
            <h1 className={"text-2xl font-semibold"}>Branch Details</h1>
            <EditBranchModal
              key={updatedAt}
              branch={GetBranchDetailsQuery.data.payload}
            />
          </header>

          <List className="w-full flex flex-col gap-4 items-start">
            <List.Item label={"Branch Name"} value={name} />
            <List.Item label={"Address"} value={address} />
            {/*  <List.Item*/}
            {/*    label={"Created Date"}*/}
            {/*    value={dayjs(createdAt).format("DD/MM/YYYY")}*/}
            {/*  />*/}
            {/*  <List.Item label={"Created By"} value={createdBy} />*/}
            {/*  {updatedAt && (*/}
            {/*    <List.Item*/}
            {/*      label={"Updated Date"}*/}
            {/*      value={updatedAt ? dayjs(updatedAt).format("DD/MM/YYYY") : "-"}*/}
            {/*    />*/}
            {/*  )}*/}
            {/*  {updatedBy && (*/}
            {/*    <List.Item label={"Updated By"} value={updatedBy || "-"} />*/}
            {/*  )}*/}
          </List>
        </section>

        <section className={"w-full flex flex-col items-start gap-4"}>
          <h2 className={"font-semibold text-xl"}>Staff</h2>
          <BranchStaffTable />
        </section>

        <section className={"w-full flex flex-col items-start gap-4"}>
          <div className={"flex justify-between w-full items-center"}>
            <h2 className={"font-semibold text-xl"}>Items</h2>
            <AddItemModal branch={GetBranchDetailsQuery.data.payload} />
          </div>
          <BranchItemsTable />
        </section>

        <section className={""}>
          <DeleteBranchModal branch={GetBranchDetailsQuery.data.payload} />
        </section>
      </div>
    </MainLayout>
  );
};

export default BranchDetailsPage;
