import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colores } from '@/constants/styles';

interface CameraButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const CameraButton: React.FC<CameraButtonProps> = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.icon}>📷</Text>
      <Text style={styles.text}>Tomar Foto</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colores.agua,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabled: {
    backgroundColor: colores.textSecondary,
    opacity: 0.5,
  },
  icon: {
    fontSize: 24,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});