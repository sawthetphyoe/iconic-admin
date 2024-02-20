import { ResponseDto } from "@/types";

export type ProductTypeDto = {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
};

export type GetProductTypeResponseDto = ResponseDto<ProductTypeDto[]>;
