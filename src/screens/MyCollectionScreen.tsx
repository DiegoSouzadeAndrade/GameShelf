import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
import Icon from 'react-native-vector-icons/AntDesign';

const MyCollectionScreen = () => {
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [index, setIndex] = useState(0);
    const {t} = useTranslation();
    const [routes] = useState([
        {key: GameStatus.PLAYING, title: t('currentlyPlaying'), icon: 'playcircleo'},
        {key: GameStatus.WISHLIST, title: t('wishlist'), icon: 'pluscircleo'},
        {key: GameStatus.FINISHED, title: t('Finished'), icon:'checkcircleo'},
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
                renderTabBarItem={({ route, key}) => {
                  const focused = props.navigationState.index === props.navigationState.routes.findIndex(r => r.key === key);

                  return (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon 
                      name={route.icon} 
                      size={20} 
                      color={focused ? '#E16359' : '#999'} 
                      style={{marginRight: 6, marginLeft: 6}}
                    />
                    <Text
                      style={{
                        color: focused ? '#E16359' : '#999', 
                        fontWeight: focused ? 'bold' : 'normal',
                        fontSize: 18,
                        marginTop: 2,
                      }}
                      >
                    {route.title}
                    </Text>
                  </View>
                )}}
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