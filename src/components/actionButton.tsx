import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { ActionButtonProps } from '../types/customTypes';


const ActionButton: React.FC<ActionButtonProps> = ({ onPress, name, size, color}) => {

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