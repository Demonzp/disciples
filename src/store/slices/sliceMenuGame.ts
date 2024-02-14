import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TMenuType = 'main'|'multiplayer'|'single-player';

type InitState = {
    menuType:TMenuType
}

const initialState:InitState = {
    menuType:'main',
};

const sliceMenuGame = createSlice({
    name: 'sliceMenuGame',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {

    }
});

export const {
} = sliceMenuGame.actions;

export default sliceMenuGame;