import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { colors } from '@/src/styles/colors';

interface WebViewControlsProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onBackPress: () => void;
  onForwardPress: () => void;
  onRefreshPress: () => void;
  onSavePress: () => void;
}

const WebViewControls: React.FC<WebViewControlsProps> = ({
  canGoBack,
  canGoForward,
  onBackPress,
  onForwardPress,
  onRefreshPress,
  onSavePress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={onBackPress} 
        disabled={!canGoBack}
        style={styles.button}
      >
        <Icon 
          name="arrow-back" 
          size={24} 
          color={canGoBack ? colors.primary : colors.disabled} 
        />
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={onForwardPress} 
        disabled={!canGoForward}
        style={styles.button}
      >
        <Icon 
          name="arrow-forward" 
          size={24} 
          color={canGoForward ? colors.primary : colors.disabled} 
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onRefreshPress} style={styles.button}>
        <Icon name="refresh" size={24} color={colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSavePress} style={styles.button}>
        <Icon name="bookmark-outline" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  button: {
    padding: 8,
  },
});

export default WebViewControls;