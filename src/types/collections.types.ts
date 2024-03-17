import { ResponseDto } from "@/types";

export type ProductCollectionDto = {
  id: string;
  name: string;
  productCount: number;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
};

export type CreateCollectionRequestDto = {
  name: string;
};

export type UpdateCollectionRequestDto = CreateCollectionRequestDto & {
  id: string;
};

export type GetProductTypeResponseDto = ResponseDto<ProductCollectionDto[]>;
