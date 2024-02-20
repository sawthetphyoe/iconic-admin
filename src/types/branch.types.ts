import { ResponseDto } from "@/types";

export type BranchDto = {
  id: string;
  name: string;
  address: string;
  staffCount: number;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
};

export type BranchCreateRequestDto = {
  name: string;
  address: string;
};

export type BranchUpdateRequestDto = Partial<BranchCreateRequestDto>;

export type BranchListResponseDto = ResponseDto<BranchDto[]>;

export type BranchDetailsResponseDto = ResponseDto<BranchDto>;
