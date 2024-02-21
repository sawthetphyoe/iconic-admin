"use client";

import React, { useEffect, useState } from "react";
import Table, { TableColumn } from "@/components/common/Table";
import useGetAllBranchStaff from "@/hooks/branches/useGetAllBranchStaff";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { StaffDto } from "@/types/staff.types";

const BranchStaffTable: React.FC = () => {
  const params = useParams();

  const [dataSource, setDataSource] = useState<Omit<StaffDto, "branch">[]>([]);

  const GetAllBranchStaffQuery = useGetAllBranchStaff({
    id: params.id as string,
  });

  useEffect(() => {
    if (GetAllBranchStaffQuery.isSuccess) {
      setDataSource(GetAllBranchStaffQuery.data.payload.dtoList);
    } else if (GetAllBranchStaffQuery.isError) {
      toast.error("Failed to fetch product staff");
    }
  }, [GetAllBranchStaffQuery]);

  const columns: TableColumn<Omit<StaffDto, "branch">>[] = [
    {
      title: "No.",
      dataIndex: "id",
      width: "20%",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Staff Name",
      dataIndex: "fullName",
      width: "40%",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];

  return (
    <Table
      loading={GetAllBranchStaffQuery.isPending}
      dataSource={dataSource}
      columns={columns}
      containerClassname={"w-full"}
      titleClassname={"text-sm font-semibold"}
      onRowClick={(record) => {
        console.log({ record });
      }}
    />
  );
};

export default BranchStaffTable;
