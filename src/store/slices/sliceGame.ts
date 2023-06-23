import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCapitalRace } from 'utils/game/objects/CapitalCity';
import { TPointMatrix } from 'utils/game/scenes/mainScene';

export type TCapitalCitie = {
    matrixPoint: TPointMatrix;
    id: string;
    race: TCapitalRace;
    squadOut: string[];
    squadIn: string[];
};

export interface IStateGame {
    pointerMatrix: TPointMatrix;
    capitalCities: TCapitalCitie[];
}

const initialState: IStateGame = {
    pointerMatrix: [0,0],
    capitalCities: []
};

const sliceGame = createSlice({
    name: 'selectTable',
    initialState,
    reducers: {
        setPointerMatrix(state, action:PayloadAction<TPointMatrix>){
            state.pointerMatrix = action.payload;
        },

        addCapitalCity(state, action:PayloadAction<TCapitalCitie>){
            console.log('add capitalCity to state');
            state.capitalCities.push(action.payload);
        }
    },
    extraReducers: (builder) => {

    }
});

export const {
    setPointerMatrix,
    addCapitalCity,
} = sliceGame.actions;

export default sliceGame;