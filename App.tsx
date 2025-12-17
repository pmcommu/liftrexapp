/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from './src/navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from "react-redux";
import { store } from "./src/redux/story";
export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
  <Provider store={store}>
     <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />

        <RootNavigator />
      </SafeAreaProvider>
  
  </GestureHandlerRootView>
  </Provider>
  );
}