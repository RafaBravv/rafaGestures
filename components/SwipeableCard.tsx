import React from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { ImageCard } from './ImageCard';
import { SwipeableCardProps } from '../store/types';
import { useImageGesture } from '../hooks/useImageGesture';
import { swipeStyles } from '../constants/swipeStyles';

// Card con capacidad de swipe usando Gesture Handler
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
      <Animated.View style={[swipeStyles.container, animatedStyle]}>
        {/* La card de imagen */}
        <ImageCard image={image} />

        {/* Indicador LIKE (aparece al deslizar derecha) */}
        <Animated.View style={[swipeStyles.indicator, swipeStyles.likeIndicator, likeIndicatorStyle]}>
          <Animated.Text style={swipeStyles.likeText}>❤️ LIKE</Animated.Text>
        </Animated.View>

        {/* Indicador NOPE (aparece al deslizar izquierda) */}
        <Animated.View style={[swipeStyles.indicator, swipeStyles.nopeIndicator, nopeIndicatorStyle]}>
          <Animated.Text style={swipeStyles.nopeText}>✕ NOPE</Animated.Text>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};