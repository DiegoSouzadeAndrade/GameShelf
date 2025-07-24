import { saveState, loadState, clearState } from '../store/storage/persist';
import { storage } from '../store/storage';

describe('Manual Persist with MMKV', () => {
  beforeEach(() => {
    storage.clearAll();
  });

  const mockState = {
    games: {
      wishlist: [{ id: 1, name: 'Zelda' }],
      playing: [],
      finished: [],
    },
  };

  it('should save and load state correctly', () => {
    saveState(mockState as any);
    const loaded = loadState();
    expect(loaded).toEqual(mockState);
  });

  it('should return undefined if no state is saved', () => {
    const loaded = loadState();
    expect(loaded).toBeUndefined();
  });

  it('should clear persisted state', () => {
    saveState(mockState as any);
    clearState();
    expect(loadState()).toBeUndefined();
  });
    
  it('should handle invalid JSON gracefully', () => {
    storage.set('state', '{invalid json}');
    const loaded = loadState();
    expect(loaded).toBeUndefined();
  });

  it('should overwrite previous state when saving again', () => {
    saveState({ games: [{ id: 1, name: 'Zelda' }] });
    saveState({ games: [{ id: 2, name: 'Mario' }] });

    const loaded = loadState();
    expect(loaded).toEqual({ games: [{ id: 2, name: 'Mario' }] });
  });
});