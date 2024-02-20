import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setScene } from './sliceGame';

type TMenuType ='main'|'multiplayer'|'single-player'|'arena-menu';

type InitState = {
    menuType:TMenuType,
    isSceneReady: boolean,
    isLogin: boolean,
}

const initialState:InitState = {
    menuType:'main',
    isSceneReady: false,
    isLogin: false,
};

const sliceMenuGame = createSlice({
    name: 'sliceMenuGame',
    initialState,
    reducers: {
        setMenuType(state, action:PayloadAction<TMenuType>){
            state.menuType = action.payload;
        },
        setStatusScene(state, action:PayloadAction<boolean>){
            state.isSceneReady = action.payload;
        },
    },
    extraReducers: (builder) => {
       
    }
});

export const {
    setStatusScene,
    setMenuType
} = sliceMenuGame.actions;

export default sliceMenuGame;