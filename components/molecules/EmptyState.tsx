import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '@/constants/styles';

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