import { storage } from "../store/storage";
import { store } from "../store";
import { addGame } from "../store/slices/collectionSlice";
import { GameStatus } from "../types/customTypes";

describe('Redux + MMKV Storage', () => {
  beforeEach(() => {
    storage.clearAll();
  });
  
  it('should load preloaded state from MMKV', () => {
    storage.set('state', JSON.stringify({ games: { list: [{ id: 1, name: 'Zelda' }] } }));

    const { store: preloadedStore } = require('../store');

    expect(preloadedStore.getState().games.list).toEqual([{ id: 1, name: 'Zelda' }]);
  });
  
  it('should save state to MMKV on dispatch', () => {
    store.dispatch(addGame({ id: 2, name: 'Mario', status: GameStatus.WISHLIST, background_image: '' }));

    const saved = JSON.parse(storage.getString('state')!);
    expect(saved.games.list).toEqual([{ id: 2, name: 'Mario', status: GameStatus.WISHLIST, background_image: '' }]);
  });

  it('should persist state after multiple actions', () => {
    store.dispatch(addGame({ id: 3, name: 'Final Fantasy', status: GameStatus.PLAYING, background_image: '' }));
    store.dispatch(addGame({ id: 4, name: 'Metroid', status: GameStatus.WISHLIST, background_image: '' }));

    const saved = JSON.parse(storage.getString('state')!);
    expect(saved.games.list.length).toBe(2);
  });
});
