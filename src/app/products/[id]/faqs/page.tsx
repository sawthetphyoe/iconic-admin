"use client";

import MainLayout from "@/components/layout/MainLayout";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import React from "react";
import useGetProductDetail from "@/hooks/products/useGetProductDetail";
import LoadingPage from "@/app/loading";
import ErrorPage from "@/app/error";
import { useParams } from "next/navigation";
import PageTitle from "@/components/common/PageTitle";

const ProductFaqsPage = () => {
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
          { name: productDetail.name, link: `/products/${productDetail.id}` },
          { name: "FAQs" },
        ]}
      />
      <div className={"main-container my-5"}>
        <PageTitle title={`Product FAQs`} />
      </div>
    </MainLayout>
  );
};

export default ProductFaqsPage;
