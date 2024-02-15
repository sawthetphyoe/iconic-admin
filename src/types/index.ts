export type MutationSuccessResponseDto = {
  success: boolean;
  payload: {
    id?: string;
    message: string;
  };
  issuedAt: string;
};
