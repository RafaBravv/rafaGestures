import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CardTitle } from '../atoms/CardTitle';
import { colores } from '@/constants/styles';

interface CardOverlayProps {
  title?: string;
}

export const CardOverlay: React.FC<CardOverlayProps> = ({ title }) => {
  if (!title) return null;
  
  return (
    <View style={styles.overlay}>
      <CardTitle text={title} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colores.overlay,
    padding: 20,
  },
});