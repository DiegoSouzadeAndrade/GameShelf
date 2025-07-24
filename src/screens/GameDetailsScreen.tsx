import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addGame } from '../store/slices/collectionSlice';
import { Game, GameCategory } from '../types/customTypes';
import { useTranslation } from 'react-i18next';
import ActionButton from '../components/actionButton';
import HoursModal from '../components/HoursModal';

type RouteParams = {
    game: Game;
};

export default function GameDetailsScreen(){
    const route = useRoute();
    const { game } = route.params as RouteParams;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleAdd = (category: GameCategory) => {
        if(category === GameCategory.FINISHED){
            setIsModalVisible(true);
        } else {
            dispatch(addGame({ ...game, category }))
        }
    };

    const handleConfirmHours = (hours: string) =>{
        var hoursPlayedParsed = parseFloat(hours)
        dispatch(addGame({ ...game, category: GameCategory.FINISHED, hoursPlayed: hoursPlayedParsed }));
        setIsModalVisible(false);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{uri: game.background_image}} style={styles.image} />
            <Text style={styles.title}>{game.name}</Text>
            <Text style={styles.info}>{t('releaseDate')} {game.released}</Text>
            <Text style={styles.info}>{t('rating')} {game.rating}</Text>
            <View style={styles.buttonContainer}>
                <ActionButton 
                    onPress={() => handleAdd(GameCategory.CURRENTLY_PLAYING)} 
                    name='play' 
                    size={32} 
                    color='#E16359' 
                />
                <ActionButton 
                    onPress={() => handleAdd(GameCategory.WISHLIST)} 
                    name='plus' 
                    size={32} 
                    color='#E16359' 
                />
                <ActionButton 
                    onPress={() => handleAdd(GameCategory.FINISHED)} 
                    name='check' 
                    size={32} 
                    color='#E16359' 
                />
            </View>
            <HoursModal 
                visible={isModalVisible}
                onClose={()=> setIsModalVisible(false)}
                onConfirm={handleConfirmHours}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row', 
    marginTop: 75, 
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
});