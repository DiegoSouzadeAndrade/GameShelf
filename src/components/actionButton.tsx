import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector, UseSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { addGame, removeGame, updateGame } from '../store/slices/collectionSlice';
import { ActionButtonProps } from '../types/customTypes';


const ActionButton: React.FC<ActionButtonProps> = ({ onPress, name, size, color}) => {
    const dispatch = useAppDispatch();
    const games = useSelector((state: RootState) => state.collection.games);

    const handleAddToWishList = () => {
        //TODO: This was just for testing, we need to recieve an game to add
        //dispatch(addGame({id:1, name: 'Zelda', status: 'wishlist', backgroundImage: ''}));
    }

    const handleRemove = () => {
        //TODO: This was just for testing, we need to recieve an game id to remove
        dispatch(removeGame(1));
    }

    return (
        <TouchableOpacity style={styles.button} onPress={() => onPress()}>
          <Icon style={styles.iconContainer} name={name} size={size} color={color}/>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: 65,
    height: 65,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  iconContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActionButton;