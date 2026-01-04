import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen } from '../screens/HomeScreen';
import { StyleSheet } from 'react-native';

/**
 * Componente raíz de la aplicación
 * IMPORTANTE: GestureHandlerRootView debe envolver toda la app
 */
export default function Index() {
  const [currentScreen, setCurrentScreen] = React.useState<'home' | 'favorites'>('home');

  const navigateToFavorites = () => {
    setCurrentScreen('favorites');
  };

  const navigateToHome = () => {
    setCurrentScreen('home');
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {currentScreen === 'home' ? (
        <HomeScreen onNavigateToFavorites={navigateToFavorites} />
      ) : (
        // Aquí puedes agregar tu FavoritesScreen
        <HomeScreen onNavigateToFavorites={navigateToHome} />
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});