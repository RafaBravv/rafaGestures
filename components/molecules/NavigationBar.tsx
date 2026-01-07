import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CameraButton } from '../atoms/CameraButton';
import { GalleryButton } from '../atoms/GalleryButton';

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
    <View style={styles.container}>
      <GalleryButton onPress={onOpenGallery} photosCount={photosCount} />
      <CameraButton onPress={onTakePhoto} disabled={disabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 15,
  },
});