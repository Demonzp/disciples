import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUnit, TPosition } from "store/slices/sliceGame";
import { AppState } from "store/store";
import socketInst from "utils/socket";

export type TUnitToUnitData = {
  unit1:TPosition,
  unit2:TPosition
}

export const unitToUnit = createAsyncThunk<undefined, TUnitToUnitData, { state: AppState, rejectWithValue: any }>(
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

export const unitToUnitRes = createAsyncThunk<IUnit[], IUnit[], { state: AppState, rejectWithValue: any }>(
  'multiArena/unitToUnitRes',
  async (data, { rejectWithValue }) => {
    try {
      return data;
      //socketInst.emit('unit-to-unit', data);
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);