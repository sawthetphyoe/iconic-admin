import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";
import { InventoryListResponseDto } from "@/types/inventories.types";

export type InventoryGroupBy = "branches" | "products" | "variants";
const getInventories = async (
  groupBy: InventoryGroupBy
): Promise<InventoryListResponseDto> => {
  const { data } = await Axios.get(endpoints.inventories + `/${groupBy}`);
  return data;
};

const useGetInventories = (
  groupBy: InventoryGroupBy = "branches",
  variable?: string
) => {
  return useQuery({
    queryKey: ["get-inventories", groupBy, variable],
    queryFn: getInventories.bind(null, groupBy),
  });
};

export default useGetInventories;
