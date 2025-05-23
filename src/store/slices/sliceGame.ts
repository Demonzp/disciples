import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { actionAddCapitalCity, actionAddCity, actionAddLeaderToPartyCity, actionAddUnitToCapital, actionAddUnitToCity, actionChangeCapitalProps, actionChangeCityProps, actionDelSelectObj, actionDoubleMoveCitySquadIn, actionInitNewMap, actionMoveCitySquadIn, actionMoveCitySquadInOut, actionMoveTwoCellCitySquadIn, actionMoveTwoCellUnitInOut, actionMoveTwoCellUnitOutIn, actionMoveUnitInOut, actionMoveUnitOutIn, actionPointerMove, actionPointerUp, actionSetEditorMod } from 'store/actions/actionsGame';
import { TPointMatrix } from 'utils/game/scenes/editorScene';

export const portretBigData:{[name: string]: number} = {
    'pegasus':0,
    'ranger':1,
    'archmage':2,
    'myzrael':5,
    'duke':6,
    'counselor':7,
    'arch-devil':8,
    'ashkael':11,
};

export const portretPartyOneData:{[name: string]: number} = {
    'pegasus':0,
    'archmage':1,
    'ranger':3,
    'myzrael':2,
    'squire':6,
    'archer':7,
    'apprentice':8,
    'acolyt':9,
    'knight':10,
    'witch-hunter':11,
    'marksman':12,
    'mage':13,
    'priest':14,
    'cleric':15,
    'man-at-arms':16,
    'titan':2,
    'gargoyle':0,
    'marble-gargoyle':5,
    'demon':4,
    'fiend':3,
    'devil':1,
    'duke':0,
    'counselor':1,
    'arch-devil':2,
    'baroness':3,
    'thief-legions':4,
    'ashkael':5,
    'cultist':6,
    'possessed':7,
    'witch':8,
    'sorcerer':9,
    'berzerker':10
};

export const baseUnits: IBaseUnit[] = [
    {
        id: '0',
        level: 1,
        defaultName: 'Myzrael',
        isCapitalGuard: true,
        isCanLeader: true,
        isHero: false,
        fraction: 'empire',
        icon: 'myzrael',
        numCells: 1,
        hitPoints: 1200,
        defaultHp: 1200,
        damageName: 'Holy Wrath',
        chancesHit: 80,
        damage: 250,
        heal:0,
        sourceDamage: 'life',
        duration: 'instantaneous',
        effect: 'damage',
        extraEffect: [],
        initiative: 80,
        leadership: 3,
        needExperience: 9000,
        movePoints: 20,
        discription: '',
        armor: 40,
        modifiers: [],
        modifiersDefalut: [],
        immunities: [],
        wards: [],
        numTargets: 6,
        numAttaks: 1,
        priorityColumn: 3,
    },
    {
        id: '1',
        level: 1,
        defaultName: 'Archmage',
        isCanLeader: true,
        isCapitalGuard: false,
        isHero: true,
        fraction: 'empire',
        icon: 'archmage',
        numCells: 1,
        hitPoints: 65,
        defaultHp: 65,
        damageName: 'Lightning',
        chancesHit: 70,
        damage: 16,
        heal:0,
        sourceDamage: 'air',
        duration: 'instantaneous',
        effect: 'damage',
        extraEffect: [],
        initiative: 30,
        leadership: 3,
        needExperience: 150,
        movePoints: 20,
        discription: '',
        armor: 0,
        modifiers: [],
        modifiersDefalut: [],
        immunities: [],
        wards: [],
        numTargets: 6,
        numAttaks: 1,
        priorityColumn: 3
    },
    {
        id: '2',
        level: 1,
        defaultName: 'Pegasus Knight',
        isCapitalGuard: false,
        isCanLeader: true,
        isHero: true,
        fraction: 'empire',
        icon: 'pegasus',
        numCells: 1,
        hitPoints: 150,
        defaultHp: 150,
        damageName: 'Long Sword',
        chancesHit: 80,
        damage: 23,
        duration: 'instantaneous',
        heal:0,
        sourceDamage: 'weapon',
        effect: 'damage',
        extraEffect: [],
        initiative: 40,
        leadership: 3,
        needExperience: 150,
        movePoints: 20,
        discription: '',
        armor:5,
        modifiers: [],
        modifiersDefalut: [],
        immunities: [],
        wards: [],
        numTargets: 1,
        numAttaks: 1,
        priorityColumn: 1,
    },
    {
        id: '3',
        level: 1,
        defaultName: 'Squire',
        isCapitalGuard: false,
        isCanLeader: true,
        isHero: false,
        fraction: 'empire',
        icon: 'squire',
        numCells: 1,
        hitPoints: 110,
        defaultHp: 110,
        damageName: 'Sword',
        chancesHit: 80,
        damage: 25,
        heal:0,
        duration: 'instantaneous',
        sourceDamage: 'weapon',
        effect: 'damage',
        extraEffect: [],
        initiative: 40,
        leadership: 2,
        needExperience: 75,
        movePoints: 20,
        discription: '',
        armor:0,
        modifiers: [],
        modifiersDefalut: [],
        immunities: [],
        wards: [],
        numTargets: 1,
        numAttaks: 1,
        priorityColumn: 1
    },
    {
        id: '4',
        level: 1,
        defaultName: 'Archer',
        isCapitalGuard: false,
        isCanLeader: true,
        isHero: false,
        fraction: 'empire',
        icon: 'archer',
        numCells: 1,
        hitPoints: 50,
        defaultHp: 50,
        damageName: 'Arrow',
        chancesHit: 70,
        damage: 25,
        heal:0,
        sourceDamage: 'weapon',
        duration: 'instantaneous',
        effect: 'damage',
        extraEffect: [],
        initiative: 50,
        leadership: 2,
        needExperience: 70,
        movePoints: 20,
        discription: '',
        armor:0,
        modifiers: [],
        modifiersDefalut: [],
        immunities: [],
        wards: [],
        numTargets: 1,
        numAttaks: 1,
        priorityColumn: 1
    },
    {
        id: '5',
        level: 1,
        defaultName: 'Apprentice',
        isCapitalGuard: false,
        isCanLeader: true,
        isHero: false,
        fraction: 'empire',
        icon: 'apprentice',
        numCells: 1,
        hitPoints: 50,
        defaultHp: 50,
        damageName: 'Lightning',
        chancesHit: 70,
        damage: 15,
        heal:0,
        sourceDamage: 'air',
        duration: 'instantaneous',
        effect: 'damage',
        extraEffect: [],
        initiative: 30,
        leadership: 2,
        needExperience: 70,
        movePoints: 20,
        discription: '',
        armor:0,
        modifiers: [],
        modifiersDefalut: [],
        immunities: [],
        wards: [],
        numTargets: 6,
        numAttaks: 1,
        priorityColumn: 3
    },
    {
        id: '6',
        level: 1,
        defaultName: 'Acolyt',
        isCapitalGuard: false,
        isCanLeader: true,
        isHero: false,
        fraction: 'empire',
        icon: 'acolyt',
        numCells: 1,
        hitPoints: 50,
        defaultHp: 50,
        damageName: 'Healing',
        chancesHit: 100,
        damage: 0,
        heal: 22,
        sourceDamage: 'life',
        duration: 'instantaneous',
        effect: 'damage',
        extraEffect: [],
        initiative: 10,
        leadership: 2,
        needExperience: 70,
        movePoints: 20,
        discription: '',
        armor:0,
        modifiers: [],
        modifiersDefalut: [],
        immunities: [],
        wards: [],
        numTargets: 6,
        numAttaks: 1,
        priorityColumn: 3
    },
    {
        id: '7',
        level: 1,
        defaultName: 'Titan',
        isCapitalGuard: false,
        isCanLeader: true,
        isHero: false,
        fraction: 'empire',
        icon: 'titan',
        numCells: 2,
        hitPoints: 250,
        defaultHp: 250,
        damageName: 'Smash',
        chancesHit: 80,
        damage: 55,
        heal: 0,
        sourceDamage: 'weapon',
        duration: 'instantaneous',
        effect: 'damage',
        extraEffect: [],
        initiative: 40,
        leadership: 2,
        needExperience: 400,
        movePoints: 20,
        discription: '',
        armor:0,
        modifiers: [],
        modifiersDefalut: [],
        immunities: [],
        wards: [],
        numTargets: 1,
        numAttaks: 1,
        priorityColumn: 1
    },
    {
        id: '8',
        level: 1,
        defaultName: 'Gargoyle',
        isCapitalGuard: false,
        isCanLeader: true,
        isHero: false,
        fraction: 'empire',
        icon: 'gargoyle',
        numCells: 2,
        hitPoints: 90,
        defaultHp: 90,
        damageName: 'Rock Shards',
        chancesHit: 80,
        damage: 40,
        heal: 0,
        sourceDamage: 'earth',
        duration: 'instantaneous',
        effect: 'damage',
        extraEffect: [],
        initiative: 55,
        leadership: 2,
        needExperience: 400,
        movePoints: 20,
        discription: '',
        armor:20,
        modifiers: [],
        modifiersDefalut: [],
        immunities: [],
        wards: [],
        numTargets: 1,
        numAttaks: 1,
        priorityColumn: 1
    },
    {
        id: '28',
        level: 1,
        defaultName: 'Duke',
        isCapitalGuard: false,
        isCanLeader: true,
        isHero: true,
        fraction: 'legions',
        icon: 'duke',
        numCells: 1,
        hitPoints: 150,
        defaultHp: 150,
        damageName: 'Infernal Sword',
        duration: 'instantaneous',
        chancesHit: 80,
        damage: 18,
        effect: 'damage',
        extraEffect: [],
        modifiers: [],
        modifiersDefalut: [],
        heal: 0,
        sourceDamage: 'weapon',
        initiative: 40,
        leadership: 3,
        needExperience: 150,
        movePoints: 20,
        discription: '',
        numTargets: 1,
        numAttaks:2,
        priorityColumn:1,
        immunities: ['fire'],
        wards: ['water','earth','mind'],
        armor:0
    }
];

export type TCapitalGuard = 'Myzrael';

export const capitalGuards = {
    empire: 'Myzrael'
};

export type TSourceDamage = 'weapon' | 'air' | 'life' | 'death' | 'fire' | 'water' | 'earth' | 'mind';

export type TFraction = 'empire' | 'legions';
export type TRace = 'empire' | 'legions' | 'clans' | 'elves' | 'undead' | 'dragons' | 'greenskins';
export const arrGlobalRaces = (): TRace[]=>{
    return [
        'empire', 
        'legions', 
        'clans',
    ];
};
export type TCapitalRace = 'empire' | 'legions' | 'clans' | 'elves' | 'undead';
export const arrRaces: TCapitalRace[] = ['empire', 'legions'];
export type TWhatScene = 'loading' | 'mainMenu' | 'mapEditorMenu' | 'mapEditor' | 'mainGameMenu';

export type TTerrain = 'neutral' | 'empire' | 'legions' | 'clans' | 'elves' | 'undead';
export type TEditorMod = 'add-race' | 'properties' | 'move' | 'add-party' | 'copy-party' | 'add-city';
export type TCell = {
    x: number,
    y: number,
    objId: string | null,
    terrain: TTerrain,
    typeObject: TObject | null,
    isBuild: boolean
}

export type TFieldMatrix = (TCell[])[];

export type TObject = 'capitalCity' | 'city' | 'squad';
export type TLordType = 'mage' | 'warrior' | 'guildmaster';
export const defaultLordTypes = (): TLordType[] => {
    return [
        'mage',
        'warrior',
        'guildmaster'
    ]
};

export type TPartySide = 'left'|'right';

export type TParty = {
    id: string;
    side: TPartySide;
};

export type TModifier = {
    id: string;
    type: 'heroSkills';
};

export type TDuration = 'instantaneous' | 'short' | 'long';

export type TEffect = 'damage'|'paralyze'|'tick'|'heal'|'polymorph';

export type TExtraEffect = {
    damage: number;
    percent: number;
    chancesHit: number;
    damageName: string;
    sourceDamage: TSourceDamage;
    effect: TEffect;
    duration: TDuration;
};

export interface IBaseUnit {
    id: string;
    level: number;
    defaultName: string;
    isCapitalGuard: boolean;
    isCanLeader: boolean;
    isHero: boolean;
    fraction: TFraction;
    icon: string;
    numCells: number;
    hitPoints: number;
    defaultHp: number;
    chancesHit: number;
    damageName: string;
    damage: number;
    effect: TEffect;
    extraEffect: TExtraEffect[];
    heal: number;
    sourceDamage: TSourceDamage;
    duration: TDuration;
    initiative: number;
    leadership: number;
    needExperience: number;
    movePoints: number;
    discription: string;
    modifiers: TModifier[];
    modifiersDefalut: TModifier[];
    immunities: TSourceDamage[];
    numTargets: number;
    numAttaks: number; 
    priorityColumn: number;
    wards: TSourceDamage[];
    armor: number;
};

export type TPosition = [number,number];

export interface IUnit extends IBaseUnit {
    uid: string;
    name: string;
    partyId: string|null;
    cityId: string|null;
    capitalId: string|null;
    position: TPosition;
    isLeader: boolean;
    race: TCapitalRace;
    battlesWon: number;
    isLevelUp: boolean;
    experience: number;
    levelsUp: number;
};

export type TSelectObj = {
    id: string;
    type: TObject;
    idx: number;
};

export interface IBaseGameObj {
    matrixPoint: TPointMatrix;
    prevMatrixPoint: TPointMatrix;
    matrix: [number, number];
    center: [number, number];
    type: TObject;
    id: string;
    //squadIn: string[];
    isUp: boolean;
    isCanPut: boolean;
};

export interface ICapitalCity extends IBaseGameObj {
    race: TCapitalRace;
    squadOut: string|null;
    cityName: string;
    lordName: string;
    lordType: TLordType;
    manaLife: number;
    manaInfernal: number;
    manaDeath: number;
    manaRune: number;
    manaForest: number;
    gold: number;
};

export interface ICity extends IBaseGameObj {
    cityName: string;
    owner: TTerrain;
    squadOut: string|null;
    lvl: number;
};

export type TRectangle = {
    x0: number,
    x1: number,
    x2: number,
    x3: number,
    y0: number,
    y1: number,
    y2: number,
    y3: number,
    width: number,
    height: number,
    halfWidth: number,
    halfHeight: number,
};

export const defaultRect = (): TRectangle => {
    return {
        x0: 0,
        x1: 0,
        x2: 0,
        x3: 0,
        y0: 0,
        y1: 0,
        y2: 0,
        y3: 0,
        width: 0,
        height: 0,
        halfWidth: 0,
        halfHeight: 0,
    }

};

type TSceneStatus = 'notReady'|'ready';

export interface IStateGame {
    errors: any[],
    isMapInit: boolean,
    cellSize: number,
    fieldRect: TRectangle,
    cellRect: TRectangle,
    pointerMatrix: TPointMatrix;
    capitalCities: ICapitalCity[];
    cities: ICity[];
    fieldMatrix: TFieldMatrix;
    selectObj: TSelectObj | null;
    isPointerMove: boolean;
    isPointerDown: boolean;
    sceneStatus: TSceneStatus;
    scene: TWhatScene;
    editorMod: TEditorMod;
    units: IUnit[];
    parties: TParty[];
};

const initialState: IStateGame = {
    errors: [],
    isMapInit: false,
    cellRect: defaultRect(),
    fieldRect: defaultRect(),
    cellSize: 45,
    pointerMatrix: [0, 0],
    capitalCities: [],
    cities: [],
    fieldMatrix: [],
    selectObj: null,
    isPointerMove: false,
    isPointerDown: false,
    sceneStatus: 'notReady',
    scene: 'loading',
    editorMod: 'properties',
    units: [],
    parties: [],
};

const sliceGame = createSlice({
    name: 'sliceGame',
    initialState,
    reducers: {
        // selectObj(state, action:PayloadAction<string>){
        //     state.selectObj = state.capitalCities.find(c=>c.id===action.payload);
        // },

        setScene(state, action: PayloadAction<TWhatScene>) {
            state.sceneStatus = 'notReady';
            state.scene = action.payload;
        },

        setReadyScene(state){
            state.sceneStatus = 'ready';
        },

        setFieldMatrix(state, action: PayloadAction<TFieldMatrix>) {
            state.fieldMatrix = action.payload;
        },

        setPointerMatrix(state, action: PayloadAction<TPointMatrix>) {
            state.pointerMatrix = action.payload;
        },

        addCapitalCity(state, action: PayloadAction<ICapitalCity>) {
            //console.log('add capitalCity to state');
            state.capitalCities.push(action.payload);
        },

        setCityLvl(state, action: PayloadAction<{cityId:string, lvl:number}>){
            const cityIdx = state.selectObj.idx;
            if(state.cities[cityIdx].id===action.payload.cityId){
                state.cities[cityIdx].lvl = action.payload.lvl;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actionMoveCitySquadIn.pending, (state) => {
            state.errors = [];
        });

        builder.addCase(actionMoveCitySquadIn.fulfilled, (state, { payload }) => {
            const unitIdx = state.units.findIndex(u=>u.uid===payload.unitId);
            state.units[unitIdx].position = payload.toIdx;
        });

        builder.addCase(actionMoveCitySquadIn.rejected, (state, { payload }) => {

            //const payload = action.payload as ICustomError;
            state.errors.push(payload);
        });

        builder.addCase(actionMoveCitySquadInOut.pending, (state) => {
            state.errors = [];
        });

        builder.addCase(actionMoveCitySquadInOut.fulfilled, (state, { payload }) => {
            const unitIdx = state.units.findIndex(u=>u.uid===payload.unitId);
            const city = state.cities.find(c=>c.id===state.units[unitIdx].cityId);
            state.units[unitIdx].position = payload.toIdx;
            if(!state.units[unitIdx].partyId){
                //state.units[unitIdx].position = payload.toIdx;
                state.units[unitIdx].partyId = city.squadOut;
            }else{
                state.units[unitIdx].partyId = null;
            }
            
        });

        builder.addCase(actionMoveCitySquadInOut.rejected, (state, { payload }) => {

            //const payload = action.payload as ICustomError;
            state.errors.push(payload);
        });

        builder.addCase(actionDoubleMoveCitySquadIn.pending, (state) => {
            state.errors = [];
        });

        builder.addCase(actionDoubleMoveCitySquadIn.fulfilled, (state, { payload }) => {
            const unitOneIdx = state.units.findIndex(u=>u.uid===payload.unitId);
            const unitTwoIdx = state.units.findIndex(u=>u.uid===payload.toUnitId);
            const posOne = state.units[unitTwoIdx].position;
            const posTwo = state.units[unitOneIdx].position
            state.units[unitOneIdx].position = posOne;
            state.units[unitTwoIdx].position = posTwo;
        });

        builder.addCase(actionDoubleMoveCitySquadIn.rejected, (state, { payload }) => {

            //const payload = action.payload as ICustomError;
            state.errors.push(payload);
        });

        builder.addCase(actionMoveTwoCellCitySquadIn.pending, (state) => {
            state.errors = [];
        });

        builder.addCase(actionMoveTwoCellCitySquadIn.fulfilled, (state, { payload }) => {
            const unitOneIdx = state.units.findIndex(u=>u.uid===payload.unitId);
            const unitsIdx:number[]=[];
            payload.units.forEach(uId=>{
                const idx = state.units.findIndex(u=>u.uid===uId);
                unitsIdx.push(idx);
            });
            //const unitTwoIdx = state.units.findIndex(u=>u.uid===payload.toUnitId);
            const posOne:[number,number] = [...state.units[unitsIdx[0]].position];
            posOne[1] = 0;
            console.log('posOne = ', posOne[0],'||',posOne[1]);
            console.log('unitOneIdx = ', state.units[unitOneIdx].defaultName);
            const posTwo:[number,number] = [...state.units[unitOneIdx].position];
            state.units[unitOneIdx].position = [...posOne];
            unitsIdx.forEach(idx=>{
                state.units[idx].position = [posTwo[0],state.units[idx].position[1]];
            });
            //state.units[unitTwoIdx].position = posTwo;
        });

        builder.addCase(actionMoveTwoCellCitySquadIn.rejected, (state, { payload }) => {

            //const payload = action.payload as ICustomError;
            state.errors.push(payload);
        });

        builder.addCase(actionDelSelectObj.fulfilled, (state, { payload }) => {
            state.selectObj = null;
        });

        builder.addCase(actionInitNewMap.pending, (state) => {
            state.errors = [];
        });

        builder.addCase(actionInitNewMap.fulfilled, (state, { payload }) => {
            state.fieldMatrix = payload.matrixField;
            state.cellRect = payload.rectCell;
            state.fieldRect = payload.rectField;
            state.capitalCities = payload.capitalCities;
            state.units = payload.units;
            state.isMapInit = true;
            state.scene = 'mapEditor';
        });

        builder.addCase(actionInitNewMap.rejected, (state, { payload }) => {

            //const payload = action.payload as ICustomError;
            state.errors.push(payload);
        });

        builder.addCase(actionAddCapitalCity.pending, (state) => {
            state.errors = [];
        });

        builder.addCase(actionAddCapitalCity.fulfilled, (state, { payload }) => {
            const capital = payload.capital;
            if (capital.isCanPut && !capital.isUp) {
                for (let i = capital.matrixPoint[0]; i < capital.matrixPoint[0] + capital.matrix[0]; i++) {
                    for (let j = capital.matrixPoint[1]; j < capital.matrixPoint[1] + capital.matrix[1]; j++) {
                        state.fieldMatrix[i][j] = {
                            ...state.fieldMatrix[i][j],
                            objId: capital.id,
                            typeObject: 'capitalCity',
                            isBuild: true
                        }
                    }
                }
                state.editorMod = 'properties';
            } else {
                state.editorMod = 'move';
                state.selectObj = {
                    id: capital.id,
                    type: 'capitalCity',
                    idx: state.capitalCities.length
                }
                //state.selectObj = payload;
            }
            state.units.push(payload.unit);
            state.capitalCities.push(capital);
        });

        builder.addCase(actionAddCapitalCity.rejected, (state, { payload }) => {

            //const payload = action.payload as ICustomError;
            state.errors.push(payload);
        });

        builder.addCase(actionChangeCapitalProps.pending, (state) => {
            state.errors = [];
        });

        builder.addCase(actionChangeCapitalProps.fulfilled, (state, { payload }) => {

            if (state.capitalCities[state.selectObj.idx]) {
                //console.log('payload.gold = ', payload.gold);
                state.capitalCities[state.selectObj.idx] = {
                    ...state.capitalCities[state.selectObj.idx],
                    cityName: payload.cityName,
                    lordName: payload.lordName,
                    lordType: payload.lordType,
                    manaLife: payload.manaLife,
                    manaInfernal: payload.manaInfernal,
                    manaRune: payload.manaRune,
                    manaDeath: payload.manaDeath,
                    manaForest: payload.manaForest,
                    gold: payload.gold
                }
            }
            state.selectObj = null;
            //state.cities.push(payload);
        });

        builder.addCase(actionChangeCapitalProps.rejected, (state, { payload }) => {

            //const payload = action.payload as ICustomError;
            state.errors.push(payload);
        });

        builder.addCase(actionAddUnitToCapital.pending, (state) => {
            state.errors = [];
        });

        builder.addCase(actionAddUnitToCapital.fulfilled, (state, { payload }) => {
            //console.log('builder actionAddUnitToCapital');
            state.units.push(payload.unit);
            //const capitalIdx = state.capitalCities.findIndex(c=>c.id===payload.capitalId);
            //state.capitalCities[capitalIdx].squadIn.push(payload.unit.uid);
        });

        builder.addCase(actionAddUnitToCapital.rejected, (state, { payload }) => {

            //const payload = action.payload as ICustomError;
            state.errors.push(payload);
        });

        builder.addCase(actionAddCity.pending, (state) => {
            state.errors = [];
        });

        builder.addCase(actionAddCity.fulfilled, (state, { payload }) => {
            state.editorMod = 'move';
            state.selectObj = {
                id: payload.id,
                type: 'city',
                idx: state.cities.length
            }

            state.cities.push(payload);
            //console.log('builder actionAddCity');
        });

        builder.addCase(actionAddCity.rejected, (state, { payload }) => {

            //const payload = action.payload as ICustomError;
            state.errors.push(payload);
        });

        builder.addCase(actionPointerUp.fulfilled, (state, { payload }) => {
            const point = payload.point;
            const cell = state.fieldMatrix[point[0]][point[1]];

            if (state.selectObj) {
                //console.log('isCanPut = ', payload.isCanPut);
                if (payload.isCanPut) {
                    let obj: IBaseGameObj | null = null;
                    switch (state.selectObj.type) {
                        case 'capitalCity':
                            obj = state.capitalCities[state.selectObj.idx];
                            break;
                        case 'city':
                            obj = state.cities[state.selectObj.idx];
                            break;

                        default:
                            break;
                    }
                    //const city = state.capitalCities[state.selectObj.idx];
                    if (obj) {
                        obj.matrixPoint = [point[0] - obj.center[0], point[1] - obj.center[1]];
                        obj.isCanPut = true;
                        obj.isUp = false;

                        for (let i = obj.matrixPoint[0]; i < obj.matrixPoint[0] + obj.matrix[0]; i++) {
                            for (let j = obj.matrixPoint[1]; j < obj.matrixPoint[1] + obj.matrix[1]; j++) {
                                state.fieldMatrix[i][j] = {
                                    ...state.fieldMatrix[i][j],
                                    objId: obj.id,
                                    typeObject: obj.type,
                                    isBuild: true
                                }
                            }
                        }

                        state.selectObj = null;
                    }
                }
            } else {
                console.log('up!!!!! = ', cell.typeObject);
                if (cell.objId) {
                    let obj: IBaseGameObj | null = null;
                    let idx = -1;

                    switch (cell.typeObject) {
                        case 'capitalCity':
                            idx = state.capitalCities.findIndex(c => c.id === cell.objId);
                            if (idx !== -1) {
                                obj = state.capitalCities[idx];
                            }

                            break;
                        case 'city':
                            idx = state.cities.findIndex(c => c.id === cell.objId);
                            if (idx !== -1) {
                                obj = state.cities[idx];
                            }
                            break;

                        default:
                            break;
                    }

                    if (obj && state.editorMod === 'move') {
                        obj.isUp = true;

                        for (let i = obj.matrixPoint[0]; i < obj.matrixPoint[0] + obj.matrix[0]; i++) {
                            for (let j = obj.matrixPoint[1]; j < obj.matrixPoint[1] + obj.matrix[1]; j++) {
                                state.fieldMatrix[i][j] = {
                                    ...state.fieldMatrix[i][j],
                                    typeObject: null,
                                    objId: null,
                                    isBuild: false
                                }
                            }
                        }

                        state.selectObj = {
                            id: obj.id,
                            type: obj.type,
                            idx: idx
                        }

                    } else if (obj && state.editorMod === 'properties') {
                        state.selectObj = {
                            id: obj.id,
                            type: obj.type,
                            idx: idx
                        }
                    }
                }

            }

            //state.capitalCities.push(payload);
        });

        builder.addCase(actionPointerMove.fulfilled, (state, { payload }) => {
            if (state.selectObj && (state.editorMod === 'move' || state.editorMod === 'add-city')) {
                //const obj = state.selectObj;
                switch (state.selectObj.type) {
                    case 'capitalCity':
                        const capitalCity = state.capitalCities[state.selectObj.idx];
                        if (capitalCity) {
                            let i = payload.point[0] - 2;
                            let j = payload.point[1] - 2;
                            if (i < 0) {
                                i = 0;
                            } else if (i + 5 > state.fieldMatrix.length) {
                                i = state.fieldMatrix.length - 5;
                            }
                            if (j < 0) {
                                j = 0;
                            } else if (j + 5 > state.fieldMatrix.length) {
                                j = state.fieldMatrix.length - 5;
                            }
                            //console.log('isCanPut = ', payload.isCanPut);
                            state.capitalCities[state.selectObj.idx].isCanPut = payload.isCanPut;
                            state.capitalCities[state.selectObj.idx].matrixPoint = [i, j];
                        }
                        break;
                    case 'city':
                        const city = state.cities[state.selectObj.idx];
                        if (city) {
                            let i = payload.point[0] - 2;
                            let j = payload.point[1] - 1;
                            if (i < 0) {
                                i = 0;
                            } else if (i + 4 > state.fieldMatrix.length) {
                                i = state.fieldMatrix.length - 4;
                            }
                            if (j < 0) {
                                j = 0;
                            } else if (j + 4 > state.fieldMatrix.length) {
                                j = state.fieldMatrix.length - 4;
                            }
                            //console.log('isCanPut = ', payload.isCanPut);
                            state.cities[state.selectObj.idx].isCanPut = payload.isCanPut;
                            state.cities[state.selectObj.idx].matrixPoint = [i, j];
                        }
                        break;

                    default:
                        break;
                }

            }

            //state.capitalCities.push(payload);
        });

        builder.addCase(actionSetEditorMod.fulfilled, (state, { payload }) => {
            
            const selectObj = state.selectObj;
            if(selectObj&&state.editorMod!=='properties'){
                if(selectObj.type==='capitalCity'){
                    state.capitalCities = state.capitalCities.filter(c=>c.id!==selectObj.id);
                    state.units = state.units.filter(u=>u.capitalId===selectObj.id);
                }else if(selectObj.type==='city'){
                    state.cities = state.cities.filter(c=>c.id!==selectObj.id);
                }
            }
            state.editorMod = payload;
            state.selectObj = null;
        });

        builder.addCase(actionChangeCityProps.pending, (state) => {
            state.errors = [];
        });

        builder.addCase(actionChangeCityProps.fulfilled, (state, { payload }) => {
            state.cities[state.selectObj.idx].cityName = payload.cityName;
            state.cities[state.selectObj.idx].lvl = payload.lvl;
            state.selectObj = null;
            //const cityIdx = state.cities.findIndex(c=>c.id===payload.id);
            //console.log('builder actionAddCity');
        });

        builder.addCase(actionChangeCityProps.rejected, (state, { payload }) => {

            //const payload = action.payload as ICustomError;
            state.errors.push(payload);
        });

        builder.addCase(actionAddUnitToCity.pending, (state) => {
            state.errors = [];
        });

        builder.addCase(actionAddUnitToCity.fulfilled, (state, { payload }) => {
            state.units.push(payload.unit);
            // if(payload.squad==='right'){
            //     const cityIdx = state.cities.findIndex(c=>c.id===payload.cityId);
            //     state.cities[cityIdx].squadIn.push(payload.unit.uid);
            // }
        });

        builder.addCase(actionAddUnitToCity.rejected, (state, { payload }) => {

            //const payload = action.payload as ICustomError;
            state.errors.push(payload);
        });

        builder.addCase(actionAddLeaderToPartyCity.pending, (state) => {
            state.errors = [];
        });

        builder.addCase(actionAddLeaderToPartyCity.fulfilled, (state, { payload }) => {
            state.parties.push(payload.party);
            state.units.push(payload.unit);
            const idxCity = state.cities.findIndex(c=>c.id===payload.cityId)
            state.cities[idxCity].squadOut = payload.party.id;
        });

        builder.addCase(actionAddLeaderToPartyCity.rejected, (state, { payload }) => {
            state.errors.push(payload);
        });

        builder.addCase(actionMoveUnitInOut.pending, (state) => {
            state.errors = [];
        });

        builder.addCase(actionMoveUnitInOut.fulfilled, (state, { payload }) => {
            const unitInIdx = state.units.findIndex(u=>u.uid===payload.unitId);
            const unitOutIdx = state.units.findIndex(u=>u.uid===payload.toUnitId);
            const posIn = state.units[unitInIdx].position;
            const posOut = state.units[unitOutIdx].position;
            state.units[unitOutIdx].position = posIn;
            state.units[unitInIdx].position = posOut;
            state.units[unitInIdx].partyId = state.units[unitOutIdx].partyId;
            state.units[unitOutIdx].partyId = null;
        });

        builder.addCase(actionMoveUnitInOut.rejected, (state, { payload }) => {
            state.errors.push(payload);
        });

        builder.addCase(actionMoveTwoCellUnitInOut.pending, (state) => {
            state.errors = [];
        });

        builder.addCase(actionMoveTwoCellUnitInOut.fulfilled, (state, { payload }) => {
            const unitOneIdx = state.units.findIndex(u=>u.uid===payload.unitId);
            const unitsIdx:number[]=[];
            payload.units.forEach(uId=>{
                const idx = state.units.findIndex(u=>u.uid===uId);
                unitsIdx.push(idx);
            });
            const posOne:[number,number] = [...state.units[unitsIdx[0]].position];
            posOne[1] = 0;
            //console.log('posOne = ', posOne[0],'||',posOne[1]);
            //console.log('unitOneIdx = ', state.units[unitOneIdx].defaultName);
            const posTwo:[number,number] = [...state.units[unitOneIdx].position];
            state.units[unitOneIdx].position = [...posOne];
            let partyOneId:string|null = null;
            if(state.units[unitOneIdx].partyId){
                partyOneId = state.units[unitOneIdx].partyId;
                state.units[unitOneIdx].partyId = null;
            }else{
                //console.log('to Out!!! = ', state.units[unitsIdx[0]].partyId);
                state.units[unitOneIdx].partyId = state.units[unitsIdx[0]].partyId;
            }
            unitsIdx.forEach(idx=>{
                if(partyOneId){
                    state.units[idx].partyId = partyOneId;
                }else{
                    state.units[idx].partyId = null;
                }
                state.units[idx].position = [posTwo[0],state.units[idx].position[1]];
            });
        });

        builder.addCase(actionMoveTwoCellUnitInOut.rejected, (state, { payload }) => {
            state.errors.push(payload);
        });

        builder.addCase(actionMoveTwoCellUnitOutIn.pending, (state) => {
            state.errors = [];
        });

        builder.addCase(actionMoveTwoCellUnitOutIn.fulfilled, (state, { payload }) => {
            const unitOneIdx = state.units.findIndex(u=>u.uid===payload.unitId);
            const unitsIdx:number[]=[];
            payload.units.forEach(uId=>{
                const idx = state.units.findIndex(u=>u.uid===uId);
                unitsIdx.push(idx);
            });
            const posOne:[number,number] = [...state.units[unitsIdx[0]].position];
            posOne[1] = 0;
            //console.log('posOne = ', posOne[0],'||',posOne[1]);
            //console.log('unitOneIdx = ', state.units[unitOneIdx].defaultName);
            const posTwo:[number,number] = [...state.units[unitOneIdx].position];
            state.units[unitOneIdx].position = [...posOne];
            let partyOneId:string|null = null;
            if(state.units[unitOneIdx].partyId){
                partyOneId = state.units[unitOneIdx].partyId;
                state.units[unitOneIdx].partyId = null;
            }else{
                //console.log('to Out!!! = ', state.units[unitsIdx[0]].partyId);
                state.units[unitOneIdx].partyId = state.units[unitsIdx[0]].partyId;
            }
            unitsIdx.forEach(idx=>{
                console.log('defaultName = ', state.units[idx].defaultName);
                if(partyOneId){
                    state.units[idx].partyId = partyOneId;
                }else{
                    state.units[idx].partyId = null;
                }
                state.units[idx].position = [posTwo[0],state.units[idx].position[1]];
            });
        });

        builder.addCase(actionMoveUnitOutIn.pending, (state, { payload }) => {
            state.errors = [];
        });

        builder.addCase(actionMoveUnitOutIn.fulfilled, (state, { payload }) => {
            const outUnitIdx = state.units.findIndex(u=>u.uid===payload.unitId);
            const inUnitIdx = state.units.findIndex(u=>u.uid===payload.toUnitId);
            const partyId = state.units[outUnitIdx].partyId;
            const posOut = state.units[outUnitIdx].position;
            const posIn = state.units[inUnitIdx].position;
            state.units[outUnitIdx].partyId = null;
            state.units[outUnitIdx].position = posIn;
            state.units[inUnitIdx].partyId = partyId;
            state.units[inUnitIdx].position = posOut;
            //const cityIdx = state.cities.findIndex(c=>c.id===payload.id);
            //console.log('builder actionAddCity');
        });

        builder.addCase(actionMoveUnitOutIn.rejected, (state, { payload }) => {

            //const payload = action.payload as ICustomError;
            state.errors.push(payload);
        });
    }
});

export const {
    setFieldMatrix,
    setScene,
    setPointerMatrix,
    setReadyScene,
    addCapitalCity,
    setCityLvl,
} = sliceGame.actions;

export default sliceGame;