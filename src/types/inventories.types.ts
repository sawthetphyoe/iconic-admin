export type InventoryDto = {
  inventoryId: string;
  branch: {
    id: string;
    name: string;
  };
  product: {
    id: string;
    name: string;
    variant: {
      id: string;
      color: string;
      processor: string;
      ram: string;
      storage: string;
      price: number;
    };
  };
  quantity: number;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
};

export type AddProductToInventoryRequestDto = {
  branch: string;
  product: string;
  color: string;
  processor: string;
  ram: string;
  storage: string;
  price: string;
  quantity: string;
};

import { ResponseDto } from "@/types/index";

export type InventoryItemDto = {
  id: string;
  branch: {
    id: string;
    name: string;
  };
  product: {
    id: string;
    name: string;
    variant: {
      id: string;
      color: string;
      processor: string;
      ram: string;
      storage: string;
      price: number;
    };
  };
  quantity: number;
  createdAt: string;
  createdBy: string;
};

export type InventoryResponseDto = {
  id: string;
  name: string;
  inventories: InventoryItemDto[];
};

export type InventoryListResponseDto = ResponseDto<InventoryResponseDto[]>;
