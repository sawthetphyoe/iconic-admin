export type InventoryDto = {
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
