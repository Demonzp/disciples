import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../store';
import Game from 'utils/gameLib/Game';
import { TPointMatrix } from 'utils/game/scenes/editorScene';
import { ICapitalCity, TCell, TFieldMatrix, TRectangle, defaultRect } from 'store/slices/sliceGame';
import { TCapitalRace } from 'utils/game/objects/CapitalCity';
import VirtualRect from 'utils/virtualRect';

const isCanPutBuild = (fieldMatrix: TFieldMatrix, point: TPointMatrix, matrix: TPointMatrix) => {
  const iX = point[0];
  const jY = point[1];
  if (iX < 1 || jY < 1) {
    return false;
  }

  if (iX + matrix[0] > fieldMatrix.length - 1 || jY + matrix[1] > fieldMatrix.length - 1) {
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
          isCanPut = isCanPutBuild(fieldMatrix, [point[0] - 2, point[1] - 2], [5, 5]);
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
      if (selectObj) {
        const fieldMatrix = getState().game.fieldMatrix;
        const city = getState().game.capitalCities[selectObj.idx];
        if (city) {
          isCanPut = isCanPutBuild(fieldMatrix, [point[0] - 2, point[1] - 2], [5, 5]);
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

let i = 0;

export const actionAddCapitalCity = createAsyncThunk<ICapitalCity, TPointMatrix, { state: AppState, rejectWithValue: any }>(
  'game/actonAddCapitalCity',
  async (point, { getState, rejectWithValue }) => {
    try {

      const fieldMatrix = getState().game.fieldMatrix;
      //const sizeMatrix = fieldMatrix.length - 1;
      let iX = point[0] - 2;
      let jY = point[1] - 2;
      let race: TCapitalRace = 'empire';
      const isCanPut = isCanPutBuild(fieldMatrix, [iX, jY], [5, 5]);
      if (i > 0) {
        race = 'legions';
      }
      //let isCanPut = true;

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
        race,
        squadOut: [],
        squadIn: [],
        isCanPut,
        isUp: isCanPut ? false : true
      }
      i += 1;

      return capitalCity;
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);

export type TDataInitMap = {
  name: string;
  size: number;
  race: TCapitalRace[];
}

export type TStoreInitMap = {
  matrixField: TFieldMatrix;
  rectCell: TRectangle,
  rectField: TRectangle
}

export const actionInitNewMap = createAsyncThunk<TStoreInitMap, TDataInitMap, { state: AppState, rejectWithValue: any }>(
  'game/actionInitNewMap',
  async (data, { getState, rejectWithValue }) => {
    try {
      const cellSize = getState().game.cellSize;
      const rectCell = new VirtualRect(cellSize, cellSize);
      rectCell.rotate = 45;
      rectCell.scaleX = 0.5;
      const widthCell = rectCell.x1 - rectCell.x3;
      const heightCell = rectCell.y2 - rectCell.y0;
      const halfWidthCell = widthCell / 2;
      const halfHeightCell = heightCell / 2;
      const storeCell = defaultRect();
      //console.log('rectCell = ', defaultRect.x0);
      storeCell.x0 = rectCell.x0;
      storeCell.x1 = rectCell.x1;
      storeCell.x2 = rectCell.x2;
      storeCell.x3 = rectCell.x3;
      storeCell.y0 = rectCell.y0;
      storeCell.y1 = rectCell.y1;
      storeCell.y2 = rectCell.y2;
      storeCell.y3 = rectCell.y3;
      storeCell.width = widthCell;
      storeCell.height = heightCell;
      storeCell.halfWidth = halfWidthCell;
      storeCell.halfHeight = halfHeightCell;
      
      const rectangle = new VirtualRect(cellSize * data.size, cellSize * data.size);

      rectangle.rotate = 45;
      rectangle.scaleX = 0.5;
      const widthField = rectangle.x1 - rectangle.x3;
      const heightField = rectangle.y2 - rectangle.y0;
      rectangle.moveX(widthField / 2);
      rectangle.moveY(heightField / 2);
      console.log('rectangle = ', rectangle);
      const storeFieldRect = defaultRect();
      storeFieldRect.x0 = rectangle.x0;
      storeFieldRect.x1 = rectangle.x1;
      storeFieldRect.x2 = rectangle.x2;
      storeFieldRect.x3 = rectangle.x3;
      storeFieldRect.y0 = rectangle.y0;
      storeFieldRect.y1 = rectangle.y1;
      storeFieldRect.y2 = rectangle.y2;
      storeFieldRect.y3 = rectangle.y3;
      storeFieldRect.width = widthField;
      storeFieldRect.height = heightField;
      storeFieldRect.halfWidth = widthField/2;
      storeFieldRect.halfHeight = heightField/2;

      let startX = rectangle.x0;
      let startY = rectangle.y0 + halfHeightCell
      let row: TCell[] = [];
      const matrix: TFieldMatrix = [];
      for (let i = 1; i < data.size + 1; i++) {
        for (let j = 0; j < data.size; j++) {
          const x = startX;
          const y = startY;

          row.push({
            x,
            y,
            objId: null,
            terrain: 'neutral',
            isBuild: false
          });

          startX -= halfWidthCell;
          startY += halfHeightCell;
        }
        matrix.push(row);
        row = [];
        startX = rectangle.x0 + halfWidthCell * i;
        startY = rectangle.y0 + halfHeightCell * (i + 1);
      }

      return {
        matrixField:matrix,
        rectCell:storeCell,
        rectField:storeFieldRect
      };
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);