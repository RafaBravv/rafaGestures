import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CameraButton } from '../atoms/CameraButton';
import { colores } from '@/constants/styles';

interface EmptyCameraStateProps {
  onTakePhoto: () => void;
}

export const EmptyCameraState: React.FC<EmptyCameraStateProps> = ({ onTakePhoto }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📸</Text>
      <Text style={styles.title}>No hay imágenes</Text>
      <Text style={styles.text}>
        Toma una foto para comenzar
      </Text>
      <View style={styles.buttonContainer}>
        <CameraButton onPress={onTakePhoto} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 40,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colores.negro,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: colores.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 10,
  },
});