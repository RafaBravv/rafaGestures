import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen } from '../screens/HomeScreen';

export default function Index() {
  const [currentScreen, setCurrentScreen] = React.useState<'home' | 'favorites'>('home');

  const navigateToFavorites = () => {
    setCurrentScreen('favorites');
  };

  const navigateToHome = () => {
    setCurrentScreen('home');
  };

  return (
    // GestureHandler debe envolver a toda la APP
    <GestureHandlerRootView style={{flex: 1}}>
      {currentScreen === 'home' ? (
        <HomeScreen onNavigateToFavorites={navigateToFavorites} />
      ) : (
        // Aquí puedes agregar tu FavoritesScreen
        <HomeScreen onNavigateToFavorites={navigateToHome} />
      )}
    </GestureHandlerRootView>
  );
}