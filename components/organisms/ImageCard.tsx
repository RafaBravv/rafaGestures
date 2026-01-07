import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CardImage } from '../atoms/CardImage';
import { FavoriteBadge } from '../atoms/FavoriteBadge';
import { CardOverlay } from '../molecules/CardOverlay';
import { ImageItem } from '@/store/types';
import { CARD_CONFIG } from '@/constants/config';
import { colores } from '@/constants/styles';

interface ImageCardProps {
  image: ImageItem;
  showOverlay?: boolean;
}

// Componente refactorizado usando Atoms y Molecules
export const ImageCard: React.FC<ImageCardProps> = ({ 
  image, 
  showOverlay = true 
}) => {
  return (
    <View style={styles.card}>
      {/* Imagen principal - ATOM */}
      <CardImage uri={image.uri} />

      {/* Overlay con información - MOLECULE */}
      {showOverlay && <CardOverlay title={image.title} />}

      {/* Badge de favorito - ATOM */}
      {image.isFavorite && <FavoriteBadge />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    borderRadius: CARD_CONFIG.BORDER_RADIUS,
    backgroundColor: colores.blanco2,
    overflow: 'hidden',
    
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: CARD_CONFIG.SHADOW_RADIUS,
    elevation: 8,
  },
});