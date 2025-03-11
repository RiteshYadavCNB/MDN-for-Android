import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import MDNWebView from '@/src/components/webview/MDNWebView';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '@/src/types/navigation';
import { useStorage } from '@/src/hooks/useStorage';
import { colors } from '@/src/styles/colors';


type BrowseScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Browse'>;

const DEFAULT_URL = 'https://developer.mozilla.org/';

const BrowseScreen: React.FC = () => {
  const navigation = useNavigation<BrowseScreenNavigationProp>();
  const [currentUrl, setCurrentUrl] = useState(DEFAULT_URL);
  const { savePage } = useStorage();
  const webViewRef = useRef<WebView>(null);

  const handleNavigationStateChange = (navState: any) => {
    setCurrentUrl(navState.url);
  };

  const handleSavePage = async () => {
    const title = await webViewRef.current?.injectJavaScript(
      'window.document.title'
    );
    if (title) {
      savePage({
        url: currentUrl,
        title,
        timestamp: Date.now(),
      });
    }
  };

  return (
    <View style={styles.container}>
      <MDNWebView
        ref={webViewRef}
        url={currentUrl}
        onNavigationStateChange={handleNavigationStateChange}
        onSave={handleSavePage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default BrowseScreen;