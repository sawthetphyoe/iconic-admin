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

export type ProductVariantDto = {
  id: string;
  product: {
    id: string;
    name: string;
    productType: {
      id: string;
      name: string;
    };
  };
  color: string;
  image: ProductColorImageDto;
  processor: string;
  ram: string;
  storage: string;
  price: number;
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

export type ProductFAQDto = {
  id: string;
  product: {
    id: string;
    name: string;
  };
  question: string;
  answer: string;
  createdAt: string;
  createdBy: string;
};

export type CreateProductFAQRequestDto = {
  product: string;
  question: string;
  answer: string;
};

export type ProductFAQListResponseDto = ResponseDto<ProductFAQDto>;

export type GetProductVariantDetailsDto = ResponseDto<ProductVariantDto>;

export type GetAllProductVariantsDto = ResponseDto<ProductVariantDto[]>;

export type GetAllProductResponseDto = ResponseDto<ProductDto[]>;

export type SearchProductResponseDto = PageableResponseDto<ProductDto>;

export type ProductDetailResponseDto = ResponseDto<ProductDto>;
