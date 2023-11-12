import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPartySide } from './sliceGame';

type InitState = {
    isOpen:boolean;
}

const initialState:InitState = {
    isOpen:false,
};

const sliceCityProps = createSlice({
    name: 'sliceCityProps',
    initialState,
    reducers: {
        openCityProps(state){
            state.isOpen = true;
        },
        closeCityProps(start){
            start.isOpen = false;
        }
    },
    extraReducers: (builder) => {

    }
});

export const {
    openCityProps,
    closeCityProps
} = sliceCityProps.actions;

export default sliceCityProps;