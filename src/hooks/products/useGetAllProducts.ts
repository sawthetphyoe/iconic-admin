import { useQuery } from "@tanstack/react-query";
import {
  SearchProductRequestDto,
  SearchProductResponseDto,
} from "@/types/products.types";
import { endpoints } from "@/lib/endpoints";
import Axios from "@/axios.config";

const getAllProducts = async (
  searchParams: Partial<SearchProductRequestDto>
): Promise<SearchProductResponseDto> => {
  const { data } = await Axios.get(endpoints.products, {
    params: searchParams,
  });
  return data;
};

const useGetAllProducts = (searchParams: Partial<SearchProductRequestDto>) =>
  useQuery({
    queryKey: ["get-all-products"],
    queryFn: getAllProducts.bind(null, searchParams),
  });

export default useGetAllProducts;
