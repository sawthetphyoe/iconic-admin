"use client";

import React from "react";

import MainLayout from "@/components/layout/MainLayout";
import PageTitle from "@/components/common/PageTitle";
import useGetAllProducts from "@/hooks/products/useGetAllProducts";
import LoadingPage from "@/app/loading";
import ErrorPage from "@/app/error";
import useGetAllBranches from "@/hooks/branches/useGetAllBranches";
import AddItemModal from "@/components/inventory/AddItemModal";
import useGetInventories, {
  InventoryGroupBy,
} from "@/hooks/inventory/useGetInventories";
import InventoryTablesGroup from "@/components/inventory/InventoryTablesGroup";
import Loading from "@/components/common/Loading";

const InventoryPage: React.FC = () => {
  const [groupBy, setGroupBy] = React.useState<InventoryGroupBy>("branches");

  const GetAllProductsQuery = useGetAllProducts();
  const GetAllBranchesQuery = useGetAllBranches();
  const GetInventoriesQuery = useGetInventories(groupBy);

  if (GetAllProductsQuery.isPending || GetAllBranchesQuery.isPending)
    return <LoadingPage />;

  if (
    GetAllProductsQuery.isError ||
    GetAllBranchesQuery.isError ||
    GetInventoriesQuery.isError
  )
    return <ErrorPage />;

  return (
    <MainLayout>
      <div className={"main-container mb-16"}>
        <div className={"flex justify-between items-center w-full"}>
          <PageTitle title={"Inventory"} />
          <AddItemModal
            products={GetAllProductsQuery.data.payload}
            branches={GetAllBranchesQuery.data.payload}
          />
        </div>
        <div className={"w-full flex items-center justify-between"}>
          <div className={"flex items-center gap-2"}>
            <span className={"font-semibold text-base-content/80"}>
              Total Items In Stock :{" "}
            </span>
            <span className={"font-semibold text-base-content"}>
              {GetInventoriesQuery.data?.payload
                .map((item) =>
                  item.inventories.reduce(
                    (acc, inventory) => acc + inventory.quantity,
                    0
                  )
                )
                .reduce((acc, quantity) => acc + quantity, 0)}
            </span>
          </div>
          <div className={"flex gap-4 items-center"}>
            <label className={"label text-sm text-base-content/90"}>
              Group By :
            </label>
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value as InventoryGroupBy)}
              className={"select select-sm !h-10 !w-40 select-bordered"}
            >
              <option value="branches">Branch</option>
              <option value="products">Product</option>
              <option value="variants">Specification</option>
            </select>
          </div>
        </div>
        {GetInventoriesQuery.isPending ? (
          <Loading />
        ) : (
          <InventoryTablesGroup
            groupBy={groupBy}
            dataSource={GetInventoriesQuery.data.payload}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default InventoryPage;
