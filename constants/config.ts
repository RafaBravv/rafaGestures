import { Dimensions } from 'react-native';

// Dimensiones de pantalla
export const SCREEN = {
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,
};

// Configuración de gestos (como ajustar la sensibilidad de un volante)
export const GESTURE_CONFIG = {
  // Qué tan lejos debe deslizar para activar (30% del ancho de pantalla)
  SWIPE_THRESHOLD: SCREEN.WIDTH * 0.3,
  // Qué tan rápido debe deslizar
  VELOCITY_THRESHOLD: 0.3,
  // Cuánto rota la card al deslizar (como el ángulo de un columpio)
  ROTATION_MULTIPLIER: 20,
  // Límite máximo de rotación
  MAX_ROTATION: 30,
};

// Dimensiones de las cards
export const CARD_CONFIG = {
  WIDTH: SCREEN.WIDTH * 0.85,
  HEIGHT: SCREEN.HEIGHT * 0.6,
  BORDER_RADIUS: 20,
  SHADOW_RADIUS: 10,
};

// Animaciones (duración en milisegundos)
export const ANIMATION = {
  SPRING_CONFIG: {
    damping: 15,
    stiffness: 120,
    mass: 1,
  },
  SWIPE_DURATION: 300,
  FADE_DURATION: 200,
};

// URLs o configuración de API
export const API_CONFIG = {
  // Cambia esto por tu endpoint real
  BASE_URL: 'https://api.example.com',
  IMAGES_ENDPOINT: '/images',
  TIMEOUT: 10000,
};

// Configuración de la app
export const APP_CONFIG = {
  MAX_IMAGES_TO_LOAD: 50,
  IMAGES_PER_PAGE: 10,
  ENABLE_ANALYTICS: false,
};