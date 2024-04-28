import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUnit, TLordType, TRace } from './sliceGame';
import { unitToUnitRes } from 'store/actions/actionArena';

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

const initialState: InitState = {
    online: 0,
    units: [],
    queue: 0,
    version: '',
    myRace: 'clans',
    enemyRace: 'clans',
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
        setInitScene(state, action:PayloadAction<boolean>){
            state.isInited = action.payload;
        },
        setServerInfo(state, action: PayloadAction<TServerInfo>) {
            state.online = action.payload.online;
            state.queue = action.payload.queue;
            state.version = action.payload.version;
        },
        setOnlineInfo(state, action: PayloadAction<TOnlineInfo>) {
            state.online = action.payload.online;
            state.queue = action.payload.queue;
        },
        setIsConnect(state, action: PayloadAction<boolean>) {
            state.isSocketConnect = action.payload;
        },
        initState(state, action: PayloadAction<TInitState>) {
            state.myRace = action.payload.playerRace;
            state.enemyRace = action.payload.enemyRace;
            state.units = action.payload.units;
        },
        setIsUpUnit(state, action: PayloadAction<boolean>) {
            state.isUpUnit = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(unitToUnitRes.pending, (state) => {

        });

        builder.addCase(unitToUnitRes.fulfilled, (state, { payload }) => {
            //const newUnits:IUnit[] = [...state.units];
            for (let i = 0; i < state.units.length; i++) {
                const unit = state.units[i];
                const newUnit = payload.find(u => u.uid===unit.uid);
                if (newUnit) {
                    state.units[i] = newUnit;
                }
            }
        });

        builder.addCase(unitToUnitRes.rejected, (state, { payload }) => {

        });
    }
});

export const {
    setIsConnect,
    setServerInfo,
    setOnlineInfo,
    initState,
    setIsUpUnit,
    setInitScene,
} = sliceMultiArena.actions;

export default sliceMultiArena;