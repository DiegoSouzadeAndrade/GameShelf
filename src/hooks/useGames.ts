import { useState } from 'react';
import rawgApi from '../api/rawg';
import { Game } from '../types/customTypes';
import { useTranslation } from 'react-i18next';

export function useGames() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>('');
    const { t } = useTranslation();

    async function searchGames(query: string){
        try {
            setLoading(true);
            setError(null);
            const response = await rawgApi.get('/games', {
                params: { search: query },
            });
            setGames(response.data.results);
        } catch (error) {
            setError(t('searchError'));
        } finally {
            setLoading(false);
        }
    }

    return {
        games,
        loading,
        error,
        searchGames,
    };
}