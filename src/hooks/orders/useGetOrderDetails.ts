import { endpoints } from "@/lib/endpoints";
import Axios from "@/axios.config";
import { useQuery } from "@tanstack/react-query";
import { OrderDetailsResponseDto } from "@/types/orders.types";

const getOrderDetails = async (
  orderId: string
): Promise<OrderDetailsResponseDto> => {
  const { data } = await Axios.get(endpoints.orders + `/${orderId}`);

  return data;
};

const useGetOrderDetails = (orderId: string) =>
  useQuery({
    queryKey: ["get-order-details", orderId],
    queryFn: getOrderDetails.bind(null, orderId),
  });

export default useGetOrderDetails;
