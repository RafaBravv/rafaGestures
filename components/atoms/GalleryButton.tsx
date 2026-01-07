import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colores } from '@/constants/styles';

interface GalleryButtonProps {
  onPress: () => void;
  photosCount: number;
}

export const GalleryButton: React.FC<GalleryButtonProps> = ({ onPress, photosCount }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.icon}>🖼️</Text>
      <Text style={styles.text}>Galería ({photosCount})</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colores.negro,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    fontSize: 20,
  },
  text: {
    color: colores.blanco,
    fontSize: 16,
    fontWeight: '600',
  },
});