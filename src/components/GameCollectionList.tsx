import React from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import GameCard from './GameCard'; // seu componente existente
import { Game, GameStatus } from '../types/customTypes';
import ActionButton from './actionButton';

type Props = {
  data: Game[];
  onRemove: (id: number) => void;
  onEditHours: (id: number) => void;
};

const GameCollectionList = ({ data, onRemove, onEditHours }: any) => {
    const { t } = useTranslation();

    return (
    <FlatList 
        data={data}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item}) =>(
            <GameCard 
                game={item}
                onRemove={() => onRemove(item.id)}
                onEditHours={() => onEditHours(item.id)}
            />
        )}
        ListEmptyComponent={<Text style={styles.empty}>{t('emptyGameList')}</Text>}
    />
)};

const styles = StyleSheet.create({
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
    fontSize: 16,
  },
});

export default GameCollectionList;