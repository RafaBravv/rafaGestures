import { StyleSheet, Dimensions } from 'react-native';
import { colores } from './styles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columnas con padding

export const galleryStyles = StyleSheet.create({
  // Gallery Screen
  safeArea: {
    flex: 1,
  },
  gridContainer: {
    padding: 8,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: colores.textSecondary,
    textAlign: 'center',
  },

  // Gallery Card
  galleryCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.3,
    margin: 8,
    borderRadius: 15,
    backgroundColor: colores.blanco2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  galleryCardImageContainer: {
    width: '100%',
    height: '100%',
  },

  // Navigation Bar
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 15,
  },

  // Camera Actions
  cameraActionsContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});