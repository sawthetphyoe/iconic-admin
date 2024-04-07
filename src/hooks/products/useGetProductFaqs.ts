import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { ProductFAQListResponseDto } from "@/types/products.types";
import { useQuery } from "@tanstack/react-query";

const getProductFaqs = async (
  productId: string
): Promise<ProductFAQListResponseDto> => {
  const { data } = await Axios.get(endpoints.productFaqs, {
    params: productId && { product: productId },
  });

  return data;
};

const useGetProductFaqs = (productId: string) =>
  useQuery({
    queryKey: ["get-product-faqs", productId],
    queryFn: getProductFaqs.bind(null, productId),
  });

export default useGetProductFaqs;
