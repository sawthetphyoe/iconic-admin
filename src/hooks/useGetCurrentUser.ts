import { useQuery } from "@tanstack/react-query";
import { CurrentUserResponse } from "@/types/auth.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { CookieValueTypes } from "cookies-next";

const getCurrentUser = async (): Promise<CurrentUserResponse> => {
  const { data } = await Axios.get(endpoints.auth.me);
  return data;
};
const useGetCurrentUser = (
  currentUser: Partial<CurrentUserResponse["payload"]>,
  token: CookieValueTypes,
) => {
  return useQuery({
    queryKey: ["get-current-user"],
    queryFn: getCurrentUser,
    enabled: !!token && !currentUser.id,
  });
};

export default useGetCurrentUser;
