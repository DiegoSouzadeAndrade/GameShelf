import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {GameStatus} from '../../types/customTypes';

export interface Game {
    id: number;
    name: string;
    status: GameStatus;
    backgroundImage: string;
    hoursPlayed?: number;
}

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
    },
});

export const { addGame, removeGame, updateGame } = collectionSlice.actions;
export default collectionSlice.reducer;
