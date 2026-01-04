import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { ImageCard } from './ImageCard';
import { SwipeableCardProps } from '../store/types';
import { useImageGesture } from '../hooks/useImageGesture';
import { CARD_CONFIG } from '../constants/config';

/**
 * Card con capacidad de swipe usando Gesture Handler
 * VERSIÓN ACTUALIZADA para Reanimated v3+
 * Como una carta que puedes deslizar con gestos naturales
 */
export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  image,
  onSwipeRight,
  onSwipeLeft,
  onSwipeUp,
  onSwipeDown,
}) => {
  const {
    panGesture,  // Ahora usamos panGesture en lugar de gestureHandler
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
        {/* La card de imagen */}
        <ImageCard image={image} />

        {/* Indicador LIKE (aparece al deslizar derecha) */}
        <Animated.View style={[styles.indicator, styles.likeIndicator, likeIndicatorStyle]}>
          <Animated.Text style={styles.likeText}>❤️ LIKE</Animated.Text>
        </Animated.View>

        {/* Indicador NOPE (aparece al deslizar izquierda) */}
        <Animated.View style={[styles.indicator, styles.nopeIndicator, nopeIndicatorStyle]}>
          <Animated.Text style={styles.nopeText}>✕ NOPE</Animated.Text>
        </Animated.View>
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
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
  },
  
  nopeIndicator: {
    left: 30,
    borderColor: '#FF6B6B',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
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