import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPointMatrix } from 'utils/game/scenes/mainScene';


export interface IStateGame {
    pointerMatrix: TPointMatrix;
}

const initialState: IStateGame = {
    pointerMatrix: [0,0],
};

const sliceGame = createSlice({
    name: 'selectTable',
    initialState,
    reducers: {
        setPointerMatrix(state, action:PayloadAction<TPointMatrix>){
            state.pointerMatrix = action.payload;
        },
    },
    extraReducers: (builder) => {

    }
});

export const {
    setPointerMatrix,
} = sliceGame.actions;

export default sliceGame;