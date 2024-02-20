import { StaffRole } from "@/lib/enums";
import { ResponseDto } from "@/types";

export type AuthLoginRequestDto = {
  username: string;
  password: string;
};

export type AuthLoginResponseDto = ResponseDto<{
  id: string;
  username: string;
  fullName: string;
  role: StaffRole;
  accessToken: string;
}>;

export type CurrentUserResponseDto = ResponseDto<{
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: StaffRole;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
}>;
