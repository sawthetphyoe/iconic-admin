"use client";

import MainLayout from "@/components/layout/MainLayout";
import React from "react";
import { useParams } from "next/navigation";
import useGetProductDetail from "@/hooks/products/useGetProductDetail";
import LoadingPage from "@/app/loading";
import ErrorPage from "@/app/error";
import List from "@/components/common/List";
import PageTitle from "@/components/common/PageTitle";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Image from "next/image";
import mergeClassNames from "@/utils/mergeClassnames";
import Link from "next/link";

const ProductDetailPage = () => {
  const params = useParams();

  const GetProductDetailQuery = useGetProductDetail(params.id as string);

  if (GetProductDetailQuery.isPending) return <LoadingPage />;

  if (GetProductDetailQuery.isError) return <ErrorPage />;

  const productDetail = GetProductDetailQuery.data.payload;

  return (
    <MainLayout>
      <Breadcrumbs
        items={[
          { name: "Products", link: "/products" },
          { name: productDetail.name },
        ]}
      />
      <div className={"main-container my-5"}>
        <List className={"relative w-full"}>
          <Link
            href={`/products/${productDetail.id}/faqs`}
            className={"absolute top-2 right-0"}
          >
            <button className={"btn btn-primary"}>Manage FAQs</button>
          </Link>
          <div className={"w-full flex gap-4 items-center"}>
            <PageTitle title={productDetail.name} />
            {/*TODO : Edit product name and key features*/}
            {/*<button className={"btn btn-sm btn-ghost btn-circle"}>*/}
            {/*  <MdModeEdit size={20} />*/}
            {/*</button>*/}
          </div>
          <List.Item
            label={"Collection"}
            content={productDetail.productType.name}
          />
          <List.Item
            label={"Available Processors"}
            content={productDetail.processors.join(", ")}
          />
          <List.Item
            label={"Available RAMs"}
            content={productDetail.rams.join(", ")}
          />
          <List.Item
            label={"Available Storages"}
            content={productDetail.storages.join(", ")}
          />
        </List>

        <div className={"w-[90%] flex flex-col mt-4 gap-4"}>
          <h2 className={"font-semibold text-lg mb-2"}>Display Images</h2>
          <div className={"w-full grid grid-cols-3 gap-8"}>
            {productDetail.images.map((img, index) => {
              return (
                <div
                  key={img.color}
                  className={
                    "card card-compact w-full bg-base-100 shadow-normal"
                  }
                >
                  <figure>
                    <Image
                      width={400}
                      height={300}
                      className={mergeClassNames("w-full h-auto")}
                      src={
                        `${process.env.STORAGE_URL}/${img.imageId}` ||
                        "/images/placeholder-image.webp"
                      }
                      alt={""}
                    />
                  </figure>
                  <div
                    className={
                      "card-body w-full flex-row flex justify-between items-center"
                    }
                  >
                    {/*<p className={"font-medium"}>Color : {img.color}</p>*/}
                    <div className={"font-medium flex items-center gap-2"}>
                      <div
                        className={"w-4 h-4 rounded-full"}
                        style={{
                          background: img.colorCode,
                        }}
                      ></div>
                      {img.color}
                    </div>
                    <span className={"font-medium text-base-content/50"}>
                      {img.colorCode}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={"flex flex-col gap-2 w-full mt-4 max-w-5xl"}>
          <h2 className={"font-semibold text-lg mb-2"}>Key Features</h2>
          <ul className={"flex flex-col gap-3"}>
            {productDetail.keyFeatures.map((feature, index) => (
              <li key={index} className={"flex items-start gap-5"}>
                <div
                  className={"w-2 h-2 my-3 bg-base-content/75 rounded-full"}
                ></div>
                <span
                  className={"leading-8 text-sm flex-1 text-base-content/75"}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/*TODO: Delete product (soft delete)*/}
        {/*<button className={"btn text-error"}>Delete Product</button>*/}
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;
