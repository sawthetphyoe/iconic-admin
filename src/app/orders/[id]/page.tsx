"use client";

import React, { useEffect } from "react";
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
import useGetOrderDetails from "@/hooks/orders/useGetOrderDetails";
import dayjs from "dayjs";
import OrderItemsTable from "@/components/orders/OrderItemsTable";
import ApproveOrderModal from "@/components/orders/ApproveOrderModal";
import { OrderStatus } from "@/lib/enums";
import useCancelOrder from "@/hooks/orders/useCancelOrder";
import { toast } from "react-toastify";
import getErrorMessageFromQuery from "@/utils/getErrorMessageFromQuery";

const OrderDetailsPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const CancelOrderMutation = useCancelOrder();

  const GetOrderDetailsQuery = useGetOrderDetails(params.id as string);

  useEffect(() => {
    if (CancelOrderMutation.isSuccess && CancelOrderMutation.data) {
      CancelOrderMutation.reset();
      router.push("/orders");
    } else if (CancelOrderMutation.isError) {
      toast.error(getErrorMessageFromQuery(CancelOrderMutation.error));
      CancelOrderMutation.reset();
    }
  }, [CancelOrderMutation, router]);

  if (GetOrderDetailsQuery.isPending) return <LoadingPage />;

  if (GetOrderDetailsQuery.isError) return <ErrorPage />;

  const cancelOrder = () =>
    CancelOrderMutation.mutate(GetOrderDetailsQuery.data.payload.id);

  return (
    <MainLayout>
      <Breadcrumbs
        items={[{ name: "Orders", link: "/orders" }, { name: "Order Details" }]}
      />
      <div className={"main-container my-5"}>
        <section className={"w-full gap-2 flex flex-col items-start"}>
          <header className={"w-full flex gap-4 items-center justify-between"}>
            <PageTitle title={"Order Details"} />
            {GetOrderDetailsQuery.data.payload.status ===
              OrderStatus.PENDING && (
              <div className={"flex gap-2"}>
                <button className={"btn"} onClick={cancelOrder}>
                  Cancel
                </button>
                <ApproveOrderModal order={GetOrderDetailsQuery.data.payload} />
              </div>
            )}
          </header>

          <List className="w-full flex flex-col items-start">
            <List.Item
              label={"Order ID"}
              content={GetOrderDetailsQuery.data.payload.id}
            />
            <List.Item
              label={"Customer Name"}
              content={GetOrderDetailsQuery.data.payload.customer}
            />
            <List.Item
              label={"Order Status"}
              content={GetOrderDetailsQuery.data.payload.status}
            />
            <List.Item
              label={"Order Date"}
              content={dayjs(
                GetOrderDetailsQuery.data.payload.createdAt
              ).format("DD/MM/YYYY")}
            />
            <List.Item
              label={"No. of Items"}
              content={
                "" +
                GetOrderDetailsQuery.data.payload.orderItems.reduce(
                  (acc, item) => acc + item.quantity,
                  0
                )
              }
            />
            <List.Item
              label={"Total Amount"}
              content={"" + GetOrderDetailsQuery.data.payload.totalAmount}
            />
          </List>
        </section>

        <section className={"w-full flex flex-col gap-6"}>
          <h2 className={"font-semibold text-xl"}>Items</h2>
          <OrderItemsTable
            dataSource={GetOrderDetailsQuery.data.payload.orderItems}
          />
        </section>
      </div>
    </MainLayout>
  );
};

export default OrderDetailsPage;
