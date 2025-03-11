import React, { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Ionicons';
import { AppProvider } from '../src/context/AppContext';
import { colors } from '../src/styles/colors';

// Import screens
import BrowseScreen from '../src/screens/browse/BrowseScreen';
import SavedPagesScreen from '../src/screens/saved/SavedPagesScreen';
import CollectionsScreen from '../src/screens/collections/CollectionsScreen';
import ReadLaterScreen from '../src/screens/readLater/ReadLaterScreen';

const Tab = createBottomTabNavigator();

// Custom hook to handle back button behavior
const useBackHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack(); // Navigate back if possible
      } else {
        // Show exit confirmation if there is no screen to go back to
        Alert.alert('Exit App', 'Do you want to exit the app?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Exit', onPress: () => BackHandler.exitApp() },
        ]);
      }
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [navigation]);
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Icon.glyphMap = 'help-outline';
          switch (route.name) {
            case 'Browse':
              iconName = focused ? 'globe' : 'globe-outline';
              break;
            case 'Saved':
              iconName = focused ? 'bookmark' : 'bookmark-outline';
              break;
            case 'Collections':
              iconName = focused ? 'folder' : 'folder-outline';
              break;
            case 'Read Later':
              iconName = focused ? 'time' : 'time-outline';
              break;
            default:
              iconName = 'help-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopColor: colors.border,
          backgroundColor: colors.background,
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTitleStyle: {
          color: colors.text,
          fontSize: 18,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Browse" component={BrowseScreen} options={{ title: 'MDN Browser' }} />
      <Tab.Screen name="Saved" component={SavedPagesScreen} options={{ title: 'Saved Pages' }} />
      <Tab.Screen name="Collections" component={CollectionsScreen} options={{ title: 'My Collections' }} />
      <Tab.Screen name="Read Later" component={ReadLaterScreen} options={{ title: 'Read Later' }} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AppProvider>
          <BackHandlerWrapper />
          <TabNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
};

// Wrapper to use the back button handler inside NavigationContainer
const BackHandlerWrapper = () => {
  useBackHandler(); // Apply the back button handling globally
  return null;
};

export default App;
