import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { categories, stores } from '../data/mockData';
import { CategoryCard } from '../components/CategoryCard';
import { StoreCard } from '../components/StoreCard';
import { SearchBar } from '../components/SearchBar';
import { RootStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStorePress = (storeId: string) => {
    navigation.navigate('Store', { storeId });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.deliveryLabel}>Deliver to</Text>
            <TouchableOpacity style={styles.addressContainer}>
              <Ionicons name="location" size={18} color="#43B02A" />
              <Text style={styles.address}>123 Main Street</Text>
              <Ionicons name="chevron-down" size={16} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search stores and products"
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by category</Text>
          <FlatList
            horizontal
            data={categories}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CategoryCard category={item} onPress={() => {}} />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Featured Stores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured stores</Text>
          {filteredStores.map(store => (
            <StoreCard
              key={store.id}
              store={store}
              onPress={() => handleStorePress(store.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  deliveryLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
    marginRight: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  categoriesList: {
    paddingRight: 16,
  },
});
