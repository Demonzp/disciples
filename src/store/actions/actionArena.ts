import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "store/store";
import socketInst from "utils/socket";

export const unitToUnit = createAsyncThunk<any, any, { state: AppState, rejectWithValue: any }>(
    'multiArena/unitToUnit',
    async (data, { rejectWithValue }) => {
      try {
        
        socketInst.emit('unit-to-unit', data);
      } catch (error) {
        console.error('error = ', (error as Error).message);
        return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
      }
    }
  );