import { Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { GESTURE_CONFIG, SCREEN } from '../constants/config';

/**
 * Hook personalizado para manejar gestos de swipe en las cards
 * VERSIÓN ACTUALIZADA para Reanimated v3+
 */
interface GestureCallbacks {
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export const useImageGesture = (callbacks: GestureCallbacks) => {
  const { onSwipeRight, onSwipeLeft, onSwipeUp, onSwipeDown } = callbacks;

  // Valores compartidos para animaciones
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isGesturing = useSharedValue(false);
  
  // Variables para guardar contexto durante el gesto
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  /**
   * Gesto de Pan usando la nueva API de Gesture
   * Piensa en esto como un "detector de movimiento" para tus dedos
   */
  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Guarda la posición inicial
      startX.value = translateX.value;
      startY.value = translateY.value;
      isGesturing.value = true;
    })
    .onUpdate((event) => {
      // Actualiza la posición mientras el usuario arrastra
      translateX.value = startX.value + event.translationX;
      translateY.value = startY.value + event.translationY;
    })
    .onEnd((event) => {
      isGesturing.value = false;
      const { translationX, translationY, velocityX, velocityY } = event;

      // Determina si el swipe fue suficientemente fuerte
      const isSwipeRight = 
        translationX > GESTURE_CONFIG.SWIPE_THRESHOLD || 
        velocityX > GESTURE_CONFIG.VELOCITY_THRESHOLD * 1000;
      
      const isSwipeLeft = 
        translationX < -GESTURE_CONFIG.SWIPE_THRESHOLD || 
        velocityX < -GESTURE_CONFIG.VELOCITY_THRESHOLD * 1000;

      const isSwipeUpDirection = 
        translationY < -GESTURE_CONFIG.SWIPE_THRESHOLD || 
        velocityY < -GESTURE_CONFIG.VELOCITY_THRESHOLD * 1000;

      const isSwipeDownDirection = 
        translationY > GESTURE_CONFIG.SWIPE_THRESHOLD || 
        velocityY > GESTURE_CONFIG.VELOCITY_THRESHOLD * 1000;

      if (isSwipeRight) {
        // Anima hacia la derecha y ejecuta callback
        translateX.value = withTiming(SCREEN.WIDTH * 1.5, { duration: 300 }, () => {
          runOnJS(onSwipeRight)();
        });
      } else if (isSwipeLeft) {
        // Anima hacia la izquierda y ejecuta callback
        translateX.value = withTiming(-SCREEN.WIDTH * 1.5, { duration: 300 }, () => {
          runOnJS(onSwipeLeft)();
        });
      } else if (isSwipeUpDirection && onSwipeUp) {
        // Swipe hacia arriba (opcional)
        translateY.value = withTiming(-SCREEN.HEIGHT, { duration: 300 }, () => {
          runOnJS(onSwipeUp)();
        });
      } else if (isSwipeDownDirection && onSwipeDown) {
        // Swipe hacia abajo (opcional)
        translateY.value = withTiming(SCREEN.HEIGHT, { duration: 300 }, () => {
          runOnJS(onSwipeDown)();
        });
      } else {
        // Regresa a la posición original (como un resorte)
        translateX.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
        });
        translateY.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
        });
      }
    });

  /**
   * Estilo animado que se aplica a la card
   * Calcula rotación, opacidad y transformaciones
   */
  const animatedStyle = useAnimatedStyle(() => {
    // Calcula rotación basada en posición X
    const rotation = (translateX.value / SCREEN.WIDTH) * GESTURE_CONFIG.ROTATION_MULTIPLIER;
    const clampedRotation = Math.max(-GESTURE_CONFIG.MAX_ROTATION, 
      Math.min(GESTURE_CONFIG.MAX_ROTATION, rotation));

    // Calcula opacidad (se desvanece al alejar)
    const opacity = 1 - Math.abs(translateX.value) / SCREEN.WIDTH;

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${clampedRotation}deg` },
      ],
      opacity: Math.max(0, opacity),
    };
  });

  /**
   * Estilos para los indicadores de like/nope
   */
  const likeIndicatorStyle = useAnimatedStyle(() => {
    const opacity = Math.max(0, Math.min(1, translateX.value / GESTURE_CONFIG.SWIPE_THRESHOLD));
    const scale = 1 + opacity * 0.2;
    
    return {
      opacity,
      transform: [{ scale }],
    };
  });

  const nopeIndicatorStyle = useAnimatedStyle(() => {
    const opacity = Math.max(0, Math.min(1, -translateX.value / GESTURE_CONFIG.SWIPE_THRESHOLD));
    const scale = 1 + opacity * 0.2;
    
    return {
      opacity,
      transform: [{ scale }],
    };
  });

  /**
   * Resetea la card a su posición original
   */
  const resetPosition = () => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
  };

  /**
   * Fuerza un swipe programáticamente (para botones)
   */
  const forceSwipe = (direction: 'left' | 'right') => {
    const targetX = direction === 'right' ? SCREEN.WIDTH * 1.5 : -SCREEN.WIDTH * 1.5;
    translateX.value = withTiming(targetX, { duration: 300 }, () => {
      if (direction === 'right') {
        runOnJS(onSwipeRight)();
      } else {
        runOnJS(onSwipeLeft)();
      }
    });
  };

  return {
    panGesture,        // Nuevo: retornamos el gesto en lugar del handler
    animatedStyle,
    likeIndicatorStyle,
    nopeIndicatorStyle,
    resetPosition,
    forceSwipe,
    translateX,
    translateY,
    isGesturing,
  };
};