export type GameStatus = 'playing' | 'wishlist' | 'finished';

export enum GameCategory {
    WISHLIST = 'wishlist',
    CURRENTLY_PLAYING = 'currentlyPlaying',
    FINISHED = 'finished',
}

export interface Game {
    id: number;
    name: string;
    status: GameStatus;
    background_image: string;
    hoursPlayed?: number;
    category?: GameCategory;
    released?: string;
    description?: string;
    rating?: number;
};

export type ActionButtonProps = {
    onPress: (value?: number) => void;
    name: string;
    size: number;
    color: string
};