import { StaffRole } from "@/lib/enums";

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

export type SearchStaffResponseDto = {
  success: boolean;
  payload: {
    currentPage: number;
    currentSize: number;
    totalRecord: number;
    totalPage: number;
    dtoList: StaffDto[];
  };
  issuedAt: string;
};

export type CreateStaffRequestDto = {
  username: string;
  email: string;
  fullName: string;
  role: StaffRole;
  branch: string;
  password: string;
  passwordConfirm: string;
};

export type StaffDetailsResponseDto = {
  success: boolean;
  payload: StaffDto;
  issuedAt: string;
};
