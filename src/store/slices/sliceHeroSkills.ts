import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { THeroSkill } from './sliceMultiArena';



type InitState = {
    heroSkills: THeroSkill[],
    maxNumber: number,
    idx: number,
}

const initialState: InitState = {
    heroSkills: [],
    maxNumber: 10,
    idx:0,
};

const sliceHeroSkills = createSlice({
    name: 'sliceHeroSkills',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
       
    }
});

export const {

} = sliceHeroSkills.actions;

export default sliceHeroSkills;