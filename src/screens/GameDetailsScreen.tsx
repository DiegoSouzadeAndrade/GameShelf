import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Alert, Animated, StatusBar, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addGame } from '../store/slices/collectionSlice';
import { Game, GameStatus } from '../types/customTypes';
import { useTranslation } from 'react-i18next';
import ActionButton from '../components/actionButton';
import HoursModal from '../components/HoursModal';

type RouteParams = {
    game: Game;
};

const HEADER_HEIGHT = 250;
const { width } = Dimensions.get('screen')

export default function GameDetailsScreen(){
    const route = useRoute();
    const { game } = route.params as RouteParams;
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;


    const handleAdd = (status: GameStatus) => {
        if(status === GameStatus.FINISHED){
            setIsModalVisible(true);
        } else {
            dispatch(addGame({ ...game, status }))
        }
    };

    const handleConfirmHours = (hours: string) =>{
        var hoursPlayedParsed = parseFloat(hours)
        dispatch(addGame({ ...game, status: GameStatus.FINISHED, hoursPlayed: hoursPlayedParsed }));
        setIsModalVisible(false);
    }

    return (
        <View style={{flex: 1, backgroundColor: '#fff',}}>
            <StatusBar translucent backgroundColor="transparent" barStyle='light-content' />
            <Animated.Image 
                source={{ uri: game.background_image }}
                style={[
                    styles.image,
                    {
                        transform: [
                            {
                                scale: scrollY.interpolate({
                                    inputRange: [-150, 0 , 150],
                                    outputRange: [1.4, 1, 1],
                                    extrapolate: "clamp",
                                }),
                            },
                        ],
                    },
                ]}
                resizeMode='cover'
            />
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{game.name}</Text>
                    <Text style={styles.info}>{t('releaseDate')} {game.released}</Text>
                    <Text style={styles.info}>{t('rating')} {game.rating}</Text>
                </View>
                    <View style={styles.buttonContainer}>
                        <ActionButton 
                            onPress={() => handleAdd(GameStatus.PLAYING)} 
                            name='play' 
                            size={32} 
                            color='#E16359' 
                        />
                        <ActionButton 
                            onPress={() => handleAdd(GameStatus.WISHLIST)} 
                            name='plus' 
                            size={32} 
                            color='#E16359' 
                        />
                        <ActionButton 
                            onPress={() => handleAdd(GameStatus.FINISHED)} 
                            name='check' 
                            size={32} 
                            color='#E16359' 
                        />
                    </View>
                </View>
                <HoursModal 
                    visible={isModalVisible}
                    onClose={()=> setIsModalVisible(false)}
                    onConfirm={handleConfirmHours}
                />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor:'#f0dddbff' 
  },
  image: {
    width: width,
    height: HEADER_HEIGHT,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20
  }
});