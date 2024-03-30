import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMenuType } from "store/slices/sliceMenuGame";
import { TUser, setLogout } from "store/slices/sliceMultiplayer";
import { AppState } from "store/store";

export type TResGoogleLogin = {
  user: TUser;
  token: string;
}
export const googleLogin = createAsyncThunk<TResGoogleLogin, string, { state: AppState, rejectWithValue: any }>(
  'multiplaeyr/googleLogin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/auth-google', {
        method: 'POST',
        headers: {
          Authorization: data
        },
      });
      if (response.ok) {
        const result = await response.json() as { user: TUser };
        console.log('result = ', result);
        return { user: result.user, token: data };
      }
      throw new Error('Authentication error');
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);

export const actionLogouded = createAsyncThunk<undefined, undefined, { state: AppState, rejectWithValue: any }>(
  'multiplaeyr/actionLogouded',
  async (_, { getState, rejectWithValue }) => {
    try {
      const data = {
        id: getState().multiplayer.user.id
      }

      console.log('actionLogouded data = ', data);
      const response = await fetch('http://localhost:4000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('actionLogouded error');
      }
      //dispatch(setMenuType('multiplayer-signin'));
      //dispatch(setLogout(false));
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);