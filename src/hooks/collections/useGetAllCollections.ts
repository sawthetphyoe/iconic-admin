import { useQuery } from "@tanstack/react-query";
import { GetProductTypeResponseDto } from "@/types/collections.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";

const getAllCollections = async (): Promise<GetProductTypeResponseDto> => {
  const { data } = await Axios.get(endpoints.collections);
  return data;
};

const useGetAllCollections = () =>
  useQuery({
    queryKey: ["get-all-collections"],
    queryFn: getAllCollections,
  });

export default useGetAllCollections;
