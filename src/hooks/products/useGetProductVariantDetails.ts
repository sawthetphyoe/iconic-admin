import { GetProductVariantDetailsDto } from "@/types/products.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";

const getProductVariantDetails = async (
  id: string
): Promise<GetProductVariantDetailsDto> => {
  const { data } = await Axios.get(endpoints.productVariants + `/${id}`);
  return data;
};

const useGetProductVariantDetails = (id: string) =>
  useQuery({
    queryKey: ["get-product-variant-details"],
    queryFn: getProductVariantDetails.bind(null, id),
    enabled: !!id,
  });

export default useGetProductVariantDetails;
