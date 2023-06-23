import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { TPointer } from 'utils/gameLib/InputEvent';
import { TPoint } from 'utils/gameLib/Game';

export const actionPointerMove = createAsyncThunk<TPoint, TPoint, { state: AppState, rejectWithValue: any }>(
    'game/actionPointerMove',
    async (pointer, { getState, rejectWithValue }) => {
      try {

        const fieldMatrix = getState().game.fieldMatrix;
        
        return pointer;
      } catch (error) {
        console.error('error = ', (error as Error).message);
        return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
      }
    }
  );