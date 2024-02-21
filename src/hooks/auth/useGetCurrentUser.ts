import { useQuery } from "@tanstack/react-query";
import { CurrentUserResponseDto } from "@/types/auth.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";

const getCurrentUser = async (): Promise<CurrentUserResponseDto> => {
  const { data } = await Axios.get(endpoints.auth.me);
  return data;
};
const useGetCurrentUser = (enabled: boolean) => {
  return useQuery({
    queryKey: ["get-current-user"],
    queryFn: getCurrentUser,
    enabled,
  });
};

export default useGetCurrentUser;
