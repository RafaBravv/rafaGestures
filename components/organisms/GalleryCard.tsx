import React from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import { CardImage } from '../atoms/CardImage';
import { FavoriteBadge } from '../atoms/FavoriteBadge';
import { ImageItem } from '@/store/types';
import { colores } from '@/constants/styles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columnas con padding

interface GalleryCardProps {
  image: ImageItem;
  onPress: () => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ image, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <CardImage uri={image.uri} />
        {image.isFavorite && <FavoriteBadge />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.3,
    margin: 8,
    borderRadius: 15,
    backgroundColor: colores.blanco2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
});