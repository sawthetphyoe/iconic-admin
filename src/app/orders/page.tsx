"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import PageTitle from "@/components/common/PageTitle";
import Error from "@/components/common/Error";
import OrdersTable from "@/components/orders/OrdersTable";
import useGetAllOrders from "@/hooks/orders/useGetAllOrders";
import LoadingPage from "@/app/loading";
import { OrderDto } from "@/types/orders.types";
import { OrderStatus } from "@/lib/enums";

const OrdersPage: React.FC = () => {
  const GetAllOrdersQuery = useGetAllOrders();

  const [filterObject, setFilterObject] = useState({
    orderId: "",
    customerName: "",
    status: "all",
  });

  const [originalData, setOriginalData] = useState<OrderDto[]>([]); // [1

  const [filteredData, setFilteredData] = useState<OrderDto[]>([]);

  useEffect(() => {
    if (GetAllOrdersQuery.data) {
      setOriginalData(GetAllOrdersQuery.data.payload);
      setFilteredData(GetAllOrdersQuery.data.payload);
    }
  }, [GetAllOrdersQuery.data]);

  const handleFilterChange = (
    key: "orderId" | "customerName" | "status",
    value: string
  ) => {
    setFilterObject((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilter = () => {
    const filtered = originalData.filter((item) => {
      let isMatch = true;
      if (filterObject.orderId) {
        isMatch = isMatch && item.id.includes(filterObject.orderId);
      }
      if (filterObject.customerName) {
        isMatch = isMatch && item.customer.includes(filterObject.customerName);
      }
      if (filterObject.status !== "all") {
        isMatch = isMatch && item.status === filterObject.status;
      }
      return isMatch;
    });
    setFilteredData(filtered);
  };

  const handleCancelFilter = () => {
    setFilterObject({
      orderId: "",
      customerName: "",
      status: "all",
    });
    setFilteredData(originalData);
  };

  if (GetAllOrdersQuery.isPending) return <LoadingPage />;

  if (GetAllOrdersQuery.isError) return <Error />;

  return (
    <MainLayout>
      <div className={"main-container"}>
        <section className={"flex justify-between w-full items-center"}>
          <PageTitle title={"Orders"} />
        </section>
        <section
          className={
            "w-full flex -mt-4 flex-col overflow-x-scroll gap-8 items-center"
          }
        >
          <div className={"w-full flex pt-2 pl-2 justify-between"}>
            <div className={"w-full flex gap-4"}>
              <div className={"flex items-start gap-2 flex-col"}>
                <span className={"text-sm font-medium"}>Order ID :</span>
                <input
                  placeholder={"Search Order ID"}
                  className={
                    "input input-bordered h-[40px] input-sm text-sm w-[240px]"
                  }
                  value={filterObject.orderId}
                  onChange={(e) =>
                    handleFilterChange("orderId", e.target.value)
                  }
                />
              </div>
              <div className={"flex items-start gap-2 flex-col"}>
                <span className={"text-sm font-medium"}>Customer :</span>
                <input
                  placeholder={"Search Customer Name"}
                  className={
                    "input input-bordered h-[40px] input-sm text-sm w-[240px]"
                  }
                  value={filterObject.customerName}
                  onChange={(e) =>
                    handleFilterChange("customerName", e.target.value)
                  }
                />
              </div>
              <div className={"flex items-start gap-2 flex-col"}>
                <span className={"text-sm font-medium"}>Status :</span>
                <select
                  className={
                    "select select-bordered h-[40px] select-sm text-sm w-[160px]"
                  }
                  value={filterObject.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value={"all"}>All</option>
                  <option value={OrderStatus.PENDING}>Pending</option>
                  <option value={OrderStatus.APPROVED}>Approved</option>
                  <option value={OrderStatus.CANCELLED}>Cancelled</option>
                </select>
              </div>
            </div>
            <div className={"flex items-end"}>
              {(filterObject.orderId ||
                filterObject.customerName ||
                filterObject.status !== "all") && (
                <button
                  className={"btn btn-link btn-sm h-[40px] w-[150px]"}
                  onClick={handleCancelFilter}
                >
                  Clear Filters
                </button>
              )}
              <button
                onClick={handleApplyFilter}
                className={"btn btn-primary w-[100px] self-end btn-sm h-[40px]"}
              >
                Apply
              </button>
            </div>
          </div>
          <OrdersTable dataSource={filteredData} />
          {/*<Pagination*/}
          {/*  currentPage={staffData.currentPage}*/}
          {/*  currentSize={staffData.currentSize}*/}
          {/*  totalPage={staffData.totalPage}*/}
          {/*  totalRecord={staffData.totalRecord}*/}
          {/*  onChange={(page) => {*/}
          {/*    console.log(page);*/}
          {/*  }}*/}
          {/*/>*/}
        </section>
      </div>
    </MainLayout>
  );
};

export default OrdersPage;
