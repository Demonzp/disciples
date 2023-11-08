import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPartySide } from './sliceGame';

type InitState = {
    isOpen:boolean;
    isUpPortret: boolean;
    sidePortret: TPartySide;
}

const initialState:InitState = {
    isOpen:false,
    isUpPortret:false,
    sidePortret:'left'
};

const sliceCityParty = createSlice({
    name: 'sliceCityParty',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    }
});

export const {
} = sliceCityParty.actions;

export default sliceCityParty;