import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUnit, TLordType, TPosition, TRace, TSourceDamage } from './sliceGame';
import { actionHeroUpSkill, pickHero, TUpdateUnitsStats, updateUnitsRes, updateUnitsStatsRes } from 'store/actions/actionArena';

export type TModifier = 'heroSkills' | 'Artifacts';

export type THeroSkill = {
    id: string,
    type: TModifier,
    level: number,
    name: string,
    discription: string,
    value: any,
}

export type TOnlineInfo = {
    online: number,
    queue: number,
}

export type TServerInfo = {
    online: number,
    queue: number,
    version: string,
}

export type TStatsModifire = {
    uid: string,
    level: number,
    hitPoints: number,
    regenerate: number,
    chancesHit: number[],
    damage: number[],
    damageName: string[],
    sourceDamage: TSourceDamage[],
    heal: number,
    initiative: number,
    movePoints: number,
    immunities: TSourceDamage[],
    wards: TSourceDamage[],
    useWards: TSourceDamage[],
    armor: number
};

export type TInitState = {
    playerRace: TRace;
    units: IUnit[];
    heroes: IUnit[];
    unitsStatsModifier: TStatsModifire[];
    enemyRace: TRace;
    heroSkills: THeroSkill[];
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
    isShowHeroUp: boolean,
    isInited: boolean,
    isSocketConnect: boolean,
    isUpUnit: boolean,
    isHasHero: boolean,
    isLoad: boolean,
    selectCell: TPosition,
    infoUnitUid: string,
    isInfoUnitOpen: boolean,
    heroSkills: THeroSkill[],
    unitsStatsModifier: TStatsModifire[];
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
    isShowHeroUp: false,
    isSocketConnect: false,
    isLoad: false,
    isUpUnit: false,
    isHasHero: false,
    isInfoUnitOpen: false,
    selectCell: [0, 0],
    infoUnitUid: '',
    heroSkills: [],
    unitsStatsModifier: [],
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
            state.heroSkills = action.payload.heroSkills;
            state.unitsStatsModifier = action.payload.unitsStatsModifier;
            if (action.payload.units.find(u => u.isHero)) {
                state.isHasHero = true;
            } else {
                state.isHasHero = false;
            }
        },
        setIsUpUnit(state, action: PayloadAction<boolean>) {
            state.isUpUnit = action.payload;
        },
        setIsShowHireHero(state, action: PayloadAction<TPosition | undefined>) {
            if (action.payload) {
                state.isShowHireHero = true;
                state.selectCell = action.payload;
            } else {
                state.isShowHireHero = false;
            }

        },

        setIsMenuUpHero(state, action: PayloadAction<boolean>) {
            state.isShowHeroUp = action.payload;
        },

        heroUpSkill(state, action: PayloadAction<TUpdateUnitsStats>) {
            state.isLoad = false;
            const hero = action.payload.units.find(u => u.isHero);
            if (hero.levelsUp > 0) {
                state.isShowHeroUp = true;
            }
            state.unitsStatsModifier = action.payload.unitsStatsModifier;
            state.units = action.payload.units;
        },

        openInfoUnit(state, action: PayloadAction<string>) {
            state.infoUnitUid = action.payload;
            state.isInfoUnitOpen = true;
        },

        closeInfoUnit(state) {
            //state.infoUnitId = action.payload;
            state.isInfoUnitOpen = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actionHeroUpSkill.pending, (state) => {
            state.isShowHeroUp = false;
            state.isLoad = true;
        });

        builder.addCase(pickHero.pending, (state) => {
            state.isShowHireHero = false;
        });

        builder.addCase(updateUnitsStatsRes.fulfilled, (state, { payload }) => {
            state.units = payload.units;
            state.unitsStatsModifier = payload.unitsStatsModifier;
            if (payload.units.find(u => u.isHero)) {
                state.isHasHero = true;
            } else {
                state.isHasHero = false;
            }
        });

        builder.addCase(updateUnitsRes.pending, (state) => {

        });

        builder.addCase(updateUnitsRes.fulfilled, (state, { payload }) => {
            state.units = payload;
            if (payload.find(u => u.isHero)) {
                state.isHasHero = true;
            } else {
                state.isHasHero = false;
            }
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
    setIsMenuUpHero,
    heroUpSkill,
    openInfoUnit,
    closeInfoUnit,
} = sliceMultiArena.actions;

export default sliceMultiArena;