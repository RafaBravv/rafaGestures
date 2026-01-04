import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwipeableCard } from '../components/SwipeableCard';
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

  // Carga inicial de imágenes
  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setIsLoading(true);
      // Carga imágenes (puedes cambiar esto por tu propia fuente)
      const loadedImages = await ImageService.fetchImagesFromAPI();
      setImages(loadedImages);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Maneja swipe a la derecha (LIKE) =========================
  const handleSwipeRight = () => {
    const currentImage = images[currentIndex];
    if (currentImage) {
      const favoriteImage = ImageService.addToFavorites(currentImage);
      setFavorites(prev => [...prev, favoriteImage]);
      
      // Opcional: Guarda en almacenamiento local
      ImageService.saveFavoritesToStorage([...favorites, favoriteImage]);
    }
    
    // Avanza a la siguiente imagen
    setCurrentIndex(prev => prev + 1);
  };

  // Maneja swipe a la izquierda (NOPE) =========================
  const handleSwipeLeft = () => {
    // Simplemente avanza a la siguiente imagen
    setCurrentIndex(prev => prev + 1);
  };

  // Reinicia el selector =======================================
  const handleReset = () => {
    setCurrentIndex(0);
    loadImages();
  };

  // Obtiene la imagen actual
  const currentImage = images[currentIndex];
  const hasMoreImages = currentIndex < images.length;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colores.agua} />
          <Text style={styles.loadingText}>Cargando imágenes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View>
        <SafeAreaView style={styles.header}>
          <Text style={styles.title}>Selector de imágenes</Text>
          <TouchableOpacity style={styles.favButton} onPress={onNavigateToFavorites}>
            <Text style={styles.favButtonText}>⭐ Favoritos: {favorites.length}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <SafeAreaView style={styles.container}>
        {/* Área de cards */}
        <View style={styles.cardContainer}>
          {hasMoreImages && currentImage ? (
            <>
              {/* Card actual */}
              <SwipeableCard
                key={currentImage.id}
                image={currentImage}
                onSwipeRight={handleSwipeRight}
                onSwipeLeft={handleSwipeLeft}
              />
            </>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🎉</Text>
              <Text style={styles.emptyTitle}>¡Terminaste!</Text>
              <Text style={styles.emptyText}>
                Has revisado todas las imágenes
              </Text>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={handleReset}
              >
                <Text style={styles.resetButtonText}>🔄 Reiniciar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Controles */}
        {hasMoreImages && (
          <>
            <View style={styles.controls}>
              <TouchableOpacity
                style={[styles.actionButton, styles.nopeButton]}
                onPress={handleSwipeLeft}
              >
                <Text style={styles.actionButtonIcon}>✕</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.likeButton]}
                onPress={handleSwipeRight}
              >
                <Text style={styles.actionButtonIcon}>🤍</Text>
              </TouchableOpacity>
            </View>

            {/* Contador */}
            <View style={styles.counterContainer}>
              <Text style={styles.counter}>
                {currentIndex + 1} / {images.length}
              </Text>
            </View>
          </>
        )}
      </SafeAreaView>
    </View>
  );
};