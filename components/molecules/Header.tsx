import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colores } from '@/constants/styles';

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

const styles = StyleSheet.create({
  header: {
    backgroundColor: colores.negro,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 5,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colores.blanco,
  },
  favButton: {
    backgroundColor: colores.blanco,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 20,
  },
  favButtonText: {
    color: colores.negro,
    fontSize: 14,
    fontWeight: '500',
  },
});