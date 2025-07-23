export type GameStatus = 'playing' | 'wishlist' | 'finished';

export interface Game {
    id: number;
    name: string;
    status: GameStatus;
    backgroundImage: string;
    hoursPlayed?: number;
};