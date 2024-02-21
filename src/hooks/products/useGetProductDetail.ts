import { ProductDetailResponseDto } from "@/types/products.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";

const getProductDetail = async (
  id: string
): Promise<ProductDetailResponseDto> => {
  const { data } = await Axios.get(endpoints.products + "/" + id);
  return data;
};

const useGetProductDetail = (id: string) => {
  return useQuery({
    queryKey: ["get-product-detail", id],
    queryFn: getProductDetail.bind(null, id),
  });
};

export default useGetProductDetail;
