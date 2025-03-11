import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useStorage } from '../hooks/useStorage';
import { useReadLater } from '../hooks/useReadLater';

interface SavedPage {
  title: string;
  url: string;
  timestamp: number;
}

interface Collection {
  id: string;
  name: string;
  pages: SavedPage[];
}

interface AppContextType {
  isOnline: boolean;
  isLoading: boolean;
  savedPages: SavedPage[];
  collections: Collection[];
  readLaterPages: SavedPage[];
  savePage: (page: SavedPage) => Promise<void>;
  addToReadLater: (page: SavedPage) => Promise<void>;
  createCollection: (collection: Collection) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isConnected } = useNetworkStatus();
  const { 
    savedPages, 
    collections, 
    savePage, 
    addCollection,
    loadSavedPages,
    loadCollections 
  } = useStorage();
  const { 
    readLaterPages, 
    addToReadLater,
    loadReadLater 
  } = useReadLater();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await Promise.all([
          loadSavedPages(),
          loadCollections(),
          loadReadLater(),
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const value = {
    isOnline: isConnected,
    isLoading,
    savedPages,
    collections,
    readLaterPages,
    savePage,
    addToReadLater,
    createCollection: addCollection,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};