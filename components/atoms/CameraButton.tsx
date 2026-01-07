import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { buttonStyles } from '@/constants/buttonStyles';

interface CameraButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const CameraButton: React.FC<CameraButtonProps> = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[buttonStyles.cameraButton, disabled && buttonStyles.cameraButtonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={buttonStyles.cameraButtonIcon}>📷</Text>
      <Text style={buttonStyles.cameraButtonText}>Tomar Foto</Text>
    </TouchableOpacity>
  );
};