import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import GameDetailsScreen from '../screens/GameDetailsScreen';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
    Tabs: undefined;
    GameDeTails: { gameId: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack(){
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Tabs" component={TabNavigator}/>
            {/* <Stack.Screen name="GameDeTails" component={GameDetailsScreen}/> */}
        </Stack.Navigator>
    )
}