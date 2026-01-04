import { StyleSheet } from 'react-native';
import { CARD_CONFIG } from '@/constants/config';
import { colores } from '@/constants/styles';

export const cardStyles = StyleSheet.create({
    card: {
      width: '100%',
      height: '100%',
      borderRadius: CARD_CONFIG.BORDER_RADIUS,
      backgroundColor: colores.blanco2,
      overflow: 'hidden',
      
      // Sombra para iOS
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: CARD_CONFIG.SHADOW_RADIUS,
      
      // Sombra para Android
      elevation: 8,
    },
    
    image: {
      width: '100%',
      height: '100%',
    },
    
    overlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colores.overlay,
      padding: 20,
    },
    
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
    
    description: {
      fontSize: 16,
      color: '#fff',
      opacity: 0.9,
    },
    
    favoriteBadge: {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      
      // Sombra
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    
    favoriteIcon: {
      fontSize: 20,
    },
});