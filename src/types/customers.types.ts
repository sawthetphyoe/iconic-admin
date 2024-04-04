import { ResponseDto } from "@/types/index";

export type CustomerDto = {
  id: string;
  name: string;
  memberType: string;
  email: string;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

export type CustomerListResponseDto = ResponseDto<CustomerDto[]>;
