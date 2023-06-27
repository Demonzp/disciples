import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { actionAddCapitalCity, actionPointerMove, actionPointerUp } from 'store/actions/actionsGame';
import { TCapitalRace } from 'utils/game/objects/CapitalCity';
import { TPointMatrix } from 'utils/game/scenes/mainScene';
import { TPoint } from 'utils/gameLib/Game';

export type TTerrain = 'neutral' | 'empire' | 'legions' | 'clans' | 'elves' | 'undead';

export type TCell = {
    x: number,
    y: number,
    objId: string | null,
    terrain: TTerrain,
    isBuild: boolean
}

export type TFieldMatrix = (TCell[])[];

export type TSelectObj = {
    id: string;
    type: 'capitalCity' | 'city' | 'squad';
    idx: number;
}

export interface IBaseGameObj {
    matrixPoint: TPointMatrix;
    prevMatrixPoint: TPointMatrix;
    matrix: [number, number];
    id: string;
    race: TCapitalRace;
    squadIn: string[];
    isUp: boolean;
    isCanPut: boolean;
}

export interface ICapitalCity extends IBaseGameObj {
    squadOut: string[];
}

export interface IStateGame {
    errors: any[],
    pointerMatrix: TPointMatrix;
    capitalCities: ICapitalCity[];
    fieldMatrix: TFieldMatrix;
    selectObj: TSelectObj | null;
    isPointerMove: boolean;
    isPointerDown: boolean;
}

const initialState: IStateGame = {
    errors: [],
    pointerMatrix: [0, 0],
    capitalCities: [],
    fieldMatrix: [],
    selectObj: null,
    isPointerMove: false,
    isPointerDown: false,
};

const sliceGame = createSlice({
    name: 'selectTable',
    initialState,
    reducers: {
        // selectObj(state, action:PayloadAction<string>){
        //     state.selectObj = state.capitalCities.find(c=>c.id===action.payload);
        // },

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
                            isBuild: true
                        }
                    }
                }
            } else {
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

        builder.addCase(actionPointerUp.fulfilled, (state, { payload }) => {
            const point = payload.point;
            const cell = state.fieldMatrix[point[0]][point[1]];

            if(state.selectObj){
                console.log('isCanPut = ', payload.isCanPut);
                if(payload.isCanPut){
                    const city = state.capitalCities[state.selectObj.idx];
                    if (city) {
                        city.matrixPoint = [point[0]-2, point[1]-2];
                        city.isCanPut = true;
                        city.isUp = false;

                        for (let i = city.matrixPoint[0]; i < city.matrixPoint[0] + city.matrix[0]; i++) {
                            for (let j = city.matrixPoint[1]; j < city.matrixPoint[1] + city.matrix[1]; j++) {
                                state.fieldMatrix[i][j] = {
                                    ...state.fieldMatrix[i][j],
                                    objId: city.id,
                                    isBuild: true
                                }
                            }
                        }

                        state.selectObj = null;
                    }
                }
            }else{

                if (cell.objId) {
                    const cityIdx = state.capitalCities.findIndex(c => c.id === cell.objId);
                    if (cityIdx !== -1) {
                        const city = state.capitalCities[cityIdx];
                        city.isUp = true;
                        

                        for (let i = city.matrixPoint[0]; i < city.matrixPoint[0] + city.matrix[0]; i++) {
                            for (let j = city.matrixPoint[1]; j < city.matrixPoint[1] + city.matrix[1]; j++) {
                                state.fieldMatrix[i][j] = {
                                    ...state.fieldMatrix[i][j],
                                    objId: null,
                                    isBuild: false
                                }
                            }
                        }

                        state.selectObj = {
                            id: city.id,
                            type: 'capitalCity',
                            idx: cityIdx
                        }

                    }
                }
            }

            //state.capitalCities.push(payload);
        });

        builder.addCase(actionPointerMove.fulfilled, (state, { payload }) => {
            if (state.selectObj) {
                //const obj = state.selectObj;
                const city = state.capitalCities[state.selectObj.idx];
                if (city) {
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
            }

            //state.capitalCities.push(payload);
        });
    }
});

export const {
    setFieldMatrix,
    setPointerMatrix,
    addCapitalCity,
} = sliceGame.actions;

export default sliceGame;