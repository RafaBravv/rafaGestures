import React from 'react';
import { Text } from 'react-native';
import { styles } from '@/constants/styles';

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