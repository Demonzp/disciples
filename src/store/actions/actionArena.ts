import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUnit, TPosition } from "store/slices/sliceGame";
import { TStatsModifire } from "store/slices/sliceMultiArena";
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

export type TUpdateUnitsStats = {
  units: IUnit[],
  unitsStatsModifier: TStatsModifire[],
};

export const updateUnitsStatsRes = createAsyncThunk<TUpdateUnitsStats, TUpdateUnitsStats, { state: AppState, rejectWithValue: any }>(
  'multiArena/updateUnitsStatsRes',
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

export const updateUnitsRes = createAsyncThunk<IUnit[], IUnit[], { state: AppState, rejectWithValue: any }>(
  'multiArena/updateUnitsRes',
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

export type TPickHero = {
  idUnit: string;
  position: TPosition;
}

export const pickHero = createAsyncThunk<undefined, TPickHero, { state: AppState, rejectWithValue: any }>(
  'multiArena/pickHero',
  async (data, { rejectWithValue }) => {
    try {

      socketInst.emit('pick-hero', data);
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);

type TUnitToCellData = {
  unitPos:TPosition;
  cellPos:TPosition;
};

export const unitToCell = createAsyncThunk<undefined, TUnitToCellData, { state: AppState, rejectWithValue: any }>(
  'multiArena/unitToCell',
  async (data, { rejectWithValue }) => {
    try {

      socketInst.emit('unit-to-cell', data);
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);

export const actionHeroUpSkill = createAsyncThunk<undefined, string, { state: AppState, rejectWithValue: any }>(
  'multiArena/actionHeroUpSkill',
  async (data, { rejectWithValue }) => {
    try {

      socketInst.emit('hero-up-skill', data);
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);