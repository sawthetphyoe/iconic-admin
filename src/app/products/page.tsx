import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProductsTable from "@/components/products/ProductsTable";
import { HiPlus } from "react-icons/hi";
import Link from "next/link";
import PageTitle from "@/components/common/PageTitle";

const ProductsPage: React.FC = () => {
  return (
    <MainLayout>
      <div className={"main-container"}>
        <header className={"flex justify-between items-center w-full"}>
          <PageTitle title={"Products"} />
          <div className={"flex gap-2 items-center"}>
            <Link href={"products/collections"}>
              <button className={"btn btn-link no-underline hover:underline"}>
                Manage Collections
              </button>
            </Link>

            <Link href={"products/new"}>
              <button className={"btn btn-primary"}>
                <HiPlus size={20} /> New
              </button>
            </Link>
          </div>
        </header>
        <ProductsTable />
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
