import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colores } from '@/constants/styles';

interface CounterTextProps {
  current: number;
  total: number;
}

export const CounterText: React.FC<CounterTextProps> = ({ current, total }) => {
  return (
    <Text style={styles.counter}>
      {current} / {total}
    </Text>
  );
};

const styles = StyleSheet.create({
  counter: {
    fontSize: 16,
    color: colores.textSecondary,
    fontWeight: '600',
  },
});