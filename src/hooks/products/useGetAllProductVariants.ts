import { GetAllProductVariantsDto } from "@/types/products.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";

const getAllProductVariants = async (
  productId?: string
): Promise<GetAllProductVariantsDto> => {
  const { data } = await Axios.get(endpoints.productVariants, {
    params: {
      ...(productId && { product: productId }),
    },
  });

  return data;
};

const useGetAllProductVariants = (productId?: string) =>
  useQuery({
    queryKey: ["get-all-product-variants", productId],
    queryFn: getAllProductVariants.bind(null, productId),
    enabled: !!productId,
  });

export default useGetAllProductVariants;
