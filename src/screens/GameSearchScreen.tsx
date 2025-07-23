import React, {useState} from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function GameSearchScreen(){
    const [query, setQuery] = useState('');
    const { t, i18n } = useTranslation();

    const games = [
  {
    id: 0,
    name: 'Wow',
  },
  {
    id: 1,
    name: 'Dota',
  },
  {
    id: 2,
    name: 'Zelda',
  },
];

    function handleSearch(){
        if(query.length > 2){
            console.log('===========', query)
        }
    }

    function renderItem( {item}: any) {
        console.log('===========', item.name)
        return (
            <TouchableOpacity 
                style={styles.item}
                onPress={()=> console.log('0000000000000')}
            >
                <Text style={styles.title}>{item.name}</Text>
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