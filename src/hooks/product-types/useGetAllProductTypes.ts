import { useQuery } from "@tanstack/react-query";
import { GetProductTypeResponseDto } from "@/types/product-type.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";

const getAllProductTypes = async (): Promise<GetProductTypeResponseDto> => {
  const { data } = await Axios.get(endpoints.productTypes);
  return data;
};

const useGetAllProductTypes = () =>
  useQuery({
    queryKey: ["get-all-product-types"],
    queryFn: getAllProductTypes,
  });

export default useGetAllProductTypes;
