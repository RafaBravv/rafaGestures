import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface CardTitleProps {
  text: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ text }) => {
  return (
    <Text style={styles.title} numberOfLines={1}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});