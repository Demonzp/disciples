import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUnit, TLordType, TRace } from './sliceGame';

export type TOnlineInfo = {
    online: number,
    queue: number,
}

export type TServerInfo = {
    online: number,
    queue: number,
    version: string,
}

export type TInitState = {
    playerRace: TRace;
    units: IUnit[];
    enemyRace: TRace;
}

type InitState = {
    online: number,
    units: IUnit[],
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
    isUpUnit: boolean,
}

const initialState:InitState = {
    online: 0,
    units:[],
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
    isUpUnit: false,
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
        initState(state, action:PayloadAction<TInitState>){
            state.myRace = action.payload.playerRace;
            state.enemyRace = action.payload.enemyRace;
            state.units = action.payload.units;
        },
        setIsUpUnit(state, action:PayloadAction<boolean>){
            state.isUpUnit = action.payload;
        }
    },
    extraReducers: (builder) => {

    }
});

export const {
    setIsConnect,
    setServerInfo,
    setOnlineInfo,
    initState,
    setIsUpUnit,
} = sliceMultiArena.actions;

export default sliceMultiArena;