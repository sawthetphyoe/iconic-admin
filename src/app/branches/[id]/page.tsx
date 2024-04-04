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
import PageTitle from "@/components/common/PageTitle";
import useGetAllProducts from "@/hooks/products/useGetAllProducts";

const BranchDetailsPage: React.FC = () => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const GetBranchDetailsQuery = useGetBranchDetails(params.id as string);

  const GetAllProductsQuery = useGetAllProducts();

  if (GetAllProductsQuery.isPending || GetBranchDetailsQuery.isPending)
    return <LoadingPage />;

  if (GetAllProductsQuery.isError || GetBranchDetailsQuery.isError)
    return <ErrorPage />;

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
      <div className={"main-container my-5"}>
        <section className={"w-full gap-2 flex flex-col items-start"}>
          <header className={"w-full flex gap-4 items-center"}>
            <PageTitle title={"Branch Details"} />
            <EditBranchModal
              key={updatedAt}
              branch={GetBranchDetailsQuery.data.payload}
            />
          </header>

          <List className="w-full flex flex-col items-start">
            <List.Item label={"Branch Name"} content={name} />
            <List.Item label={"Address"} content={address} />
          </List>
        </section>

        <section className={"w-full flex flex-col items-start gap-4"}>
          <h2 className={"font-semibold text-xl"}>Staff</h2>
          <BranchStaffTable />
        </section>

        <section className={"w-full flex flex-col items-start gap-4"}>
          <div className={"flex justify-between w-full items-center"}>
            <h2 className={"font-semibold text-xl"}>Products</h2>
            <AddItemModal
              products={GetAllProductsQuery.data.payload}
              branch={GetBranchDetailsQuery.data.payload}
            />
          </div>
          <BranchItemsTable />
        </section>

        <section className={"mt-6"}>
          <DeleteBranchModal branch={GetBranchDetailsQuery.data.payload} />
        </section>
      </div>
    </MainLayout>
  );
};

export default BranchDetailsPage;
