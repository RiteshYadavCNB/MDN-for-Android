import { useState, useCallback } from 'react';
import { 
  savePageToStorage, 
  getSavedPages, 
  createCollection, 
  getCollections 
} from '../utils/storage';
import { SavedPage, Collection } from '@/src/types/storage';

export const useStorage = () => {
  const [savedPages, setSavedPages] = useState<SavedPage[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

  const loadSavedPages = useCallback(async () => {
    const pages = await getSavedPages();
    setSavedPages(pages);
  }, []);

  const loadCollections = useCallback(async () => {
    const cols = await getCollections();
    setCollections(cols);
  }, []);

  const savePage = useCallback(async (page: SavedPage) => {
    await savePageToStorage(page);
    loadSavedPages();
  }, [loadSavedPages]);

  const addCollection = useCallback(async (collection: Collection) => {
    await createCollection(collection);
    loadCollections();
  }, [loadCollections]);

  return {
    savedPages,
    collections,
    savePage,
    addCollection,
    loadSavedPages,
    loadCollections,
  };
};