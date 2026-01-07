import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { buttonStyles } from '@/constants/buttonStyles';

export type FilterType = 'all' | 'favorites';

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  allCount: number;
  favoritesCount: number;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  activeFilter,
  onFilterChange,
  allCount,
  favoritesCount,
}) => {
  return (
    <View style={buttonStyles.filterTabContainer}>
      <TouchableOpacity
        style={[
          buttonStyles.filterTab,
          activeFilter === 'all' && buttonStyles.filterTabActive,
        ]}
        onPress={() => onFilterChange('all')}
      >
        <Text style={[
          buttonStyles.filterTabText,
          activeFilter === 'all' && buttonStyles.filterTabTextActive,
        ]}>
          Todas ({allCount})
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          buttonStyles.filterTab,
          activeFilter === 'favorites' && buttonStyles.filterTabActive,
        ]}
        onPress={() => onFilterChange('favorites')}
      >
        <Text style={[
          buttonStyles.filterTabText,
          activeFilter === 'favorites' && buttonStyles.filterTabTextActive,
        ]}>
          ⭐ Favoritas ({favoritesCount})
        </Text>
      </TouchableOpacity>
    </View>
  );
};