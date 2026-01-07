import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { buttonStyles } from '@/constants/buttonStyles';

interface GalleryButtonProps {
  onPress: () => void;
  photosCount: number;
}

export const GalleryButton: React.FC<GalleryButtonProps> = ({ onPress, photosCount }) => {
  return (
    <TouchableOpacity style={buttonStyles.galleryButton} onPress={onPress}>
      <Text style={buttonStyles.galleryButtonIcon}>🖼️</Text>
    </TouchableOpacity>
  );
};