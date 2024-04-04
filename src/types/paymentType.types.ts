import { ResponseDto } from "@/types/index";

export type PaymentTypeCreateRequestDto = {
  name: string;
};

export type PaymentTypeDto = {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
};

export type PaymentTypeListResponseDto = ResponseDto<PaymentTypeDto[]>;

export type PaymentTypeUpdateRequestDto = PaymentTypeCreateRequestDto;
