"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import useGetProductVariantDetails from "@/hooks/products/useGetProductVariantDetails";
import LoadingPage from "@/app/loading";
import ErrorPage from "@/app/error";
import PageTitle from "@/components/common/PageTitle";
import Image from "next/image";
import List from "@/components/common/List";
import useGetInventories from "@/hooks/inventory/useGetInventories";
import Link from "next/link";

const InventoryProductVariantPage: React.FC = () => {
  const searchParams = useSearchParams();
  const productVariantId = searchParams.get("id") as string;

  const GetProductVariantDetailsQuery =
    useGetProductVariantDetails(productVariantId);

  const GetInventoriesQuery = useGetInventories("variants", productVariantId);

  if (GetProductVariantDetailsQuery.isPending || GetInventoriesQuery.isPending)
    return <LoadingPage />;

  if (GetProductVariantDetailsQuery.isError || GetInventoriesQuery.isError)
    return <ErrorPage />;

  const productDetails = GetProductVariantDetailsQuery.data.payload;

  const inventories = GetInventoriesQuery.data.payload.find((item) => {
    return item.inventories.some(
      (inventory) => inventory.product.variant.id === productVariantId
    );
  })!.inventories;

  const availableBranches = inventories.map((item) => ({
    ...item.branch,
    quantity: item.quantity,
  }));

  const totalInStock = inventories.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  console.log(totalInStock);
  console.log(availableBranches);

  return (
    <MainLayout>
      <Breadcrumbs
        items={[
          { name: "Inventory", link: "/inventory" },
          { name: "Product Details" },
        ]}
      />
      <div className={"main-container my-5"}>
        <div className={"flex flex-col w-full gap-6"}>
          <PageTitle title={productDetails.product.name} />
          <div className={"flex items-center gap-16"}>
            <Image
              className={"rounded-lg shadow-normal"}
              src={`${process.env.STORAGE_URL}/${productDetails.image.imageId}`}
              alt={productDetails.product.name}
              width={400}
              height={250}
            />
            <List>
              <h3 className={"font-semibold text-base mb-2"}>Specifications</h3>
              <List.Item label={"Color"} content={productDetails.color} />
              <List.Item
                label={"Processor"}
                content={productDetails.processor}
              />
              <List.Item label={"Memory"} content={productDetails.ram} />
              <List.Item label={"Storage"} content={productDetails.storage} />
              <List.Item label={"Price"} content={"" + productDetails.price} />
            </List>
          </div>
        </div>

        <div className={"mt-6 text-sm font-medium w-full flex"}>
          <span className={"w-[200px]"}>In stock : </span>
          <span className={"ml-4"}>{totalInStock} items</span>
        </div>

        <div className={"flex text-sm items-start w-full gap-4"}>
          <span className={"font-medium w-[200px]"}>Available Branches : </span>
          <ul className={"flex flex-col gap-4"}>
            {availableBranches.map((item) => (
              <li key={item.id} className={"flex items-center gap-3"}>
                <div
                  className={"w-2 h-2 rounded-full bg-base-content/75"}
                ></div>
                <span className={"w-[100px]"}>{item.name}</span>
                <span>-</span>
                <span>{item.quantity} items</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={`/products/${productDetails.product.id}`}
          className={
            "text-sm underline self-start text-primary hover:no-underline"
          }
        >
          View Product
        </Link>
      </div>
    </MainLayout>
  );
};

export default InventoryProductVariantPage;
