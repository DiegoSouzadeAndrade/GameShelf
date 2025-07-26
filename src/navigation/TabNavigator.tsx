import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GameSearchScreen from '../screens/GameSearchScreen';
import MyCollectionScreen from '../screens/MyCollectionScreen';
import Icon from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

export default function TabNavigator(){
    const {t} = useTranslation();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) =>{
                    let iconName = route.name === 'Search' ? 'search' : 'folder';
                    return <Icon name={iconName} size={size} color={color} />;
                },
                headerShown: true,
                tabBarActiveTintColor: '#f09f08ff',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Search" component={GameSearchScreen} options={{title: t('searchScreenTitle')}}/>
            <Tab.Screen name="Collection" component={MyCollectionScreen} options={{title: t('collection')}}/>
        </Tab.Navigator>
    )
}