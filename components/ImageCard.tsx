import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { ImageCardProps } from '../store/types';
import { CARD_CONFIG, COLORS } from '../constants/config';

/**
 * Componente de tarjeta de imagen individual
 * Como una carta de un mazo: tiene frente y puede tener información adicional
 */
export const ImageCard: React.FC<ImageCardProps> = ({ 
  image, 
  showOverlay = true 
}) => {
  return (
    <View style={styles.card}>
      {/* Imagen principal */}
      <Image 
        source={{ uri: image.uri }} 
        style={styles.image}
        resizeMode="cover"
      />

      {/* Overlay con información (opcional) */}
      {showOverlay && (
        <View style={styles.overlay}>
          {image.title && (
            <Text style={styles.title} numberOfLines={1}>
              {image.title}
            </Text>
          )}
          {image.description && (
            <Text style={styles.description} numberOfLines={2}>
              {image.description}
            </Text>
          )}
        </View>
      )}

      {/* Badge de favorito (si aplica) */}
      {image.isFavorite && (
        <View style={styles.favoriteBadge}>
          <Text style={styles.favoriteIcon}>⭐</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    borderRadius: CARD_CONFIG.BORDER_RADIUS,
    backgroundColor: COLORS.cardBackground,
    overflow: 'hidden',
    
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: CARD_CONFIG.SHADOW_RADIUS,
    
    // Sombra para Android
    elevation: 8,
  },
  
  image: {
    width: '100%',
    height: '100%',
  },
  
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.overlay,
    padding: 20,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  
  description: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  
  favoriteBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    
    // Sombra
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  favoriteIcon: {
    fontSize: 20,
  },
});