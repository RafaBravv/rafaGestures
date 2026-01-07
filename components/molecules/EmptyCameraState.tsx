import React from 'react';
import { View, Text } from 'react-native';
import { CameraButton } from '../atoms/CameraButton';
import { styles } from '@/constants/styles';

interface EmptyCameraStateProps {
  onTakePhoto: () => void;
}

export const EmptyCameraState: React.FC<EmptyCameraStateProps> = ({ onTakePhoto }) => {
  return (
    <View style={styles.emptyCameraState}>
      <Text style={styles.emptyCameraIcon}>📸</Text>
      <Text style={styles.emptyCameraTitle}>No hay imágenes</Text>
      <Text style={styles.emptyCameraText}>
        Toma una foto para comenzar
      </Text>
      <View style={styles.emptyCameraButtonContainer}>
        <CameraButton onPress={onTakePhoto} />
      </View>
    </View>
  );
};