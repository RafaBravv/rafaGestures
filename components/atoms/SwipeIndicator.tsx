import React from 'react';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

interface SwipeIndicatorProps {
  type: 'like' | 'nope';
  style?: any;
}

export const SwipeIndicator: React.FC<SwipeIndicatorProps> = ({ type, style }) => {
  const isLike = type === 'like';
  
  return (
    <Animated.View 
      style={[
        styles.indicator,
        isLike ? styles.likeIndicator : styles.nopeIndicator,
        style
      ]}
    >
      <Animated.Text style={isLike ? styles.likeText : styles.nopeText}>
        {isLike ? '❤️ LIKE' : '✕ NOPE'}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    top: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 4,
  },
  likeIndicator: {
    right: 30,
    borderColor: '#4ECDC4',
    backgroundColor: 'rgba(78, 205, 196, 0.4)',
  },
  nopeIndicator: {
    left: 30,
    borderColor: '#FF6B6B',
    backgroundColor: 'rgba(255, 107, 107, 0.4)',
  },
  likeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4ECDC4',
  },
  nopeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
});