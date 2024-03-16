import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "store/store";

export const googleLogin = createAsyncThunk<any, any, { state: AppState, rejectWithValue: any }>(
    'multiplaeyr/googleLogin',
    async (data, { rejectWithValue }) => {
      try {
        const response = await fetch('http://localhost:4000/auth-google', {
          method: 'POST',
          headers: {
            Authorization: data
          },
        });
        if(response.ok){
          const result = await response.json();
          return result;
        }
        throw new Error('Authentication error');
      } catch (error) {
        console.error('error = ', (error as Error).message);
        return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
      }
    }
  );