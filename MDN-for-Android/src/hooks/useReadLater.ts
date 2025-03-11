import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SavedPage } from '../types/storage';
import { StorageKeys } from '@/src/utils/constants';

export const useReadLater = () => {
  const [readLaterPages, setReadLaterPages] = useState<SavedPage[]>([]);

  const loadReadLater = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem(StorageKeys.READ_LATER);
      if (data) {
        setReadLaterPages(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading read later pages:', error);
    }
  }, []);

  const addToReadLater = useCallback(async (page: SavedPage) => {
    try {
      const updatedPages = [...readLaterPages, page];
      await AsyncStorage.setItem(
        StorageKeys.READ_LATER,
        JSON.stringify(updatedPages)
      );
      setReadLaterPages(updatedPages);
    } catch (error) {
      console.error('Error adding to read later:', error);
    }
  }, [readLaterPages]);

  const removeFromReadLater = useCallback(async (url: string) => {
    try {
      const updatedPages = readLaterPages.filter(page => page.url !== url);
      await AsyncStorage.setItem(
        StorageKeys.READ_LATER,
        JSON.stringify(updatedPages)
      );
      setReadLaterPages(updatedPages);
    } catch (error) {
      console.error('Error removing from read later:', error);
    }
  }, [readLaterPages]);

  return {
    readLaterPages,
    loadReadLater,
    addToReadLater,
    removeFromReadLater,
  };
};