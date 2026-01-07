import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GalleryCard } from '../components/organisms/GalleryCard';
import { FilterTabs, FilterType } from '../components/molecules/FilterTabs';
import { Header } from '../components/molecules/Header';
import { ImageItem } from '../store/types';
import { styles as globalStyles } from '../constants/styles';
import { galleryStyles } from '../constants/galleryStyles';

interface GalleryScreenProps {
  images: ImageItem[];
  onBack: () => void;
  onImagePress: (imageId: string) => void;
}

export const GalleryScreen: React.FC<GalleryScreenProps> = ({
  images,
  onBack,
  onImagePress,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Filtrar imágenes según el tab activo
  const filteredImages = activeFilter === 'all' 
    ? images 
    : images.filter(img => img.isFavorite);

  const favoritesCount = images.filter(img => img.isFavorite).length;

  return (
    <View style={globalStyles.container}>
      <Header
        title="Galería"
        favoritesCount={favoritesCount}
        onFavoritesPress={onBack}
      />

      <SafeAreaView style={galleryStyles.safeArea} edges={['bottom']}>
        {/* Tabs de filtro */}
        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          allCount={images.length}
          favoritesCount={favoritesCount}
        />

        {/* Grid de imágenes */}
        {filteredImages.length > 0 ? (
          <FlatList
            data={filteredImages}
            renderItem={({ item }) => (
              <GalleryCard
                image={item}
                onPress={() => onImagePress(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={galleryStyles.gridContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={galleryStyles.emptyContainer}>
            <Text style={galleryStyles.emptyIcon}>
              {activeFilter === 'all' ? '📸' : '⭐'}
            </Text>
            <Text style={galleryStyles.emptyText}>
              {activeFilter === 'all' 
                ? 'No hay fotos aún' 
                : 'No tienes favoritas'}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};