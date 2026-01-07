import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CardImage } from '../atoms/CardImage';
import { FavoriteBadge } from '../atoms/FavoriteBadge';
import { ImageItem } from '@/store/types';
import { galleryStyles } from '@/constants/galleryStyles';

interface GalleryCardProps {
  image: ImageItem;
  onPress: () => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ image, onPress }) => {
  return (
    <TouchableOpacity 
      style={galleryStyles.galleryCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={galleryStyles.galleryCardImageContainer}>
        <CardImage uri={image.uri} />
        {image.isFavorite && <FavoriteBadge />}
      </View>
    </TouchableOpacity>
  );
};