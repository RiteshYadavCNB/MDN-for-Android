import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SavedPage } from '../../types/storage';
import SavedPageCard  from '@/src/components/saved/SavedPageCard';
import { colors } from '@/src/styles/colors';

interface SavedPageListProps {
  pages: SavedPage[];
  onPagePress?: (page: SavedPage) => void;
  emptyMessage?: string;
}

const SavedPageList: React.FC<SavedPageListProps> = ({ 
  pages,
  onPagePress,
  emptyMessage = 'No saved pages' 
}) => {
  if (pages.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={pages}
      keyExtractor={(item) => item.url}
      renderItem={({ item }) => (
        <SavedPageCard 
          page={item} 
          onPress={() => onPagePress?.(item)}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});

export default SavedPageList;