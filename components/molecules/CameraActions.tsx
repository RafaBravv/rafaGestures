import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CameraButton } from '../atoms/CameraButton';

interface CameraActionsProps {
  onTakePhoto: () => void;
  disabled?: boolean;
}

export const CameraActions: React.FC<CameraActionsProps> = ({ 
  onTakePhoto,
  disabled 
}) => {
  return (
    <View style={styles.container}>
      <CameraButton onPress={onTakePhoto} disabled={disabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});