import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const FavoriteBadge: React.FC = () => {
  return (
    <View style={styles.favoriteBadge}>
      <Text style={styles.favoriteIcon}>⭐</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  favoriteBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  favoriteIcon: {
    fontSize: 20,
  },
});