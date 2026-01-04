// Representa una imagen individual en la aplicación
export interface ImageItem {
    id: string;
    uri: string;
    title?: string;
    description?: string;
    isFavorite: boolean;
    createdAt?: Date;
  }
  
  // Estado global de la aplicación
  export interface ImageStore {
    images: ImageItem[];
    favorites: ImageItem[];
    currentIndex: number;
    isLoading: boolean;
    error: string | null;
  }
  
  // Acciones para manipular el store
  export interface ImageActions {
    addToFavorites: (image: ImageItem) => void;
    removeFromFavorites: (imageId: string) => void;
    nextImage: () => void;
    resetImages: () => void;
    loadImages: (images: ImageItem[]) => void;
  }
  
  // Dirección del swipe
  export type SwipeDirection = 'left' | 'right' | 'up' | 'down';
  
  // Configuración de gestos
  export interface GestureConfig {
    swipeThreshold: number;
    rotationMultiplier: number;
    velocityThreshold: number;
  }
  
  // Props para componentes
  export interface SwipeableCardProps {
    image: ImageItem;
    onSwipeRight: () => void;
    onSwipeLeft: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
  }
  
  export interface ImageCardProps {
    image: ImageItem;
    showOverlay?: boolean;
  }