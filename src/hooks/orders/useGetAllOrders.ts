import { OrderListResponseDto } from "@/types/orders.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";

const getAllOrders = async (): Promise<OrderListResponseDto> => {
  const { data } = await Axios.get(endpoints.orders);
  return data;
};

const useGetAllOrders = () =>
  useQuery({
    queryKey: ["get-all-orders"],
    queryFn: getAllOrders,
  });

export default useGetAllOrders;
