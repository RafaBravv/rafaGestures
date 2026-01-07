import React from 'react';
import { View } from 'react-native';
import { CameraButton } from '../atoms/CameraButton';
import { galleryStyles } from '@/constants/galleryStyles';

interface CameraActionsProps {
  onTakePhoto: () => void;
  disabled?: boolean;
}

export const CameraActions: React.FC<CameraActionsProps> = ({ 
  onTakePhoto,
  disabled 
}) => {
  return (
    <View style={galleryStyles.cameraActionsContainer}>
      <CameraButton onPress={onTakePhoto} disabled={disabled} />
    </View>
  );
};