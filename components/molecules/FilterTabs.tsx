import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colores } from '@/constants/styles';

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
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tab,
          activeFilter === 'all' && styles.activeTab,
        ]}
        onPress={() => onFilterChange('all')}
      >
        <Text style={[
          styles.tabText,
          activeFilter === 'all' && styles.activeTabText,
        ]}>
          Todas ({allCount})
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          activeFilter === 'favorites' && styles.activeTab,
        ]}
        onPress={() => onFilterChange('favorites')}
      >
        <Text style={[
          styles.tabText,
          activeFilter === 'favorites' && styles.activeTabText,
        ]}>
          ⭐ Favoritas ({favoritesCount})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colores.blanco2,
    borderRadius: 25,
    padding: 4,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colores.negro,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colores.textSecondary,
  },
  activeTabText: {
    color: colores.blanco,
  },
});