import MainLayout from "@/components/layout/MainLayout";
import React from "react";
import PageTitle from "@/components/common/PageTitle";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import CreateProductForm from "@/components/products/CreateProductForm";

const NewProductPage: React.FC = () => {
  return (
    <MainLayout>
      <Breadcrumbs
        items={[{ name: "Products", link: "/products" }, { name: "New" }]}
      />
      <div className={"main-container my-5"}>
        <PageTitle title={"Add New Product"} />
        <CreateProductForm />
      </div>
    </MainLayout>
  );
};

export default NewProductPage;
