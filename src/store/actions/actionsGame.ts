import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../store';
import Game from 'utils/gameLib/Game';
import { TPointMatrix } from 'utils/game/scenes/mainScene';
import { ICapitalCity, TFieldMatrix } from 'store/slices/sliceGame';

const isCanPutBuild = (fieldMatrix: TFieldMatrix, point: TPointMatrix, matrix: TPointMatrix) => {
  const iX = point[0];
  const jY = point[1];
  if (iX < 1 || jY < 1) {
    return false;
  }

  if(iX+matrix[0]>fieldMatrix.length-1||jY+matrix[1]>fieldMatrix.length-1){
    return false;
  }

  for (let i = iX; i < iX + matrix[0]; i++) {
    for (let j = jY; j < jY + matrix[1]; j++) {
      const cell = fieldMatrix[i][j];
      if (cell.objId) {
        return false;
      }
    }
  }

  const lineX0 = point[0] - 1;
  const lineY0 = point[1] - 1;
  const lineX1 = lineX0 + matrix[0] + 1;
  const lineY1 = lineY0 + matrix[1] + 1;
  for (let i = lineX0; i < lineX1 + 1; i++) {
    const cell = fieldMatrix[i][lineY0];
    if (cell.isBuild) {
      return false;
    }
    //console.log(i,'||',lineY0);
  }

  for (let i = lineY0; i < lineY1 + 1; i++) {
    const cell = fieldMatrix[lineX0][i];
    if (cell.isBuild) {
      return false;
    }
    //console.log(lineX0,'||',i);
  }

  for (let i = lineX0; i < lineX1 + 1; i++) {
    const cell = fieldMatrix[i][lineY1];
    if (cell.isBuild) {
      return false;
    }
    //console.log(i,'||',lineY1);
  }

  for (let i = lineY0; i < lineY1 + 1; i++) {
    const cell = fieldMatrix[lineX1][i];
    if (cell.isBuild) {
      return false;
    }
    //console.log(lineX1,'||',i);
  }

  return true;
}

export type TActionPointerMove = {
  point: TPointMatrix;
  isCanPut: boolean;
}

export type TActionPointerUp = {
  point: TPointMatrix;
  isCanPut: boolean;
}

export const actionPointerMove = createAsyncThunk<TActionPointerMove, TPointMatrix, { state: AppState, rejectWithValue: any }>(
  'game/actionPointerMove',
  async (point, { getState, rejectWithValue }) => {
    try {

      const selectObj = getState().game.selectObj;
      let isCanPut = true;
      if (selectObj) {
        const fieldMatrix = getState().game.fieldMatrix;
        //const obj = state.selectObj;
        const city = getState().game.capitalCities[selectObj.idx];
        if (city) {
          isCanPut = isCanPutBuild(fieldMatrix, [point[0]-2,point[1]-2], [5, 5]);
        }
      }
      //const fieldMatrix = getState().game.fieldMatrix;

      return { point, isCanPut };
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);

export const actionPointerUp = createAsyncThunk<TActionPointerUp, TPointMatrix, { state: AppState, rejectWithValue: any }>(
  'game/actionPointerUp',
  async (point, { getState, rejectWithValue }) => {
    try {
      console.log('game/actionPointerUp');
      const selectObj = getState().game.selectObj;
      let isCanPut = true;
      if(selectObj){
        const fieldMatrix = getState().game.fieldMatrix; 
        const city = getState().game.capitalCities[selectObj.idx];
        if (city) {
          isCanPut = isCanPutBuild(fieldMatrix, [point[0]-2,point[1]-2], [5, 5]);
        }
      }
      //const fieldMatrix = getState().game.fieldMatrix;

      //const cell = fieldMatrix[point[0]][point[1]];

      return { point, isCanPut };
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);

export const actionAddCapitalCity = createAsyncThunk<ICapitalCity, TPointMatrix, { state: AppState, rejectWithValue: any }>(
  'game/actonAddCapitalCity',
  async (point, { getState, rejectWithValue }) => {
    try {

      const fieldMatrix = getState().game.fieldMatrix;
      //const sizeMatrix = fieldMatrix.length - 1;

      const isCanPut = isCanPutBuild(fieldMatrix, point, [5, 5]);
      //let isCanPut = true;
      let iX = point[0];
      let jY = point[1];
      // do {
      //   isCanPut = true;
      //   if (iX < 1) {
      //     iX += 1;
      //   }
      //   if (jY < 1) {
      //     jY += 1;
      //   }
      //   for (let i = iX; i < iX + 5; i++) {
      //     for (let j = jY; j < jY + 5; j++) {
      //       const cell = fieldMatrix[i][j];
      //       //console.log(i,'||',j,'=',cell);
      //       if (cell.objId) {
      //         isCanPut = false;
      //       }
      //     }
      //   }

      //   if (!isCanPut) {
      //     if (jY + 6 < sizeMatrix) {
      //       //console.log('y MOVE');
      //       jY += 1;
      //     } else {
      //       jY = 1;
      //       if (iX + 6 < sizeMatrix) {
      //         //console.log('x MOVE');
      //         iX += 1;
      //       } else {
      //         iX = 1;
      //       }
      //     }
      //   }
      // } while (!isCanPut);

      const capitalCity: ICapitalCity = {
        matrixPoint: [iX, jY],
        prevMatrixPoint: [iX, jY],
        matrix: [5, 5],
        id: Game.createId(),
        race: "empire",
        squadOut: [],
        squadIn: [],
        isCanPut,
        isUp: isCanPut ? false : true
      }

      return capitalCity;
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);