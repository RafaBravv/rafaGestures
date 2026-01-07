import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colores } from '@/constants/styles';

interface ActionButtonProps {
  icon: string;
  onPress: () => void;
  variant: 'like' | 'nope';
  style?: ViewStyle;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  onPress, 
  variant,
  style 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.actionButton,
        variant === 'like' ? styles.likeButton : styles.nopeButton,
        style
      ]}
      onPress={onPress}
    >
      <Text style={styles.actionButtonIcon}>{icon}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
  nopeButton: {
    backgroundColor: colores.negro,
  },
  likeButton: {
    backgroundColor: colores.pink,
  },
  actionButtonIcon: {
    color: colores.blanco,
    fontSize: 32,
  },
});