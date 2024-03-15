import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { googleLogin } from 'store/actions/actionsMultiplayer';

type InitState = {
    isMultiplayer: boolean;
    token: any;
    user: any;
    errors: string[];
    isLogin: boolean;
    isLogined: boolean;
}

const initialState: InitState = {
    isMultiplayer: false,
    user: null,
    token: null,
    errors: [],
    isLogin: null,
    isLogined: false
};

const sliceMultiplayer = createSlice({
    name: 'sliceMultiplayer',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(googleLogin.pending, (state) => {
            state.errors = [];
        });

        builder.addCase(googleLogin.fulfilled, (state, { payload }) => {
            console.log(payload);
            state.token = payload;
        });

        builder.addCase(googleLogin.rejected, (state, { payload }) => {

            //const payload = action.payload as ICustomError;
            state.errors.push(payload as string);
        });
    }
});

export const {

} = sliceMultiplayer.actions;

export default sliceMultiplayer;