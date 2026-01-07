import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen } from '../screens/HomeScreen';
import { GalleryScreen } from '../screens/GalleryScreen';
import { ImageItem } from '../store/types';
import ImageService from '../services/ImageService';
import CameraService from '../services/CameraService';
import { Alert } from 'react-native';

type ScreenType = 'home' | 'gallery';

export default function Index() {
  const [currentScreen, setCurrentScreen] = React.useState<ScreenType>('home');
  const [images, setImages] = React.useState<ImageItem[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Cargar imágenes al inicio
  React.useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    const loadedImages = await ImageService.fetchImagesFromAPI();
    setImages(loadedImages);
  };

  const handleTakePhoto = async () => {
    try {
      const newImage = await CameraService.takePicture();
      
      if (newImage) {
        setImages(prev => ImageService.addImage(prev, newImage));
        
        if (images.length === 0) {
          setCurrentIndex(0);
        }
        
        Alert.alert('¡Éxito!', 'Foto capturada correctamente');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'No se pudo tomar la foto.');
    }
  };

  const handleSwipeRight = () => {
    const currentImage = images[currentIndex];
    if (currentImage) {
      setImages(prev => prev.map(img => 
        img.id === currentImage.id 
          ? ImageService.addToFavorites(img)
          : img
      ));
    }
    setCurrentIndex(prev => prev + 1);
  };

  const handleSwipeLeft = () => {
    const currentImage = images[currentIndex];
    if (currentImage && currentImage.isFavorite) {
      setImages(prev => prev.map(img => 
        img.id === currentImage.id 
          ? ImageService.removeFromFavorites(img)
          : img
      ));
    }
    setCurrentIndex(prev => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  const navigateToGallery = () => {
    setCurrentScreen('gallery');
  };

  const navigateToHome = () => {
    setCurrentScreen('home');
  };

  const handleImagePress = (imageId: string) => {
    console.log('Image pressed:', imageId);
    navigateToHome();
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {currentScreen === 'home' ? (
        <HomeScreen 
          images={images}
          currentIndex={currentIndex}
          onTakePhoto={handleTakePhoto}
          onSwipeRight={handleSwipeRight}
          onSwipeLeft={handleSwipeLeft}
          onReset={handleReset}
          onNavigateToGallery={navigateToGallery}
        />
      ) : (
        <GalleryScreen
          images={images}
          onBack={navigateToHome}
          onImagePress={handleImagePress}
        />
      )}
    </GestureHandlerRootView>
  );
}