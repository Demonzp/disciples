import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { actionAddCapitalCity, actionAddCity, actionInitNewMap, actionPointerMove, actionPointerUp, actionSetEditorMod } from 'store/actions/actionsGame';
import { TPointMatrix } from 'utils/game/scenes/editorScene';

export type TCapitalRace = 'empire' | 'legions' | 'clans' | 'elves' | 'undead';
export const arrRaces: TCapitalRace[] = ['empire', 'legions'];
export type TWhatScene = 'loading' | 'mainMenu' | 'mapEditorMenu' | 'mapEditor';

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

export type TSelectObj = {
    id: string;
    type: TObject;
    idx: number;
}

export interface IBaseGameObj {
    matrixPoint: TPointMatrix;
    prevMatrixPoint: TPointMatrix;
    matrix: [number, number];
    center: [number, number];
    type: TObject;
    id: string;
    squadIn: string[];
    isUp: boolean;
    isCanPut: boolean;
}

export interface ICapitalCity extends IBaseGameObj {
    race: TCapitalRace;
    squadOut: string[];
    cityName: string;
    lordName: string;
    manaLife: number;
    manaInfernal: number;
    manaDeath: number;
    manaRune: number;
    manaForest: number;
    gold: number;
}

export interface ICity extends IBaseGameObj {
    owner: TTerrain;
    squadOut: string[];
    lvl: number;
}

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
}

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

}

export interface IStateGame {
    errors: any[],
    isMapInit: boolean,
    cellSize: number,
    fieldRect: TRectangle,
    cellRect: TRectangle,
    pointerMatrix: TPointMatrix;
    capitalCities: ICapitalCity[];
    cities: any[];
    fieldMatrix: TFieldMatrix;
    selectObj: TSelectObj | null;
    isPointerMove: boolean;
    isPointerDown: boolean;
    scene: TWhatScene;
    editorMod: TEditorMod;
}

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
    scene: 'loading',
    editorMod: 'properties',
};

const sliceGame = createSlice({
    name: 'selectTable',
    initialState,
    reducers: {
        // selectObj(state, action:PayloadAction<string>){
        //     state.selectObj = state.capitalCities.find(c=>c.id===action.payload);
        // },

        setScene(state, action: PayloadAction<TWhatScene>) {
            state.scene = action.payload;
        },

        setFieldMatrix(state, action: PayloadAction<TFieldMatrix>) {
            state.fieldMatrix = action.payload;
        },

        setPointerMatrix(state, action: PayloadAction<TPointMatrix>) {
            state.pointerMatrix = action.payload;
        },

        addCapitalCity(state, action: PayloadAction<ICapitalCity>) {
            console.log('add capitalCity to state');
            state.capitalCities.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actionInitNewMap.pending, (state) => {
            state.errors = [];
        });

        builder.addCase(actionInitNewMap.fulfilled, (state, { payload }) => {
            state.fieldMatrix = payload.matrixField;
            state.cellRect = payload.rectCell;
            state.fieldRect = payload.rectField;
            state.capitalCities = payload.capitalCities;
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
            if (payload.isCanPut && !payload.isUp) {
                for (let i = payload.matrixPoint[0]; i < payload.matrixPoint[0] + payload.matrix[0]; i++) {
                    for (let j = payload.matrixPoint[1]; j < payload.matrixPoint[1] + payload.matrix[1]; j++) {
                        state.fieldMatrix[i][j] = {
                            ...state.fieldMatrix[i][j],
                            objId: payload.id,
                            typeObject: 'capitalCity',
                            isBuild: true
                        }
                    }
                }
                state.editorMod = 'properties';
            } else {
                state.editorMod = 'move';
                state.selectObj = {
                    id: payload.id,
                    type: 'capitalCity',
                    idx: state.capitalCities.length
                }
                //state.selectObj = payload;
            }

            state.capitalCities.push(payload);
        });

        builder.addCase(actionAddCapitalCity.rejected, (state, { payload }) => {

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
        });

        builder.addCase(actionAddCity.rejected, (state, { payload }) => {

            //const payload = action.payload as ICustomError;
            state.errors.push(payload);
        });

        builder.addCase(actionPointerUp.fulfilled, (state, { payload }) => {
            const point = payload.point;
            const cell = state.fieldMatrix[point[0]][point[1]];

            if (state.selectObj) {
                console.log('isCanPut = ', payload.isCanPut);
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
            state.editorMod = payload;
            state.selectObj = null;
        });
    }
});

export const {
    setFieldMatrix,
    setScene,
    setPointerMatrix,
    addCapitalCity,
} = sliceGame.actions;

export default sliceGame;