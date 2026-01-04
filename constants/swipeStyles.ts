import { StyleSheet } from 'react-native';
import { CARD_CONFIG } from '../constants/config';

export const swipeStyles = StyleSheet.create({
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
      backgroundColor: 'rgba(78, 205, 196, 0.4)',
    },
    nopeIndicator: {
      left: 30,
      borderColor: '#FF6B6B',
      backgroundColor: 'rgba(255, 107, 107, 0.4)',
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