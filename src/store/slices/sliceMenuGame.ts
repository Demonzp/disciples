import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setScene } from './sliceGame';
import { actionLogouded, googleLogin } from 'store/actions/actionsMultiplayer';

type TMenuType ='main'|'multiplayer-signin'|'multiplayer'|'single-player'|'connect-arena'|'arena-menu'|'queue-arena';

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
            state.menuType = 'main';
        });

        builder.addCase(googleLogin.fulfilled, (state, { payload }) => {
            //console.log('actionLogouded.fulfilled');
            //state.menuType = 'multiplayer';
        });
    }
});

export const {
    setStatusScene,
    setMenuType
} = sliceMenuGame.actions;

export default sliceMenuGame;