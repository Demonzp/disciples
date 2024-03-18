import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { actionLogouded, googleLogin } from 'store/actions/actionsMultiplayer';

export type TUser = {
    id: string;
    uid: string;
    firstName: string;
    secondName: string;
    email: string;
    picture: string;
    manaClay: number;
}

type InitState = {
    isMultiplayer: boolean;
    token: string;
    user: TUser | null;
    errors: string[];
    isLogin: boolean;
    isLogined: boolean;
    isLogout: boolean;
}

const initialState: InitState = {
    isMultiplayer: false,
    user: null,
    token: null,
    errors: [],
    isLogin: null,
    isLogined: false,
    isLogout: false,
};

const sliceMultiplayer = createSlice({
    name: 'sliceMultiplayer',
    initialState,
    reducers: {
        setLogined(state, action: PayloadAction<boolean>) {
            state.isLogined = action.payload;
        },

        setLogout(state, action: PayloadAction<boolean>) {
            console.log('setLogout = ', action.payload);
            state.isLogout = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(googleLogin.pending, (state) => {
            state.isLogined = true;
            state.errors = [];
        });

        builder.addCase(googleLogin.fulfilled, (state, { payload }) => {
            console.log(payload);
            state.isLogin = true;
            state.isLogined = false;
            state.token = payload.token;
            state.user = payload.user;
        });

        builder.addCase(googleLogin.rejected, (state, { payload }) => {
            state.isLogin = false;
            state.isLogined = false;
            //const payload = action.payload as ICustomError;
            state.errors.push(payload as string);
        });

        builder.addCase(actionLogouded.fulfilled, (state, { payload }) => {
            console.log('actionLogouded.fulfilled');
            state.isLogin = false;
            state.isLogined = false;
            state.isLogout = false;
            state.token = '';
            state.user = null;
        });
    }
});

export const {
    setLogined,
    setLogout,
} = sliceMultiplayer.actions;

export default sliceMultiplayer;