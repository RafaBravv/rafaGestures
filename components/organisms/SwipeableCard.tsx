import React from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { ImageCard } from './ImageCard';
import { SwipeIndicator } from '../atoms/SwipeIndicator';
import { SwipeableCardProps } from '@/store/types';
import { useImageGesture } from '@/hooks/useImageGesture';
import { CARD_CONFIG } from '@/constants/config';

// Card refactorizada usando Atoms y Molecules
export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  image,
  onSwipeRight,
  onSwipeLeft,
  onSwipeUp,
  onSwipeDown,
}) => {
  const {
    panGesture,
    animatedStyle,
    likeIndicatorStyle,
    nopeIndicatorStyle,
  } = useImageGesture({
    onSwipeRight,
    onSwipeLeft,
    onSwipeUp,
    onSwipeDown,
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {/* La card de imagen - ORGANISM */}
        <ImageCard image={image} />

        {/* Indicadores usando ATOMS */}
        <SwipeIndicator 
          type="like" 
          style={likeIndicatorStyle} 
        />
        <SwipeIndicator 
          type="nope" 
          style={nopeIndicatorStyle} 
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_CONFIG.WIDTH,
    height: CARD_CONFIG.HEIGHT,
    position: 'absolute',
  },
});