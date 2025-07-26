import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
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
import { GameStatus } from '../types/customTypes';
import GameCollectionList from '../components/GameCollectionList';

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
    [GameStatus.PLAYING]: () => (
      <View style={styles.container}>
        <GameCollectionList data={playingGames} onRemove={handleRemove} onEditHours={handleEditHours} />
      </View>
    ),
    [GameStatus.WISHLIST]: () => (
      <View style={styles.container}>
        <GameCollectionList data={wishlistGames} onRemove={handleRemove} onEditHours={handleEditHours} />
      </View>
    ),
    [GameStatus.FINISHED]: () => (
      <View style={styles.container}>
        <GameCollectionList data={finishedGames} onRemove={handleRemove} onEditHours={handleEditHours} />
      </View>
  ),
  });

  return (
    <TabView 
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props)=> (
            <TabBar 
                {...props}
                indicatorStyle={{ backgroundColor: '#E16359', height: 3 }}
                style={{ backgroundColor: '#fff', elevation: 2 }}
            />
        )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor:'#f0dddbff' 
  }
});

export default MyCollectionScreen