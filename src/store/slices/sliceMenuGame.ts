import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setScene } from './sliceGame';

type TMenuType ='main'|'multiplayer'|'single-player';

type InitState = {
    menuType:TMenuType,
    isSceneReady: boolean,
}

const initialState:InitState = {
    menuType:'main',
    isSceneReady: false,
};

const sliceMenuGame = createSlice({
    name: 'sliceMenuGame',
    initialState,
    reducers: {
        setStatusScene(state, action:PayloadAction<boolean>){
            state.isSceneReady = action.payload;
        },
    },
    extraReducers: (builder) => {
       
    }
});

export const {
    setStatusScene
} = sliceMenuGame.actions;

export default sliceMenuGame;