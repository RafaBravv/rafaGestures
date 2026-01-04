import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { SwipeableCard } from '../components/SwipeableCard';
import ImageService from '../services/ImageService';
import { ImageItem } from '../store/types';
import { COLORS, SCREEN } from '../constants/config';

interface HomeScreenProps {
  onNavigateToFavorites: () => void;
}

/**
 * Pantalla principal con el selector de imágenes estilo Tinder
 * Como un mazo de cartas que vas revisando una por una
 */
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

  /**
   * Maneja swipe a la derecha (LIKE)
   */
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

  /**
   * Maneja swipe a la izquierda (NOPE)
   */
  const handleSwipeLeft = () => {
    // Simplemente avanza a la siguiente imagen
    setCurrentIndex(prev => prev + 1);
  };

  /**
   * Reinicia el selector
   */
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
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Cargando imágenes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Image Selector</Text>
        <TouchableOpacity 
          style={styles.favButton}
          onPress={onNavigateToFavorites}
        >
          <Text style={styles.favButtonText}>⭐ {favorites.length}</Text>
        </TouchableOpacity>
      </View>

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

            {/* Previsualización de la siguiente card (opcional) */}
            {images[currentIndex + 1] && (
              <View style={styles.nextCardPreview}>
                {/* Puedes renderizar una versión reducida de la siguiente card */}
              </View>
            )}
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
              <Text style={styles.actionButtonIcon}>❤️</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  
  favButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  
  favButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  nextCardPreview: {
    position: 'absolute',
    width: SCREEN.WIDTH * 0.85,
    height: SCREEN.HEIGHT * 0.6,
    backgroundColor: '#ddd',
    borderRadius: 20,
    zIndex: -1,
    transform: [{ scale: 0.95 }],
  },
  
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  
  emptyTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  
  resetButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    gap: 40,
  },
  
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  
  nopeButton: {
    backgroundColor: COLORS.nope,
  },
  
  likeButton: {
    backgroundColor: COLORS.like,
  },
  
  actionButtonIcon: {
    fontSize: 32,
  },
  
  counterContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  
  counter: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
});