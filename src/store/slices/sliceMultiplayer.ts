import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitState = {
    isMultiplayer:boolean;
    user:any;
    isLogin:boolean;
    isLogined:boolean;
}

const initialState:InitState = {
    isMultiplayer:false,
    user:null,
    isLogin:null,
    isLogined:false
};

const sliceMultiplayer = createSlice({
    name: 'sliceMultiplayer',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
       
    }
});

export const {

} = sliceMultiplayer.actions;

export default sliceMultiplayer;