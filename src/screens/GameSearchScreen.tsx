import React, {useState} from 'react';
import { View, TextInput, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGames } from '../hooks/useGames';
import GameCard from '../components/GameCard';
import { useTranslation } from 'react-i18next';

export default function GameSearchScreen(){
    const [query, setQuery] = useState('');
    const { games, loading, error, searchGames } = useGames();
    const navigation = useNavigation<any>();
    const { t, i18n } = useTranslation();

    function handleSearch(){
        if(query.length > 2){
            searchGames(query);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput 
                placeholder={t('searchPlaceholder')}
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
                style={styles.input}
            />

            {loading && <ActivityIndicator size="large" />}
            {error && <Text style={styles.error}>{error}</Text>}

            <FlatList 
                data={games}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item})=>(
                    <GameCard 
                        game={item}
                        onPress={()=> navigation.navigate('GameDetails', { game: item })}
                    />
                )}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0dddbff' },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#eee',
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
  },
  title: { fontSize: 16, fontWeight: '600' },
  sub: { fontSize: 12, color: '#666' },
  error: { color: 'red', marginTop: 10 },
});