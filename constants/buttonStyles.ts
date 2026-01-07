import { StyleSheet } from 'react-native';
import { colores } from './styles';

export const buttonStyles = StyleSheet.create({
  // Action Buttons (Like/Nope)
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
  nopeButton: {
    backgroundColor: colores.negro,
  },
  likeButton: {
    backgroundColor: colores.pink,
  },
  actionButtonIcon: {
    color: colores.blanco,
    fontSize: 32,
  },

  // Camera Button
  cameraButton: {
    backgroundColor: colores.agua,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cameraButtonDisabled: {
    backgroundColor: colores.textSecondary,
    opacity: 0.5,
  },
  cameraButtonIcon: {
    fontSize: 24,
  },
  cameraButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  // Gallery Button
  galleryButton: {
    backgroundColor: colores.negro,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  galleryButtonIcon: {
    fontSize: 20,
  },
  galleryButtonText: {
    color: colores.blanco,
    fontSize: 16,
    fontWeight: '600',
  },

  // Filter Tabs
  filterTabContainer: {
    flexDirection: 'row',
    backgroundColor: colores.blanco2,
    borderRadius: 25,
    padding: 4,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: colores.negro,
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colores.textSecondary,
  },
  filterTabTextActive: {
    color: colores.blanco,
  },
});