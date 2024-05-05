import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUnit, TLordType, TPosition, TRace } from './sliceGame';
import { pickHero, updateUnitsRes } from 'store/actions/actionArena';

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
    heroes: IUnit[];
    enemyRace: TRace;
}

type InitState = {
    online: number,
    units: IUnit[],
    heroes: IUnit[];
    queue: number,
    version: string,
    myRace: TRace,
    enemyRace: TRace,
    myLord: TLordType,
    enemyLord: TLordType,
    myLordName: string,
    enemyLordName: string,
    isShowHireHero: boolean,
    isInited: boolean,
    isSocketConnect: boolean,
    isUpUnit: boolean,
    selectCell: TPosition,
}

const initialState: InitState = {
    online: 0,
    units: [],
    heroes: [],
    queue: 0,
    version: '',
    myRace: 'clans',
    enemyRace: 'clans',
    myLord: 'guildmaster',
    enemyLord: 'guildmaster',
    myLordName: '',
    enemyLordName: '',
    isInited: false,
    isShowHireHero: false,
    isSocketConnect: false,
    isUpUnit: false,
    selectCell: [0, 0],
};

const sliceMultiArena = createSlice({
    name: 'sliceMultiArena',
    initialState,
    reducers: {
        setInitScene(state, action: PayloadAction<boolean>) {
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
            state.heroes = action.payload.heroes;
            state.enemyRace = action.payload.enemyRace;
            state.units = action.payload.units;
        },
        setIsUpUnit(state, action: PayloadAction<boolean>) {
            state.isUpUnit = action.payload;
        },
        setIsShowHireHero(state, action: PayloadAction<TPosition|undefined>) {
            if (action.payload) {
                state.isShowHireHero = true;
                state.selectCell = action.payload;
            } else {
                state.isShowHireHero = false;
            }

        },
    },
    extraReducers: (builder) => {
        builder.addCase(pickHero.pending, (state) => {
            state.isShowHireHero = false;
        });

        builder.addCase(updateUnitsRes.pending, (state) => {

        });

        builder.addCase(updateUnitsRes.fulfilled, (state, { payload }) => {
            //const newUnits:IUnit[] = [...state.units];
            state.units = payload;
            // for (let i = 0; i < state.units.length; i++) {
            //     const unit = state.units[i];
            //     const newUnit = payload.find(u => u.uid === unit.uid);
            //     if (newUnit) {
            //         state.units[i] = newUnit;
            //     }
            // }
        });

        builder.addCase(updateUnitsRes.rejected, (state, { payload }) => {

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
    setIsShowHireHero,
} = sliceMultiArena.actions;

export default sliceMultiArena;