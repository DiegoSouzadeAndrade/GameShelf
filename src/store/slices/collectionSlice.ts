import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import {GameStatus, Game} from '../../types/customTypes';
import { RootState } from '..';

interface CollectionState {
    games: Game[];
}

const initialState: CollectionState = {
    games: [],
};

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        addGame: (state, action: PayloadAction<Game>) => {
            const exists = state.games.find(game => game.id === action.payload.id);
            if (!exists) {
            state.games.push(action.payload);
            } 
        },
        removeGame: (state, action: PayloadAction<number>) => {
            state.games = state.games.filter(game => game.id !== action.payload);
        },
        updateGame: (state, action: PayloadAction<Game>) => {
            const index = state.games.findIndex(game => game.id === action.payload.id);
            if (index !== -1) {
                state.games[index] = action.payload;
            }
        },
        editHoursPlayed: (state, action: PayloadAction<{id: number, hoursPlayed: number}>) => {
            const game = state.games.find(game => game.id === action.payload.id);
            if (game) {
                game.hoursPlayed = action.payload.hoursPlayed;
            }
        }
    },
});

const selectGames = (state: RootState) => state.collection.games;

export const selectPlayingGames = createSelector(
  [selectGames],
  (games) => games.filter((game) => game.status === GameStatus.PLAYING)
);

export const selectWishlistGames = createSelector(
  [selectGames],
  (games) => games.filter((game) => game.status === GameStatus.WISHLIST)
);

export const selectFinishedGames = createSelector(
  [selectGames],
  (games) => games.filter((game) => game.status === GameStatus.FINISHED)
);

export const { addGame, removeGame, updateGame, editHoursPlayed } = collectionSlice.actions;
export default collectionSlice.reducer;
