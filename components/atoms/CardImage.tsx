import React from 'react';
import { Image } from 'react-native';
import { cardStyles } from '@/constants/cardStyles';

interface CardImageProps {
  uri: string;
}

export const CardImage: React.FC<CardImageProps> = ({ uri }) => {
  return (
    <Image 
      source={{ uri }} 
      style={cardStyles.image}
      resizeMode="cover"
    />
  );
};