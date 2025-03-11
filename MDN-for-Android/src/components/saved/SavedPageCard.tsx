import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { SavedPage } from '../../types/storage';
import { colors } from '../../styles/colors';

interface SavedPageCardProps {
  page: SavedPage;
  onPress: (page: SavedPage) => void;
}

const SavedPageCard: React.FC<SavedPageCardProps> = ({ page, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(page)}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {page.title}
        </Text>
        <Text style={styles.url} numberOfLines={1}>
          {page.url}
        </Text>
        <Text style={styles.date}>
          {new Date(page.timestamp).toLocaleDateString()}
        </Text>
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
  content: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  url: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default SavedPageCard;