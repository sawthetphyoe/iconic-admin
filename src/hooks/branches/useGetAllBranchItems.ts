import { useQuery } from "@tanstack/react-query";
import {
  BranchItemRequestDto,
  BranchItemResponseDto,
} from "@/types/branches.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";

const getAllBranchItems = async (
  params: Partial<BranchItemRequestDto> & { id: string }
): Promise<BranchItemResponseDto> => {
  const { data } = await Axios.get(`${endpoints.branches}/items/${params.id}`, {
    params,
  });

  return data;
};

const useGetAllBranchItems = (
  params: Partial<BranchItemRequestDto> & { id: string }
) =>
  useQuery({
    queryKey: ["get-all-branch-items"],
    queryFn: getAllBranchItems.bind(null, params),
  });

export default useGetAllBranchItems;
