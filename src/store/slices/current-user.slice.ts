import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { AuthLoginResponse } from "@/types/auth.types";

type CurrentUserStoreType = AuthLoginResponse["payload"];

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
      state.accessToken = action.payload.accessToken;
    },
    removeUser: (state) => {
      state.id = undefined;
      state.username = undefined;
      state.fullName = undefined;
      state.role = undefined;
      state.accessToken = undefined;
    },
  },
});

export default currentUserSlice.reducer;

export const selectUser = (state: RootState) => state.currentUser;

export const { setUser, removeUser } = currentUserSlice.actions;
