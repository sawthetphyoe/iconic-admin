import { useQuery } from "@tanstack/react-query";
import { BranchListResponseDto } from "@/types/branches.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";

const getAllBranches = async (): Promise<BranchListResponseDto> => {
  const { data } = await Axios.get(endpoints.branches);

  return data;
};

const useGetAllBranches = () => {
  return useQuery({
    queryKey: ["get-all-branches"],
    queryFn: getAllBranches,
  });
};

export default useGetAllBranches;
