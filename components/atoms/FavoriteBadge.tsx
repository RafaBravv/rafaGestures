import React from 'react';
import { View, Text } from 'react-native';
import { cardStyles } from '@/constants/cardStyles';

export const FavoriteBadge: React.FC = () => {
  return (
    <View style={cardStyles.favoriteBadge}>
      <Text style={cardStyles.favoriteIcon}>⭐</Text>
    </View>
  );
};