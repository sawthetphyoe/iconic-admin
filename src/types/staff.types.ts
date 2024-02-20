import { StaffRole } from "@/lib/enums";
import { PageableResponseDto, ResponseDto } from "@/types";

export type CreateStaffRequestDto = {
  username: string;
  email: string;
  fullName: string;
  role: StaffRole;
  branch: string;
  password: string;
  passwordConfirm: string;
};

export type SearchStaffRequestDto = {
  page: number;
  size: number;
  username: string;
  fullName: string;
  email: string;
  branch: string;
  role: StaffRole;
  sort: "desc" | "asc";
  orderBy: keyof StaffDto;
};

export type StaffDto = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: StaffRole;
  branch?: {
    id: string;
    name: string;
    address: string;
  };
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
};

export type SearchStaffResponseDto = PageableResponseDto<StaffDto>;

export type StaffDetailsResponseDto = ResponseDto<StaffDto>;
