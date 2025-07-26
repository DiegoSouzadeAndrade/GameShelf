import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameDetailsScreen from '../screens/GameDetailsScreen';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
    Tabs: undefined;
    GameDetails: { gameId: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack(){
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Tabs" component={TabNavigator}/>
            <Stack.Screen 
                name="GameDetails" 
                component={GameDetailsScreen} 
                options={{
                headerShown: false,
                animation: 'fade',
  }}/>
        </Stack.Navigator>
    )
}