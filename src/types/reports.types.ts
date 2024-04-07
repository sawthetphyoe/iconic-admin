import { ResponseDto } from "@/types/index";

export type ReportsResponseDto = ResponseDto<{
  todayOrders: number;
  totalOrders: number;
  totalCustomers: number;
  monthlyOrders: {
    date: string;
    count: number;
  }[];
}>;
