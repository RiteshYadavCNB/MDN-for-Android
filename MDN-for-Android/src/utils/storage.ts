import AsyncStorage from '@react-native-async-storage/async-storage';

interface SavedPage {
  url: string;
  title: string;
  timestamp: number;
}

interface Collection {
  id: string;
  name: string;
  pages: SavedPage[];
}

export const StorageKeys = {
  SAVED_PAGES: 'saved_pages',
  COLLECTIONS: 'collections',
  READ_LATER: 'read_later',
};

export const savePageToStorage = async (page: SavedPage) => {
  try {
    const savedPages = await getSavedPages();
    const updatedPages = [...savedPages, page];
    await AsyncStorage.setItem(StorageKeys.SAVED_PAGES, JSON.stringify(updatedPages));
  } catch (error) {
    console.error('Error saving page:', error);
  }
};

export const getSavedPages = async (): Promise<SavedPage[]> => {
  try {
    const pages = await AsyncStorage.getItem(StorageKeys.SAVED_PAGES);
    return pages ? JSON.parse(pages) : [];
  } catch (error) {
    console.error('Error getting saved pages:', error);
    return [];
  }
};

export const createCollection = async (collection: Collection) => {
  try {
    const collections = await getCollections();
    const updatedCollections = [...collections, collection];
    await AsyncStorage.setItem(StorageKeys.COLLECTIONS, JSON.stringify(updatedCollections));
  } catch (error) {
    console.error('Error creating collection:', error);
  }
};

export const getCollections = async (): Promise<Collection[]> => {
  try {
    const collections = await AsyncStorage.getItem(StorageKeys.COLLECTIONS);
    return collections ? JSON.parse(collections) : [];
  } catch (error) {
    console.error('Error getting collections:', error);
    return [];
  }
};