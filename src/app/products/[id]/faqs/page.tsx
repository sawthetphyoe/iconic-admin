"use client";

import MainLayout from "@/components/layout/MainLayout";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import React from "react";
import useGetProductDetail from "@/hooks/products/useGetProductDetail";
import LoadingPage from "@/app/loading";
import ErrorPage from "@/app/error";
import { useParams } from "next/navigation";
import PageTitle from "@/components/common/PageTitle";
import useGetProductFaqs from "@/hooks/products/useGetProductFaqs";
import CreateFAQModal from "@/components/products/CreateFAQModal";

const ProductFaqsPage = () => {
  const params = useParams();

  const GetProductDetailQuery = useGetProductDetail(params.id as string);

  const GetProductFaqsQuery = useGetProductFaqs(params.id as string);

  if (GetProductDetailQuery.isPending || GetProductFaqsQuery.isPending)
    return <LoadingPage />;

  if (GetProductDetailQuery.isError || GetProductFaqsQuery.isError)
    return <ErrorPage />;

  const productDetail = GetProductDetailQuery.data.payload;

  const faqList = GetProductFaqsQuery.data.payload;
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
        <div className={"flex justify-between items-center w-full"}>
          <PageTitle title={`Product FAQs — ${productDetail.name}`} />
          <CreateFAQModal productId={productDetail.id} />
        </div>
        <div className={"w-full flex flex-col gap-2"}>
          {faqList.length === 0 && (
            <div
              className={
                "w-full text-lg font-semibold h-[300px] flex justify-center items-center"
              }
            >
              No FAQs have been created yet!
            </div>
          )}
          {faqList.map((faq) => {
            return (
              <div
                key={faq.id}
                className="collapse text-sm bg-base-200/30 rounded-lg collapse-arrow"
              >
                <input type="radio" id={faq.id} name={productDetail.id} />
                <div className="collapse-title font-medium">{faq.question}</div>
                <div className="collapse-content">
                  <p className={"leading-7"}>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductFaqsPage;
