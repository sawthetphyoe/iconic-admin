import {
  SearchStaffRequestDto,
  SearchStaffResponseDto,
} from "@/types/staff.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";
import filterSearchParams from "@/utils/filterSearchParams";

const searchStaff = async (
  searchParams: Partial<SearchStaffRequestDto>
): Promise<SearchStaffResponseDto> => {
  const { data } = await Axios.get(endpoints.staff, {
    params: filterSearchParams(searchParams),
  });
  return data;
};

const useGetAllStaff = (searchParams: Partial<SearchStaffRequestDto>) => {
  return useQuery({
    queryKey: ["search-staff", searchParams],
    queryFn: () => searchStaff(searchParams),
  });
};

export default useGetAllStaff;
