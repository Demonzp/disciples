import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCapitalRace } from 'utils/game/objects/CapitalCity';
import { TPointMatrix } from 'utils/game/scenes/mainScene';
import { TPoint } from 'utils/gameLib/Game';

export type TFieldMatrix = (TPoint[])[];

export interface IBaseGameObj{
    matrixPoint: TPointMatrix;
    matrix: [number, number];
    id: string;
    race: TCapitalRace;
    squadIn: string[];
}

export interface ICapitalCity extends IBaseGameObj{
    squadOut: string[];
}

export interface IStateGame {
    pointerMatrix: TPointMatrix;
    capitalCities: ICapitalCity[];
    fieldMatrix: TFieldMatrix;
    selectObj: IBaseGameObj|null;
}

const initialState: IStateGame = {
    pointerMatrix: [0,0],
    capitalCities: [],
    fieldMatrix: [],
    selectObj:null,
};

const sliceGame = createSlice({
    name: 'selectTable',
    initialState,
    reducers: {
        selectObj(state, action:PayloadAction<string>){
            state
        },

        setFieldMatrix(state, action:PayloadAction<TFieldMatrix>){
            state.fieldMatrix = action.payload;
        },

        setPointerMatrix(state, action:PayloadAction<TPointMatrix>){
            state.pointerMatrix = action.payload;
        },

        addCapitalCity(state, action:PayloadAction<ICapitalCity>){
            console.log('add capitalCity to state');
            state.capitalCities.push(action.payload);
        }
    },
    extraReducers: (builder) => {

    }
});

export const {
    setFieldMatrix,
    setPointerMatrix,
    addCapitalCity,
} = sliceGame.actions;

export default sliceGame;