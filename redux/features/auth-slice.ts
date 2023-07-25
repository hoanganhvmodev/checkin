import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "@/interfaces/user";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
  user: User | null;
};

const initialState: InitialState = {
  value: {
    isAuth: false,
    user: null,
  } as AuthState,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<User>) => {
      return {
        value: {
          isAuth: true,
          user: action.payload,
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
