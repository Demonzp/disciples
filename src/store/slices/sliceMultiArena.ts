import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TLordType, TRace } from './sliceGame';

type InitState = {
    users: number,
    queue: number,
    version: string,
    myRace: TRace,
    enemyRace: TRace,
    myLord: TLordType,
    enemyLord: TLordType,
    myLordName: string,
    enemyLordName: string,
    isInited: boolean,
    isSocketConnect: boolean,
}

const initialState:InitState = {
    users: 1,
    queue: 0,
    version: '10.9.9.9',
    myRace:'clans',
    enemyRace:'clans',
    myLord: 'guildmaster',
    enemyLord: 'guildmaster',
    myLordName: '',
    enemyLordName: '',
    isInited: false,
    isSocketConnect: false,
};

const sliceMultiArena = createSlice({
    name: 'sliceMultiArena',
    initialState,
    reducers: {
        setIsConnect(state, action:PayloadAction<boolean>){
            state.isSocketConnect = action.payload;
        },
    },
    extraReducers: (builder) => {
       
    }
});

export const {
    setIsConnect
} = sliceMultiArena.actions;

export default sliceMultiArena;