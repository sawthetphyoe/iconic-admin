import { BranchDetailsResponseDto } from "@/types/branches.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";

const getBranchDetails = async (
  branchId: string
): Promise<BranchDetailsResponseDto> => {
  const { data } = await Axios.get(endpoints.branches + `/${branchId}`);
  return data;
};

const useGetBranchDetails = (branchId: string) => {
  return useQuery({
    queryKey: ["get-branch-details", branchId],
    queryFn: getBranchDetails.bind(null, branchId),
  });
};

export default useGetBranchDetails;
