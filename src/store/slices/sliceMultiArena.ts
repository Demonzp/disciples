import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TLordType, TRace } from './sliceGame';

export type TOnlineInfo = {
    online: number,
    queue: number,
}

export type TServerInfo = {
    online: number,
    queue: number,
    version: string,
}

type InitState = {
    online: number,
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
    online: 0,
    queue: 0,
    version: '',
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
        setServerInfo(state, action:PayloadAction<TServerInfo>){
            state.online = action.payload.online;
            state.queue = action.payload.queue;
            state.version = action.payload.version;
        },
        setOnlineInfo(state, action:PayloadAction<TOnlineInfo>){
            state.online = action.payload.online;
            state.queue = action.payload.queue;
        },
        setIsConnect(state, action:PayloadAction<boolean>){
            state.isSocketConnect = action.payload;
        },
    },
    extraReducers: (builder) => {
       
    }
});

export const {
    setIsConnect,
    setServerInfo,
    setOnlineInfo
} = sliceMultiArena.actions;

export default sliceMultiArena;