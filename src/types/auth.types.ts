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

export type CurrentUserResponse = {
  success: boolean;
  payload: {
    id: string;
    username: string;
    fullName: string;
    email: string;
    role: StaffRole;
    createdAt: string;
    createdBy: string;
    updatedAt?: string;
    updatedBy?: string;
  };
  issuedAt: "2024-02-12T18:08:12.630Z";
};
