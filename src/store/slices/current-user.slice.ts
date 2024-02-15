import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { CurrentUserResponse } from "@/types/auth.types";

type CurrentUserStoreType = CurrentUserResponse["payload"];

type PayloadType = CurrentUserStoreType;

const initialState: Partial<CurrentUserStoreType> = {};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<PayloadType>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.fullName = action.payload.fullName;
      state.role = action.payload.role;
    },
    removeUser: (state) => {
      state.id = undefined;
      state.username = undefined;
      state.fullName = undefined;
      state.role = undefined;
    },
  },
});

export default currentUserSlice.reducer;

export const selectUser = (state: RootState) => state.currentUser;

export const { setUser, removeUser } = currentUserSlice.actions;
