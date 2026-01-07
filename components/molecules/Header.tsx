import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/constants/styles';

interface HeaderProps {
  title: string;
  favoritesCount: number;
  onFavoritesPress: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  favoritesCount, 
  onFavoritesPress 
}) => {
  return (
    <View>
      <SafeAreaView style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.favButton} onPress={onFavoritesPress}>
          <Text style={styles.favButtonText}>
            ⭐ Favoritos: {favoritesCount}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};