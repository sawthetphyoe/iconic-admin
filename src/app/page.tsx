"use client";

import MainLayout from "@/components/layout/MainLayout";
import useGetReports from "@/hooks/reports/useGetReports";
import LoadingPage from "@/app/loading";
import ErrorPage from "@/app/error";
import { MdToday } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import { TbUsersGroup } from "react-icons/tb";
import MonthlyOrderChart from "@/components/orders/MonthlyOrderChart";
import dayjs from "dayjs";

export default function Home() {
  const GetReportsQuery = useGetReports();

  if (GetReportsQuery.isPending) return <LoadingPage />;

  if (GetReportsQuery.isError) return <ErrorPage />;

  const monthlyOrderList = GetReportsQuery.data.payload.monthlyOrders;

  const labels = monthlyOrderList.map((item) => dayjs(item.date).format("DD"));

  const dataList = monthlyOrderList.map((item) => item.count);

  return (
    <MainLayout>
      <div className={"main-container my-5"}>
        <div className={"w-full max-w-5xl grid grid-cols-3 gap-8"}>
          <div
            className={
              "shadow-normal rounded-lg p-6 col-span-1 flex justify-between items-center"
            }
          >
            <div className={"flex flex-col gap-2"}>
              <h3 className={"font-medium text-sm"}>Today Orders</h3>
              <p className={"font-semibold text-xl text-base-content/80"}>
                {GetReportsQuery.data.payload.todayOrders}
              </p>
            </div>
            <MdToday className={"text-primary"} size={30} />
          </div>

          <div
            className={
              "shadow-normal rounded-lg p-6 col-span-1 flex justify-between items-center"
            }
          >
            <div className={"flex flex-col gap-2"}>
              <h3 className={"font-medium text-sm"}>Total Orders</h3>
              <p className={"font-semibold text-xl text-base-content/80"}>
                {GetReportsQuery.data.payload.totalOrders}
              </p>
            </div>
            <FaList className={"text-primary"} size={30} />
          </div>

          <div
            className={
              "shadow-normal rounded-lg p-6 col-span-1 flex justify-between items-center"
            }
          >
            <div className={"flex flex-col gap-2"}>
              <h3 className={"font-medium text-sm"}>No. of Customers</h3>
              <p className={"font-semibold text-xl text-base-content/80"}>
                {GetReportsQuery.data.payload.totalCustomers}
              </p>
            </div>
            <TbUsersGroup className={"text-primary"} size={30} />
          </div>
        </div>
        <MonthlyOrderChart dataList={dataList} labels={labels} />
      </div>
    </MainLayout>
  );
}
