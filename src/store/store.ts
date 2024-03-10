import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import sliceGame from './slices/sliceGame';
import sliceCityParty from './slices/cityParty';
import sliceCityProps from './slices/cityProps';
import sliceMenuGame from './slices/sliceMenuGame';
import sliceMultiArena from './slices/sliceMultiArena';
import sliceMultiplayer from './slices/sliceMultiplayer';

export function makeStore(){
    return configureStore({
        reducer: {
            game: sliceGame.reducer,
            cityParty: sliceCityParty.reducer,
            cityProps: sliceCityProps.reducer,
            gameMenu: sliceMenuGame.reducer,
            multiArena: sliceMultiArena.reducer,
            multiplayer: sliceMultiplayer.reducer
        }
    });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;

export default store;