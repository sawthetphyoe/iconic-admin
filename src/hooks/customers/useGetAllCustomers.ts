import { CustomerListResponseDto } from "@/types/customers.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";

const getAllCustomers = async (): Promise<CustomerListResponseDto> => {
  const { data } = await Axios.get(endpoints.customers);
  return data;
};

const useGetAllCustomers = () =>
  useQuery({
    queryKey: ["get-all-customers"],
    queryFn: getAllCustomers,
  });

export default useGetAllCustomers;
