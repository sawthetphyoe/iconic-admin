import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { CreateProductRequestDto } from "@/types/products.types";

export type ProductColorImage = {
  color: string;
  colorCode: string;
  file: File;
};

type CreateProductStoreType = CreateProductRequestDto & {
  images: ProductColorImage[];
};

const initialState: CreateProductStoreType = {
  name: "",
  productType: "",
  keyFeatures: [],
  processors: [],
  rams: [],
  storages: [],
  images: [],
};

export const CreateProductFormDataSlice = createSlice({
  name: "createProductFormData",
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateProductType: (state, action: PayloadAction<string>) => {
      state.productType = action.payload;
    },
    addKeyFeature: (state, action: PayloadAction<string>) => {
      state.keyFeatures.push(action.payload);
    },
    removeKeyFeature: (state, action: PayloadAction<string>) => {
      state.keyFeatures = state.keyFeatures.filter(
        (keyFeature) => keyFeature !== action.payload
      );
    },
    addProcessor: (state, action: PayloadAction<string>) => {
      state.processors.push(action.payload);
    },
    removeProcessor: (state, action: PayloadAction<string>) => {
      state.processors = state.processors.filter(
        (processor) => processor !== action.payload
      );
    },
    addRam: (state, action: PayloadAction<string>) => {
      state.rams.push(action.payload);
    },
    removeRam: (state, action: PayloadAction<string>) => {
      state.rams = state.rams.filter((ram) => ram !== action.payload);
    },
    addStorage: (state, action: PayloadAction<string>) => {
      state.storages.push(action.payload);
    },
    removeStorage: (state, action: PayloadAction<string>) => {
      state.storages = state.storages.filter(
        (storage) => storage !== action.payload
      );
    },
    addProductImage: (state, action: PayloadAction<ProductColorImage>) => {
      state.images.push(action.payload);
    },
    removeProductImage: (state, action: PayloadAction<ProductColorImage>) => {
      state.images = state.images.filter(
        (image) => image.color !== action.payload.color
      );
    },
  },
});

export default CreateProductFormDataSlice.reducer;

export const selectCreateProductFormData = (state: RootState) =>
  state.createProductFormData;

export const {
  updateName,
  updateProductType,
  addKeyFeature,
  removeKeyFeature,
  addProcessor,
  removeProcessor,
  addRam,
  removeRam,
  addStorage,
  removeStorage,
  addProductImage,
  removeProductImage,
} = CreateProductFormDataSlice.actions;
