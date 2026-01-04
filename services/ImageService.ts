// src/services/ImageService.ts
import { ImageItem } from '../store/types';

/**
 * Servicio para manejar operaciones con imágenes
 * Piensa en esto como el "bibliotecario" que organiza y gestiona las imágenes
 */
class ImageService {
  /**
   * Genera imágenes de ejemplo (mock data)
   * REEMPLAZA ESTO con tu propia lógica de carga de imágenes
   */
  static getMockImages(): ImageItem[] {
    const mockImages: ImageItem[] = [];
    
    for (let i = 1; i <= 20; i++) {
      mockImages.push({
        id: `image_${i}`,
        uri: `https://picsum.photos/400/600?random=${i}`,
        title: `Imagen ${i}`,
        description: `Esta es la descripción de la imagen ${i}`,
        isFavorite: false,
        createdAt: new Date(),
      });
    }
    
    return mockImages;
  }

  /**
   * Carga imágenes desde una API
   * IMPLEMENTA ESTO según tu backend
   */
  static async fetchImagesFromAPI(): Promise<ImageItem[]> {
    try {
      // Ejemplo de llamada a API (descomenta y adapta)
      // const response = await fetch('https://tu-api.com/images');
      // const data = await response.json();
      // return data.map(item => this.transformToImageItem(item));
      
      // Por ahora retorna mock data
      return this.getMockImages();
    } catch (error) {
      console.error('Error al cargar imágenes:', error);
      throw new Error('No se pudieron cargar las imágenes');
    }
  }

  /**
   * Carga imágenes desde el dispositivo local
   * USA ESTO si quieres seleccionar fotos del usuario
   */
  static async loadLocalImages(): Promise<ImageItem[]> {
    // Implementa usando expo-image-picker o react-native-image-picker
    // import * as ImagePicker from 'expo-image-picker';
    
    // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (status !== 'granted') {
    //   throw new Error('Permiso denegado');
    // }
    
    // Retorna mock data por ahora
    return this.getMockImages();
  }

  /**
   * Transforma datos de API al formato ImageItem
   */
  static transformToImageItem(apiData: any): ImageItem {
    return {
      id: apiData.id || String(Math.random()),
      uri: apiData.url || apiData.imageUrl || '',
      title: apiData.title || '',
      description: apiData.description || '',
      isFavorite: false,
      createdAt: new Date(apiData.createdAt || Date.now()),
    };
  }

  /**
   * Marca una imagen como favorita
   */
  static addToFavorites(image: ImageItem): ImageItem {
    return {
      ...image,
      isFavorite: true,
    };
  }

  /**
   * Quita una imagen de favoritos
   */
  static removeFromFavorites(image: ImageItem): ImageItem {
    return {
      ...image,
      isFavorite: false,
    };
  }

  /**
   * Filtra la lista de imágenes eliminando una por ID
   */
  static removeImage(images: ImageItem[], imageId: string): ImageItem[] {
    return images.filter(img => img.id !== imageId);
  }

  /**
   * Guarda favoritos en almacenamiento local (AsyncStorage)
   */
  static async saveFavoritesToStorage(favorites: ImageItem[]): Promise<void> {
    try {
      // import AsyncStorage from '@react-native-async-storage/async-storage';
      // await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      console.log('Favoritos guardados:', favorites.length);
    } catch (error) {
      console.error('Error al guardar favoritos:', error);
    }
  }

  /**
   * Carga favoritos desde almacenamiento local
   */
  static async loadFavoritesFromStorage(): Promise<ImageItem[]> {
    try {
      // import AsyncStorage from '@react-native-async-storage/async-storage';
      // const data = await AsyncStorage.getItem('favorites');
      // return data ? JSON.parse(data) : [];
      return [];
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
      return [];
    }
  }

  /**
   * Mezcla el array de imágenes aleatoriamente (como barajar cartas)
   */
  static shuffleImages(images: ImageItem[]): ImageItem[] {
    const shuffled = [...images];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

export default ImageService;