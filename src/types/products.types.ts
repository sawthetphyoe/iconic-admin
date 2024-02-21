import { PageableResponseDto, ResponseDto } from "@/types";

export type ProductImageColorField = `${string}#${string}`;

export type CreateProductRequestDto = {
  name: string;
  productType: string;
  keyFeatures: string;
  processors: string;
  rams: string;
  storages: string;
} & Record<ProductImageColorField, File>;

export type ProductColorImageDto = {
  color: string;
  colorCode: string;
  imageId: string;
};

export type ProductDto = {
  id: string;
  name: string;
  productType: {
    id: string;
    name: string;
  };
  keyFeatures: string[];
  images: ProductColorImageDto[];
  processors: string[];
  rams: string[];
  storages: string[];
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
};

export type SearchProductRequestDto = {
  page: number;
  size: number;
  name: string;
  productType: string;
  sort: "desc" | "asc";
  order: keyof ProductDto;
};

export type GetAllProductResponseDto = ResponseDto<ProductDto[]>;

export type SearchProductResponseDto = PageableResponseDto<ProductDto>;

export type ProductDetailResponseDto = ResponseDto<ProductDto>;
