import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "store/store";

export const googleLogin = createAsyncThunk<any, any, { state: AppState, rejectWithValue: any }>(
    'multiplaeyr/googleLogin',
    async (data, { rejectWithValue }) => {
      try {
        return data;
      } catch (error) {
        console.error('error = ', (error as Error).message);
        return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
      }
    }
  );