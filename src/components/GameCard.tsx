import React, {useEffect, useRef} from 'react';
import { Animated, Pressable, Text, StyleSheet, Image, View } from 'react-native';
import { Game } from '../types/customTypes';
import { useTranslation } from 'react-i18next';

interface Props {
    game: Game;
    onPress: ()=> void;
}

const GameCard: React.FC<Props> = ({ game, onPress }) => {
    const translateY = useRef(new Animated.Value(20)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const {t} = useTranslation();

    useEffect(()=>{
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View style={[styles.card, {opacity,transform:[{translateY}]}]}>
            <Pressable onPress={onPress} style={({ pressed })=>[{ transform: [{ scale: pressed ? 0.97 : 1 }] }]}>
                <Image source={{uri: game.background_image}} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>{game.name}</Text>
                    <Text style={styles.subtitle}>{t('rating')}: {game.rating}</Text>
                </View>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    height: 180,
    width: '100%',
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default GameCard;