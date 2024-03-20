import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setScene } from './sliceGame';
import { actionLogouded } from 'store/actions/actionsMultiplayer';

type TMenuType ='main'|'multiplayer-signin'|'multiplayer'|'single-player'|'connect-arena'|'arena-menu';

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
        builder.addCase(actionLogouded.fulfilled, (state, { payload }) => {
            //console.log(payload);
            state.menuType = 'multiplayer-signin';
        });
    }
});

export const {
    setStatusScene,
    setMenuType
} = sliceMenuGame.actions;

export default sliceMenuGame;