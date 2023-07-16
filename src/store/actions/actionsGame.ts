import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../store';
import Game from 'utils/gameLib/Game';
import { TPointMatrix } from 'utils/game/scenes/editorScene';
import { IBaseUnit, ICapitalCity, ICity, IUnit, TCapitalRace, TCell, TEditorMod, TFieldMatrix, TLordType, TParty, TPartySide, TRectangle, baseUnits, capitalGuards, defaultRect } from 'store/slices/sliceGame';
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

const createParty = (side:TPartySide):TParty=>{
  return {
    id: Game.createId(),
    side
  }
}

const getCapitalGuard = (race:TCapitalRace):IUnit=>{

  switch (race) {
    case 'empire':
      const baseUnit = baseUnits.find(u=>u.defaultName===capitalGuards.empire);
      return {
          ...baseUnit,
          uid: Game.createId(),
          name: baseUnit.defaultName,
          partyId: null,
          cityId: null,
          capitalId: null,
          isLider: false,
          race,
          position: [1,0],
          battlesWon: 0,
      }
    default:
      break;
  } 
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
        switch (selectObj.type) {
          case 'capitalCity':
            const capitalCity = getState().game.capitalCities[selectObj.idx];
            if (capitalCity) {
              isCanPut = isCanPutBuild(fieldMatrix, [point[0] - 2, point[1] - 2], [5, 5]);
            }
            break;
          case 'city':
            const city = getState().game.cities[selectObj.idx];
            if (city) {
              isCanPut = isCanPutBuild(fieldMatrix, [point[0] - 2, point[1] - 1], [4, 4]);
            }
            break;

          default:
            break;
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
      const editorMod = getState().game.editorMod;
      const selectObj = getState().game.selectObj;
      if(editorMod==='properties'){
        return {point,isCanPut:false};
      }
      let isCanPut = true;
      if (selectObj) {
        const fieldMatrix = getState().game.fieldMatrix;
        if(selectObj.type==='capitalCity'){
          const city = getState().game.capitalCities[selectObj.idx];
          if (city) {
            isCanPut = isCanPutBuild(fieldMatrix, [point[0] - 2, point[1] - 2], [5, 5]);
          }
        }else if(selectObj.type==='city'){
          const city = getState().game.cities[selectObj.idx];
          if (city) {
            isCanPut = isCanPutBuild(fieldMatrix, [point[0] - 2, point[1] - 1], [4, 4]);
          }
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

type TActionAddCapital = {
  capital:ICapitalCity,
  unit:IUnit
}

export const actionAddCapitalCity = createAsyncThunk<TActionAddCapital, TCapitalRace, { state: AppState, rejectWithValue: any }>(
  'game/actonAddCapitalCity',
  async (race, { getState, rejectWithValue }) => {
    try {

      const fieldMatrix = getState().game.fieldMatrix;

      let iX = 1;
      let jY = 1;

      const isCanPut = isCanPutBuild(fieldMatrix, [iX, jY], [5, 5]);

      const capitalCity: ICapitalCity = {
        matrixPoint: [iX, jY],
        prevMatrixPoint: [iX, jY],
        matrix: [5, 5],
        center: [2, 2],
        type: 'capitalCity',
        id: Game.createId(),
        cityName: 'Runia',
        lordName: 'Lord',
        lordType: 'mage',
        race,
        squadOut: null,
        squadIn: [],
        isCanPut,
        isUp: isCanPut ? false : true,
        manaLife: 0,
        manaInfernal: 0,
        manaDeath: 0,
        manaRune: 0,
        manaForest: 0,
        gold: 0
      }

      const unit = getCapitalGuard(race);
      capitalCity.squadIn.push(unit.uid);

      return {
        capital:capitalCity,
        unit
      };
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);

export const actionAddCity = createAsyncThunk<ICity, undefined, { state: AppState, rejectWithValue: any }>(
  'game/actionAddCity',
  async (_, { rejectWithValue }) => {
    try {

      let iX = 1;
      let jY = 1;

      const city: ICity = {
        owner: 'neutral',
        squadOut: null,
        matrixPoint: [iX, jY],
        prevMatrixPoint: [iX, jY],
        matrix: [4, 4],
        center:[2, 1],
        type: 'city',
        id: Game.createId(),
        squadIn: [],
        isUp: true,
        isCanPut: false,
        lvl:1,
      };

      return city;
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
  rectCell: TRectangle;
  rectField: TRectangle;
  capitalCities: ICapitalCity[];
  units: IUnit[];
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
      //console.log('rectangle = ', rectangle);
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
      storeFieldRect.halfWidth = widthField / 2;
      storeFieldRect.halfHeight = heightField / 2;

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
            typeObject: null,
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

      const capitalCities: ICapitalCity[] = [];
      const units: IUnit[] = [];
      data.race.forEach(race => {
        //console.log('add race = ', race);
        let iX = 1;
        let jY = 1;
        let isCanPut = true;
        do {
          isCanPut = isCanPutBuild(matrix, [iX, jY], [5, 5]);
          if (!isCanPut) {
            if (jY + 7 < data.size) {
              jY += 1;
            } else {
              jY = 1;
              if (iX + 7 < data.size) {
                iX += 1;
              } else {
                iX = 1;
              }
            }
          }
        } while (!isCanPut);

        const capitalCity: ICapitalCity = {
          matrixPoint: [iX, jY],
          prevMatrixPoint: [iX, jY],
          matrix: [5, 5],
          center: [2, 2],
          type: 'capitalCity',
          id: Game.createId(),
          cityName: 'Runia',
          lordName: 'Lord',
          lordType: 'mage',
          race,
          squadOut: null,
          squadIn: [],
          isCanPut,
          isUp: isCanPut ? false : true,
          manaLife: 0,
          manaInfernal: 0,
          manaDeath: 0,
          manaRune: 0,
          manaForest: 0,
          gold: 0
        }

        for (let i = capitalCity.matrixPoint[0]; i < capitalCity.matrixPoint[0] + capitalCity.matrix[0]; i++) {
          for (let j = capitalCity.matrixPoint[1]; j < capitalCity.matrixPoint[1] + capitalCity.matrix[1]; j++) {
            matrix[i][j] = {
              ...matrix[i][j],
              objId: capitalCity.id,
              typeObject: 'capitalCity',
              isBuild: true
            }
          }
        }
        const unit = getCapitalGuard(race);
        unit.capitalId = capitalCity.id;
        units.push(unit);
        capitalCity.squadIn.push(unit.uid);
        capitalCities.push(capitalCity);
      });

      return {
        matrixField: matrix,
        rectCell: storeCell,
        rectField: storeFieldRect,
        capitalCities,
        units
      };
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);

export type TDataMoveCitySquadIn = {
  unitId: string;
  toIdx: [number,number];
}

export const actionMoveCitySquadIn = createAsyncThunk<TDataMoveCitySquadIn, TDataMoveCitySquadIn, { state: AppState, rejectWithValue: any }>(
  'game/actionMoveCitySquadIn',
  async (data, { rejectWithValue }) => {
    try {
      return data;
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);

export const actionSetEditorMod = createAsyncThunk<TEditorMod, TEditorMod, { state: AppState, rejectWithValue: any }>(
  'game/actionSetEditorMod',
  async (data, { rejectWithValue }) => {
    try {
      return data;
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);

export const actionDelSelectObj = createAsyncThunk<undefined, undefined, { state: AppState, rejectWithValue: any }>(
  'game/actionDelSelectObj',
  async (_, { rejectWithValue }) => {
    try {
      return;
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);

export type TChangeCapitalProps = {
  cityName: string;
  lordName: string;
  lordType: TLordType;
  manaLife: number;
  manaInfernal: number;
  manaDeath: number;
  manaRune: number;
  manaForest: number;
  gold: number;
}

export const actionChangeCapitalProps = createAsyncThunk<TChangeCapitalProps, TChangeCapitalProps, { state: AppState, rejectWithValue: any }>(
  'game/actionChangeCapitalProps',
  async (data, { rejectWithValue }) => {
    try {
      return data;
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);

export type TAddUnitToCapital = {
  capitalId: string;
  position: [number,number];
  unit: IBaseUnit;
};

export const actionAddUnitToCapital = createAsyncThunk<TAddUnitToCapital, TAddUnitToCapital, { state: AppState, rejectWithValue: any }>(
  'game/actionAddUnitToCapital',
  async (data, { rejectWithValue }) => {
    try {
      return data;
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable' });
    }
  }
);