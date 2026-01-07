import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colores } from '@/constants/styles';

interface EmptyStateProps {
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>🎉</Text>
      <Text style={styles.emptyTitle}>¡Terminaste!</Text>
      <Text style={styles.emptyText}>
        Has revisado todas las imágenes
      </Text>
      <TouchableOpacity 
        style={styles.resetButton}
        onPress={onReset}
      >
        <Text style={styles.resetButtonText}>🔄 Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colores.blanco,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: colores.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  resetButton: {
    backgroundColor: colores.agua,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});