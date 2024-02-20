export type ResponseDto<T> = {
  success: boolean;
  payload: T;
  issuedAt: string;
};

export type MutationSuccessResponseDto = ResponseDto<{
  id?: string;
  message: string;
}>;

export type PageableResponseDto<T> = ResponseDto<{
  currentPage: number;
  currentSize: number;
  totalRecord: number;
  totalPage: number;
  dtoList: T[];
}>;
