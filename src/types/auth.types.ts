import { StaffRole } from "@/lib/enums";

export type AuthLoginPayload = {
  username: string;
  password: string;
};

export type AuthLoginResponse = {
  success: boolean;
  payload: {
    id: string;
    username: string;
    fullName: string;
    role: StaffRole;
    accessToken: string;
  };
  issuedAt: string;
};
