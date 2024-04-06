import React from "react";
import {
  InventoryListResponseDto,
  InventoryResponseDto,
} from "@/types/inventories.types";
import InventoryTable from "@/components/inventory/InventoryTable";
import { InventoryGroupBy } from "@/hooks/inventory/useGetInventories";

type InventoryTableProps = {
  groupBy: InventoryGroupBy;
  dataSource: InventoryResponseDto[];
};

const InventoryTablesGroup: React.FC<InventoryTableProps> = ({
  groupBy,
  dataSource,
}) => {
  return (
    <div className={"w-full flex flex-col gap-10"}>
      {dataSource.map((data) => {
        return (
          <div key={data.id}>
            <InventoryTable groupBy={groupBy} dataSource={data} />
          </div>
        );
      })}
    </div>
  );
};

export default InventoryTablesGroup;
