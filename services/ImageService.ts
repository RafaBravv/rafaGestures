import { ImageItem } from '../store/types';

// ESTA CLASE MANEJA LAS OPERACIONES CON LAS IMÁGENES
class ImageService {
  /**
   * Agrega una nueva imagen a la lista
   */
  static addImage(images: ImageItem[], newImage: ImageItem): ImageItem[] {
    return [newImage, ...images];
  }

  /**
   * Carga imágenes desde una API (deshabilitado por ahora)
   */
  static async fetchImagesFromAPI(): Promise<ImageItem[]> {
    // Retorna array vacío - las imágenes vendrán de la cámara
    return [];
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