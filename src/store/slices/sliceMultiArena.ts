import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TLordType, TRace } from './sliceGame';

type InitState = {
    myRace: TRace,
    enemyRace: TRace,
    myLord: TLordType,
    enemyLord: TLordType,
    myLordName: string,
    enemyLordName: string,
    isInited: boolean,
}

const initialState:InitState = {
    myRace:'clans',
    enemyRace:'clans',
    myLord: 'guildmaster',
    enemyLord: 'guildmaster',
    myLordName: '',
    enemyLordName: '',
    isInited: false
};

const sliceMultiArena = createSlice({
    name: 'sliceMultiArena',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
       
    }
});

export const {

} = sliceMultiArena.actions;

export default sliceMultiArena;