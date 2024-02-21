import { useQuery } from "@tanstack/react-query";
import {
  BranchStaffRequestDto,
  BranchStaffResponseDto,
} from "@/types/branches.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";

const getAllBranchStaff = async (
  params: Partial<BranchStaffRequestDto> & { id: string }
): Promise<BranchStaffResponseDto> => {
  const { data } = await Axios.get(`${endpoints.branches}/staff/${params.id}`, {
    params,
  });

  return data;
};

const useGetAllBranchStaff = (
  params: Partial<BranchStaffRequestDto> & { id: string }
) =>
  useQuery({
    queryKey: ["get-all-branch-staff"],
    queryFn: getAllBranchStaff.bind(null, params),
  });

export default useGetAllBranchStaff;
