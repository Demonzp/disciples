import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPartySide } from './sliceGame';

type InitState = {
    isOpen:boolean;
    isUpPortret: boolean;
    sidePortret: TPartySide;
    isOpenModal: boolean;
}

const initialState:InitState = {
    isOpen:false,
    isOpenModal: false,
    isUpPortret:false,
    sidePortret:'left'
};

const sliceCityParty = createSlice({
    name: 'sliceCityParty',
    initialState,
    reducers: {
        openCityParty(state){
            state.isOpen = true;
        },
        closeCityParty(start){
            start.isOpen = false;
        }
    },
    extraReducers: (builder) => {

    }
});

export const {
    openCityParty,
    closeCityParty
} = sliceCityParty.actions;

export default sliceCityParty;