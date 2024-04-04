import { ResponseDto } from "@/types/index";

export type MemberTypeCreateRequestDto = {
  name: string;
  minAmount: number;
};

export type MemberTypeDto = {
  id: string;
  name: string;
  minAmount: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
};

export type MemberTypeListResponseDto = ResponseDto<MemberTypeDto[]>;

export type MemberTypeUpdateRequestDto = MemberTypeCreateRequestDto;
