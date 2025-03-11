import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Collection } from '../../types/storage';
import { CollectionCard } from './CollectionCard';
import { colors } from '../../styles/colors';

interface CollectionListProps {
  collections: Collection[];
  onCollectionPress?: (collection: Collection) => void;
}

const CollectionList: React.FC<CollectionListProps> = ({ 
  collections,
  onCollectionPress 
}) => {
  if (collections.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No collections yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={collections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CollectionCard 
          collection={item} 
          onPress={() => onCollectionPress?.(item)}
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

export default CollectionList;