export enum GameStatus {
    PLAYING = 'playing',
    WISHLIST = 'wishlist',
    FINISHED = 'finished',
}

export interface Game {
    id: number;
    name: string;
    status: GameStatus;
    background_image: string;
    hoursPlayed?: number;
    category?: string;
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

export type HoursModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (hours: string) => void;
};