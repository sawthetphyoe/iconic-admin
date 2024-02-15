export type BranchDto = {
  id: string;
  name: string;
  address: string;
  staffCount: number;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
};

export type BranchListResponseDto = {
  success: boolean;
  payload: BranchDto[];
  issuedAt: string;
};

export type BranchCreatePayloadDto = {
  name: string;
  address: string;
};

export type BranchDetailsResponseDto = {
  success: boolean;
  payload: {
    id: string;
    name: string;
    address: string;
    staffCount: number;
    createdAt: string;
    createdBy: string;
    updatedAt?: string;
    updatedBy?: string;
  };
  issuedAt: string;
};

export type BranchUpdatePayloadDto = {
  name: string;
  address: string;
};
