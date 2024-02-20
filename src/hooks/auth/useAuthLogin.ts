import { useMutation } from "@tanstack/react-query";
import { AuthLoginRequestDto, AuthLoginResponseDto } from "@/types/auth.types";
import { endpoints } from "@/lib/endpoints";
import Axios from "@/axios.config";

const authLogin = async (
  payload: AuthLoginRequestDto
): Promise<AuthLoginResponseDto> => {
  const { data } = await Axios.post(endpoints.auth.login, payload);
  return data;
};

const useAuthLogin = () => {
  return useMutation({
    mutationKey: ["auth-login"],
    mutationFn: authLogin,
  });
};

export default useAuthLogin;
