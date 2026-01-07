import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface CardImageProps {
  uri: string;
}

export const CardImage: React.FC<CardImageProps> = ({ uri }) => {
  return (
    <Image 
      source={{ uri }} 
      style={styles.image}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});