import React, {useState} from 'react';
import { View, TextInput, FlatList, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGames } from '../hooks/useGames';
import { Game } from '../types/customTypes';
import { useTranslation } from 'react-i18next';

export default function GameSearchScreen(){
    const [query, setQuery] = useState('');
    const { games, loading, error, searchGames } = useGames();
    const navigation = useNavigation<any>();
    const { t, i18n } = useTranslation();
    //i18n.changeLanguage('en-US');

    function handleSearch(){
        if(query.length > 2){
            searchGames(query);
        }
    }

    function renderItem( {item}: any) {
        console.log('===========', item.name)
        return (
            <TouchableOpacity 
                style={styles.item}
                onPress={()=> navigation.navigate('GameDetails', { game: item })}
            >
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.sub}>{item.status}</Text>
            </TouchableOpacity>
        );
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
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
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