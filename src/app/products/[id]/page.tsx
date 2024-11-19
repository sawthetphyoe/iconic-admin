"use client";

import ErrorPage from "@/app/error";
import LoadingPage from "@/app/loading";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import List from "@/components/common/List";
import PageTitle from "@/components/common/PageTitle";
import MainLayout from "@/components/layout/MainLayout";
import EditProductImageModal from "@/components/products/EditProductImageModal";
import useGetProductDetail from "@/hooks/products/useGetProductDetail";
import useUpdateProduct from "@/hooks/products/useUpdateProduct";
import {
  EditProductImageFormFields,
  UpdateProductRequestDto,
} from "@/types/products.types";
import getErrorMessageFromQuery from "@/utils/getErrorMessageFromQuery";
import mergeClassNames from "@/utils/mergeClassnames";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const params = useParams();

  const UpdateProductMutation = useUpdateProduct();

  useEffect(() => {
    let loadingToast;
    if (UpdateProductMutation.isPending) {
      loadingToast = toast.info("Updating product...", { autoClose: 9000 });
    } else if (UpdateProductMutation.isSuccess && UpdateProductMutation.data) {
      UpdateProductMutation.reset();
      toast.dismiss(loadingToast);
      toast.success("Product updated successfully");
    } else if (UpdateProductMutation.isError) {
      toast.error(getErrorMessageFromQuery(UpdateProductMutation.error));
      UpdateProductMutation.reset();
    }
  }, [
    UpdateProductMutation.isPending,
    UpdateProductMutation.isSuccess,
    UpdateProductMutation.isError,
  ]);

  const GetProductDetailQuery = useGetProductDetail(params.id as string);

  if (GetProductDetailQuery.isPending) return <LoadingPage />;

  if (GetProductDetailQuery.isError) return <ErrorPage />;

  const productDetail = GetProductDetailQuery.data.payload;

  const onSaveHandler = (value: EditProductImageFormFields) => {
    const payload: UpdateProductRequestDto & { id: string } = {
      name: productDetail.name,
      productType: productDetail.productType.id,
      processors: productDetail.processors.join(", "),
      storages: productDetail.storages.join(", "),
      rams: productDetail.rams.join(", "),
      keyFeatures: JSON.stringify(productDetail.keyFeatures),
      ...[value]
        .map(({ color, colorCode, file }) => ({
          [`${color}#${colorCode}`]: file,
        }))
        .reduce((result, colorFile) => {
          return { ...result, ...colorFile };
        }, {}),
      id: productDetail.id,
    };
    UpdateProductMutation.mutate(payload);
  };

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
                  <div className="grid place-items-center h-[400px] group">
                    <figure className="group-hover:hidden">
                      <Image
                        width={400}
                        height={300}
                        className={mergeClassNames("w-full h-auto")}
                        src={
                          `${process.env.STORAGE_URL}/${img.imageId}/view?project=${process.env.APPWRITE_PROJECT_ID}` ||
                          "/images/placeholder-image.webp"
                        }
                        alt={""}
                      />
                    </figure>
                    <EditProductImageModal
                      onSave={onSaveHandler}
                      initialValues={{
                        color: img.color,
                        colorCode: img.colorCode.split("#")[1],
                        imageId: img.imageId,
                      }}
                    />
                  </div>
                  <div
                    className={
                      "card-body w-full flex-row flex justify-between items-center"
                    }
                  >
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
