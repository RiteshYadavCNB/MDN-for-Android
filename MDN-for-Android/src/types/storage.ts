export interface SavedPage {
    title: string;
    url: string;
    timestamp: number;
  }
  
  export interface Collection {
    id: string;
    name: string;
    pages: SavedPage[];
  }
  
  export interface StorageState {
    savedPages: SavedPage[];
    collections: Collection[];
    readLater: SavedPage[];
  }