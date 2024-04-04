import { OrderStatus } from "@/lib/enums";
import { ResponseDto } from "@/types/index";

export type OrderItemAvailableBranchDto = {
  productVariant: string;
  branchName: string;
  branchId: string;
  inStock: number;
};

export type OrderItemDto = {
  id: string;
  product: {
    id: string;
    name: string;
    variant: {
      id: string;
      color: string;
      processor: string;
      ram: string;
      storage: string;
    };
  };
  quantity: number;
  price: number;
  subTotal: number;
  createdAt: string;
  availableBranches: OrderItemAvailableBranchDto[];
};

export type OrderDto = {
  id: string;
  customer: string;
  paymentType: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  orderItems: OrderItemDto[];
};

export type ApproveOrderItemRequestDto = {
  productVariantId: string;
  quantity: number;
  branch: string;
};

export type ApproveOrderRequestDto = {
  orderItems: ApproveOrderItemRequestDto[];
};

export type OrderListResponseDto = ResponseDto<OrderDto[]>;

export type OrderDetailsResponseDto = ResponseDto<OrderDto>;
