import {
  BasePageableRequestDto,
  PageableResponseDto,
  ResponseDto,
} from "@/types";
import { StaffDto } from "@/types/staff.types";
import { InventoryDto } from "@/types/inventories.types";

export type BranchDto = {
  id: string;
  name: string;
  address: string;
  staffCount: number;
  itemCount: number;
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

export type BranchStaffRequestDto = BasePageableRequestDto<StaffDto>;

export type BranchStaffResponseDto = PageableResponseDto<
  Omit<StaffDto, "branch">
>;

export type BranchItemRequestDto = BasePageableRequestDto<InventoryDto>;

export type BranchItemResponseDto = PageableResponseDto<
  Omit<InventoryDto, "branch">
>;
