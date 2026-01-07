import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwipeableCard } from '../components/organisms/SwipeableCard';
import { Header } from '../components/molecules/Header';
import { EmptyState } from '../components/molecules/EmptyState';
import { EmptyCameraState } from '../components/molecules/EmptyCameraState';
import { CameraActions } from '../components/molecules/CameraActions';
import { CounterText } from '../components/atoms/CounterText';

import ImageService from '../services/ImageService';
import CameraService from '../services/CameraService';
import { ImageItem } from '../store/types';

import { colores, styles } from '../constants/styles';

interface HomeScreenProps {
  onNavigateToFavorites: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigateToFavorites }) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [favorites, setFavorites] = useState<ImageItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);

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

  /**
   * Toma una foto con la cámara
   */
  const handleTakePhoto = async () => {
    try {
      setIsTakingPhoto(true);
      const newImage = await CameraService.takePicture();
      
      if (newImage) {
        // Agregar la nueva imagen al principio del array
        setImages(prev => ImageService.addImage(prev, newImage));
        
        // Si no había imágenes, mostrar la nueva inmediatamente
        if (images.length === 0) {
          setCurrentIndex(0);
        }
        
        Alert.alert('¡Éxito!', 'Foto capturada correctamente');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert(
        'Error', 
        'No se pudo tomar la foto. Verifica los permisos de cámara.'
      );
    } finally {
      setIsTakingPhoto(false);
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
  };

  const currentImage = images[currentIndex];
  const hasMoreImages = currentIndex < images.length;
  const hasNoImages = images.length === 0;

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
          {hasNoImages ? (
            // Estado inicial sin imágenes
            <EmptyCameraState onTakePhoto={handleTakePhoto} />
          ) : hasMoreImages && currentImage ? (
            // Mostrar card actual
            <SwipeableCard
              key={currentImage.id}
              image={currentImage}
              onSwipeRight={handleSwipeRight}
              onSwipeLeft={handleSwipeLeft}
            />
          ) : (
            // Todas las imágenes revisadas
            <EmptyState onReset={handleReset} />
          )}
        </View>

        {/* Controles de cámara y contador */}
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
            
            {/* Botón de cámara siempre visible */}
            <CameraActions 
              onTakePhoto={handleTakePhoto}
              disabled={isTakingPhoto}
            />
          </>
        )}
      </SafeAreaView>
    </View>
  );
};