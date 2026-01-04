import React from 'react';
import { View, Image, Text } from 'react-native';
import { ImageCardProps } from '../store/types';
import { cardStyles } from '@/constants/cardStyles';

// Componente de las tarjetas de imagen individual
export const ImageCard: React.FC<ImageCardProps> = ({ image, showOverlay = true }) => {
  return (
    <View style={cardStyles.card}>
      {/* Imagen principal */}
      <Image 
        source={{ uri: image.uri }} 
        style={cardStyles.image}
        resizeMode="cover"
      />

      {/* Overlay con información */}
      {showOverlay && (
        <View style={cardStyles.overlay}>
          {image.title && (
            <Text style={cardStyles.title} numberOfLines={1}>
              {image.title}
            </Text>
          )}
        </View>
      )}

      {/* Badge de favorito (si aplica) */}
      {image.isFavorite && (
        <View style={cardStyles.favoriteBadge}>
          <Text style={cardStyles.favoriteIcon}>⭐</Text>
        </View>
      )}
    </View>
  );
};