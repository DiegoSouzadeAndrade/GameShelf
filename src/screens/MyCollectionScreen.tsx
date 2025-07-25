import React, {useState} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectPlayingGames, 
    selectFinishedGames, 
    selectWishlistGames, 
    removeGame,
    editHoursPlayed
} from '../store/slices/collectionSlice';
import { useTranslation } from 'react-i18next';
import {GameStatus } from '../types/customTypes';
import ActionButton from '../components/actionButton';

const GameCollectionList = ({ data, onRemove, onEditHours }: any) => {
    const {t} = useTranslation();

    return (
    <FlatList 
        data={data}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item}) =>(
            <View style={styles.card}>
                <Text style={styles.gameTitle}>{item.name}</Text>
                {item.hours !== undefined && (
                    <Text style={styles.hours}>{t('hoursPlayed')}: {item.hoursPlayed}</Text>
                )}
                <View style={styles.actions}>
                    {item.status === GameStatus.FINISHED && (
                        <ActionButton name='edit' size={32} onPress={()=> onEditHours(item.id)} color='black'/>
                    )}
                    <ActionButton name='remove' size={32} onPress={()=> onRemove(item.id)} color='red' />
                </View>
            </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>{t('emptyGameList')}</Text>}
    />
)};

const MyCollectionScreen = () => {
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [index, setIndex] = useState(0);
    const {t} = useTranslation();
    const [routes] = useState([
        {key: GameStatus.PLAYING, title: t('currentlyPlaying')},
        {key: GameStatus.WISHLIST, title: t('wishlist')},
        {key: GameStatus.FINISHED, title: t('Finished')},
    ])

    const playingGames = useSelector(selectPlayingGames);
    const wishlistGames = useSelector(selectWishlistGames);
    const finishedGames = useSelector(selectFinishedGames);

    const handleRemove = (id: number) => {
        dispatch(removeGame(id));
    }

    const handleEditHours = (hours: string, id: number) => {
        var hoursPlayedParsed = parseFloat(hours)
        dispatch(editHoursPlayed({id, hoursPlayed: hoursPlayedParsed}))
        setIsModalVisible(false);
    }

    const renderScene = SceneMap({
    [GameStatus.PLAYING]: () => <GameCollectionList data={playingGames} onRemove={handleRemove} onEditHours={handleEditHours} />,
    [GameStatus.WISHLIST]: () => <GameCollectionList data={wishlistGames} onRemove={handleRemove} onEditHours={handleEditHours} />,
    [GameStatus.FINISHED]: () => <GameCollectionList data={finishedGames} onRemove={handleRemove} onEditHours={handleEditHours} />,
  });

  return (
    <TabView 
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props)=> (
            <TabBar 
                {...props}
                indicatorStyle={{ backgroundColor: 'blue'}}
                style={{ backgroundColor: 'white'}}
            />
        )}
    />
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    margin: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  hours: {
    fontSize: 14,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  edit: {
    color: 'green',
  },
  remove: {
    color: 'red',
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default MyCollectionScreen