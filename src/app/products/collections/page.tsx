import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProductCollectionsTable from "@/components/products/ProductCollectionsTable";
import PageTitle from "@/components/common/PageTitle";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import CreateProductCollectionModal from "@/components/products/CreateProductCollectionModal";

const CollectionPage: React.FC = () => {
  return (
    <MainLayout>
      <Breadcrumbs
        items={[
          { name: "Products", link: "/products" },
          { name: "Collections" },
        ]}
      />
      <div className={"main-container my-5 mb-16"}>
        <div className={"flex justify-between items-center w-full"}>
          <PageTitle title={"Product Collections"} />
          <CreateProductCollectionModal />
        </div>
        <ProductCollectionsTable />
      </div>
    </MainLayout>
  );
};

export default CollectionPage;
