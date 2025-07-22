import { useSelector, UseSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { addGame, removeGame, updateGame } from '../store/slices/collectionSlice';

const ActionButton = () => {
    const dispatch = useAppDispatch();
    const games = useSelector((state: RootState) => state.collection.games);

    const handleAddToWishList = () => {
        //TODO: This was just for testing, we need to recieve an game to add
        dispatch(addGame({id:1, name: 'Zelda', status: 'wishlist', backgroundImage: ''}));
    }

    const handleRemove = () => {
        //TODO: This was just for testing, we need to recieve an game id to remove
        dispatch(removeGame(1));
    }
};