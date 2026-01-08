import React from 'react';
import Animated from 'react-native-reanimated';
import { swipeStyles } from '@/constants/swipeStyles';

interface SwipeIndicatorProps {
  type: 'like' | 'nope';
  style?: any;
}

export const SwipeIndicator: React.FC<SwipeIndicatorProps> = ({ type, style }) => {
  const isLike = type === 'like';
  
  return (
    <Animated.View 
      style={[
        swipeStyles.indicator,
        isLike ? swipeStyles.likeIndicator : swipeStyles.nopeIndicator,
        style
      ]}
    >
      <Animated.Text style={isLike ? swipeStyles.likeText : swipeStyles.nopeText}>
        {isLike ? '❤️ LIKE' : '🗑️ DELETE'}
      </Animated.Text>
    </Animated.View>
  );
};