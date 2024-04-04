import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { MemberTypeListResponseDto } from "@/types/memberType.types";
import { useQuery } from "@tanstack/react-query";

const getAllMemberTypes = async (): Promise<MemberTypeListResponseDto> => {
  const { data } = await Axios.get(endpoints.memberTypes);
  return data;
};

const useGetAllMemberTypes = () =>
  useQuery({
    queryKey: ["member-types"],
    queryFn: getAllMemberTypes,
  });

export default useGetAllMemberTypes;
