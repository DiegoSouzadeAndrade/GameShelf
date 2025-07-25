import React,  { useRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { ActionButtonProps } from '../types/customTypes';


const ActionButton: React.FC<ActionButtonProps> = ({ onPress, name, size, color}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.85,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.2,
        friction: 3,
        tension: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onPress());
  };


    return (
        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
            <Icon style={styles.iconContainer} name={name} size={size} color={color} />
          </Animated.View>
        </TouchableWithoutFeedback>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  iconContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActionButton;