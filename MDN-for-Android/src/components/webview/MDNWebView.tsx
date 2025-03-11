import React, { useState, useRef } from 'react';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

interface MDNWebViewProps {
  url: string;
  onNavigationStateChange: (navState: WebViewNavigation) => void;
  onSave: () => void;
}

const MDNWebView = React.forwardRef<WebView, MDNWebViewProps>(({ url, onNavigationStateChange, onSave }, ref) => {

  const webViewRef = useRef<WebView | null>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const handleNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    onNavigationStateChange(navState);
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        onNavigationStateChange={handleNavigationStateChange}
        style={styles.webview}
      />
      <View style={styles.navigationBar}>
        <TouchableOpacity 
          onPress={() => {
            if (webViewRef.current) {
              (webViewRef.current as WebView).goBack();
            }
          }}
          disabled={!canGoBack}
        >
          <Icon name="arrow-back" size={24} color={canGoBack ? '#000' : '#ccc'} />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {
            if (webViewRef.current) {
              (webViewRef.current as WebView).goForward();
            }
          }}
          disabled={!canGoForward}
        >
          <Icon name="arrow-forward" size={24} color={canGoForward ? '#000' : '#ccc'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (webViewRef.current) {
              (webViewRef.current as WebView).reload();
            }
          }}
        >
          <Icon name="refresh" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
});

export default MDNWebView;