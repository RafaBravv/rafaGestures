import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwipeableCard } from '../components/organisms/SwipeableCard';
import { Header } from '../components/molecules/Header';
import { EmptyState } from '../components/molecules/EmptyState';
import { CounterText } from '../components/atoms/CounterText';

import ImageService from '../services/ImageService';
import { ImageItem } from '../store/types';

import { colores, styles } from '../constants/styles';

interface HomeScreenProps {
  onNavigateToFavorites: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigateToFavorites }) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [favorites, setFavorites] = useState<ImageItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setIsLoading(true);
      const loadedImages = await ImageService.fetchImagesFromAPI();
      setImages(loadedImages);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwipeRight = () => {
    const currentImage = images[currentIndex];
    if (currentImage) {
      const favoriteImage = ImageService.addToFavorites(currentImage);
      setFavorites(prev => [...prev, favoriteImage]);
      ImageService.saveFavoritesToStorage([...favorites, favoriteImage]);
    }
    setCurrentIndex(prev => prev + 1);
  };

  const handleSwipeLeft = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    loadImages();
  };

  const currentImage = images[currentIndex];
  const hasMoreImages = currentIndex < images.length;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colores.agua} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header - MOLECULE */}
      <Header
        title="Selector de imágenes"
        favoritesCount={favorites.length}
        onFavoritesPress={onNavigateToFavorites}
      />

      <SafeAreaView style={styles.container}>
        {/* Área de cards */}
        <View style={styles.cardContainer}>
          {hasMoreImages && currentImage ? (
            <SwipeableCard
              key={currentImage.id}
              image={currentImage}
              onSwipeRight={handleSwipeRight}
              onSwipeLeft={handleSwipeLeft}
            />
          ) : (
            <EmptyState onReset={handleReset} />
          )}
        </View>

        {/* Controles y contador */}
        {hasMoreImages && (
          <>
            <View style={styles.counterContainer}>
              <CounterText 
                current={currentIndex + 1} 
                total={images.length} 
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </View>
  );
};