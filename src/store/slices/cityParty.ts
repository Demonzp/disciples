import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPartySide } from './sliceGame';
import { actionDoubleMoveCitySquadIn, actionMoveCitySquadIn, actionMoveCitySquadInOut, actionMoveTwoCellCitySquadIn, actionMoveTwoCellUnitOutIn } from 'store/actions/actionsGame';

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
        closeCityParty(state){
            state.isOpen = false;
        },
        upCityPortret(state, action:PayloadAction<TPartySide>){
            state.isUpPortret = true;
            state.sidePortret = action.payload;
        },
        dropCityPortret(state){
            state.isUpPortret = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actionMoveTwoCellCitySquadIn.pending, (state) => {
        });

        builder.addCase(actionMoveTwoCellCitySquadIn.fulfilled, (state, { payload }) => {
            state.isUpPortret = false;
        });

        builder.addCase(actionMoveTwoCellCitySquadIn.rejected, (state, { payload }) => {

        });

        builder.addCase(actionMoveCitySquadIn.pending, (state) => {
        });

        builder.addCase(actionMoveCitySquadIn.fulfilled, (state, { payload }) => {
            state.isUpPortret = false;
        });

        builder.addCase(actionMoveCitySquadIn.rejected, (state, { payload }) => {

        });

        builder.addCase(actionDoubleMoveCitySquadIn.pending, (state) => {
        });

        builder.addCase(actionDoubleMoveCitySquadIn.fulfilled, (state, { payload }) => {
            state.isUpPortret = false;
        });

        builder.addCase(actionDoubleMoveCitySquadIn.rejected, (state, { payload }) => {

        });

        builder.addCase(actionMoveCitySquadInOut.pending, (state) => {
        });

        builder.addCase(actionMoveCitySquadInOut.fulfilled, (state, { payload }) => {
            state.isUpPortret = false;
        });

        builder.addCase(actionMoveCitySquadInOut.rejected, (state, { payload }) => {

        });

        builder.addCase(actionMoveTwoCellUnitOutIn.pending, (state) => {
        });

        builder.addCase(actionMoveTwoCellUnitOutIn.fulfilled, (state, { payload }) => {
            state.isUpPortret = false;
        });

        builder.addCase(actionMoveTwoCellUnitOutIn.rejected, (state, { payload }) => {

        });

    }
});

export const {
    openCityParty,
    closeCityParty,
    upCityPortret,
    dropCityPortret
} = sliceCityParty.actions;

export default sliceCityParty;