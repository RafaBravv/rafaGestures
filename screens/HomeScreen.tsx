import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwipeableCard } from '../components/organisms/SwipeableCard';
import { Header } from '../components/molecules/Header';
import { EmptyState } from '../components/molecules/EmptyState';
import { EmptyCameraState } from '../components/molecules/EmptyCameraState';
import { NavigationBar } from '../components/molecules/NavigationBar';
import { CounterText } from '../components/atoms/CounterText';

import { ImageItem } from '../store/types';
import { colores, styles } from '../constants/styles';

interface HomeScreenProps {
  images: ImageItem[];
  currentIndex: number;
  onTakePhoto: () => void;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  onReset: () => void;
  onNavigateToGallery: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ 
  images,
  currentIndex,
  onTakePhoto,
  onSwipeRight,
  onSwipeLeft,
  onReset,
  onNavigateToGallery,
}) => {
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);

  const handleTakePhoto = async () => {
    setIsTakingPhoto(true);
    await onTakePhoto();
    setIsTakingPhoto(false);
  };

  const currentImage = images[currentIndex];
  const hasMoreImages = currentIndex < images.length;
  const hasNoImages = images.length === 0;
  
  // Contar favoritas correctamente
  const favoritesCount = images.filter(img => img.isFavorite).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title="Selector de imágenes"
        favoritesCount={favoritesCount}
        onFavoritesPress={onNavigateToGallery}
      />

      <SafeAreaView style={styles.container}>
        {/* Área de cards */}
        <View style={styles.cardContainer}>
          {hasNoImages ? (
            // Estado inicial sin imágenes
            <EmptyCameraState onTakePhoto={handleTakePhoto} />
          ) : hasMoreImages && currentImage ? (
            // Mostrar card actual
            <SwipeableCard
              key={currentImage.id}
              image={currentImage}
              onSwipeRight={onSwipeRight}
              onSwipeLeft={onSwipeLeft}
            />
          ) : (
            // Todas las imágenes revisadas
            <EmptyState onReset={onReset} />
          )}
        </View>

        {/* Controles de navegación y contador */}
        {!hasNoImages && (
          <>
            {hasMoreImages && (
              <View style={styles.counterContainer}>
                <CounterText 
                  current={currentIndex + 1} 
                  total={images.length} 
                />
              </View>
            )}
            
            {/* Barra de navegación con cámara y galería */}
            <NavigationBar 
              onTakePhoto={handleTakePhoto}
              onOpenGallery={onNavigateToGallery}
              photosCount={images.length}
              disabled={isTakingPhoto}
            />
          </>
        )}
      </SafeAreaView>
    </View>
  );
};