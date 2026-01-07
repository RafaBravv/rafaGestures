import * as ImagePicker from 'expo-image-picker';
import { ImageItem } from '../store/types';

class CameraService {
  /**
   * Solicita permisos de cámara
   */
  static async requestCameraPermissions(): Promise<boolean> {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting camera permissions:', error);
      return false;
    }
  }

  /**
   * Abre la cámara para capturar una foto
   */
  static async takePicture(): Promise<ImageItem | null> {
    try {
      // Verificar permisos
      const hasPermission = await this.requestCameraPermissions();
      if (!hasPermission) {
        throw new Error('Permiso de cámara denegado');
      }

      // Abrir cámara
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      // Si el usuario canceló
      if (result.canceled) {
        return null;
      }

      // Crear ImageItem con la foto capturada
      const imageItem: ImageItem = {
        id: `photo_${Date.now()}`,
        uri: result.assets[0].uri,
        title: `Foto ${new Date().toLocaleString()}`,
        isFavorite: false,
        createdAt: new Date(),
      };

      return imageItem;
    } catch (error) {
      console.error('Error taking picture:', error);
      throw error;
    }
  }

  /**
   * Abre la galería para seleccionar una imagen (opcional)
   */
  static async pickFromGallery(): Promise<ImageItem | null> {
    try {
      // Solicitar permisos de galería
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permiso de galería denegado');
      }

      // Abrir galería
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      // Si el usuario canceló
      if (result.canceled) {
        return null;
      }

      // Crear ImageItem con la imagen seleccionada
      const imageItem: ImageItem = {
        id: `gallery_${Date.now()}`,
        uri: result.assets[0].uri,
        title: `Imagen ${new Date().toLocaleString()}`,
        isFavorite: false,
        createdAt: new Date(),
      };

      return imageItem;
    } catch (error) {
      console.error('Error picking from gallery:', error);
      throw error;
    }
  }
}

export default CameraService;