import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { colors } from '@/src/styles/colors';
import { Collection } from '@/src/types/storage';

interface CollectionCardProps {
  collection: Collection;
  onPress: (collection: Collection) => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(collection)}
    >
      <View style={styles.iconContainer}>
        <Icon name="folder" size={24} color={colors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{collection.name}</Text>
        <Text style={styles.count}>{collection.pages.length} pages</Text>
      </View>
      <Icon name="chevron-forward" size={24} color={colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 8,
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  count: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
});

export default CollectionCard;