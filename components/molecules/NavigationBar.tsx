import React from 'react';
import { View } from 'react-native';
import { CameraButton } from '../atoms/CameraButton';
import { GalleryButton } from '../atoms/GalleryButton';
import { galleryStyles } from '@/constants/galleryStyles';

interface NavigationBarProps {
  onTakePhoto: () => void;
  onOpenGallery: () => void;
  photosCount: number;
  disabled?: boolean;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ 
  onTakePhoto,
  onOpenGallery,
  photosCount,
  disabled 
}) => {
  return (
    <View style={galleryStyles.navigationBar}>
      <GalleryButton onPress={onOpenGallery} photosCount={photosCount} />
      <CameraButton onPress={onTakePhoto} disabled={disabled} />
    </View>
  );
};