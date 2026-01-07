import { SCREEN } from '../constants/config';
import { StyleSheet } from 'react-native';

// Colores del tema
export const colores = {
    blanco: '#ffffff',
    blanco2: '#F5F5F5',
    negro: '#2F2F2F',
    pink: '#EC576B',
    agua: '#4EC5C1',
    lima: '#FFF70A',
    text: '#333333',
    textSecondary: '#666666',
    overlay: 'rgba(0,0,0,0.5)'
};

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colores.blanco,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: colores.textSecondary,
    },
    
    header: {
      backgroundColor: colores.negro,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 5,
      borderBottomEndRadius: 30,
      borderBottomStartRadius: 30,
      gap: 10
    },
    
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colores.blanco,
    },
    
    favButton: {
      backgroundColor: colores.blanco,
      paddingHorizontal: 30,
      paddingVertical: 5,
      borderRadius: 20,
    },
    favButtonText: {
      color: colores.negro,
      fontSize: 14,
      fontWeight: '500',
    },
    
    cardContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    nextCardPreview: {
      position: 'absolute',
      width: SCREEN.WIDTH * 0.85,
      height: SCREEN.HEIGHT * 0.6,
      backgroundColor: '#ddd',
      borderRadius: 20,
      zIndex: -1,
      transform: [{ scale: 0.95 }],
    },
    
    // Empty State (completed images)
    emptyState: {
      alignItems: 'center',
      padding: 40,
    },
    emptyIcon: {
      fontSize: 80,
      marginBottom: 20,
    },
    emptyTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colores.negro,
      marginBottom: 10,
    },
    emptyText: {
      fontSize: 16,
      color: colores.textSecondary,
      textAlign: 'center',
      marginBottom: 30,
    },
    resetButton: {
      backgroundColor: colores.agua,
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 25,
    },
    resetButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
    
    // Empty Camera State (no images)
    emptyCameraState: {
      alignItems: 'center',
      padding: 40,
      justifyContent: 'center',
    },
    emptyCameraIcon: {
      fontSize: 80,
      marginBottom: 20,
    },
    emptyCameraTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colores.negro,
      marginBottom: 10,
    },
    emptyCameraText: {
      fontSize: 16,
      color: colores.textSecondary,
      textAlign: 'center',
      marginBottom: 30,
    },
    emptyCameraButtonContainer: {
      marginTop: 10,
    },
    
    controls: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 30,
      gap: 40,
    },
    
    counterContainer: {
      alignItems: 'center',
      paddingBottom: 20,
    },
    counter: {
      fontSize: 16,
      color: colores.textSecondary,
      fontWeight: '600',
    },
});