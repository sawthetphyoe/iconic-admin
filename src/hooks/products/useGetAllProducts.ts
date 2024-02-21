import { useQuery } from "@tanstack/react-query";
import { GetAllProductResponseDto } from "@/types/products.types";
import { endpoints } from "@/lib/endpoints";
import Axios from "@/axios.config";

const getAllProducts = async (): Promise<GetAllProductResponseDto> => {
  const { data } = await Axios.get(`${endpoints.products}/all`);
  return data;
};

const useGetAllProducts = () =>
  useQuery({
    queryKey: ["get-all-products"],
    queryFn: getAllProducts,
  });

export default useGetAllProducts;
