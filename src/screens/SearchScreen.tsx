import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { products, stores } from '../data/mockData';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { StoreCard } from '../components/StoreCard';
import { RootStackParamList } from '../navigation/types';

type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

interface SearchScreenProps {
  navigation: SearchScreenNavigationProp;
}

export const SearchScreen = ({ navigation }: SearchScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredStores = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return stores.filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.categories.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products or stores"
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!searchQuery.trim() ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Search for anything</Text>
            <Text style={styles.emptySubtitle}>
              Find products, stores, and more
            </Text>
          </View>
        ) : (
          <>
            {/* Stores Results */}
            {filteredStores.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Stores</Text>
                {filteredStores.map(store => (
                  <StoreCard
                    key={store.id}
                    store={store}
                    onPress={() => navigation.navigate('Store', { storeId: store.id })}
                  />
                ))}
              </View>
            )}

            {/* Products Results */}
            {filteredProducts.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Products</Text>
                <View style={styles.productsGrid}>
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
                    />
                  ))}
                </View>
              </View>
            )}

            {/* No Results */}
            {filteredStores.length === 0 && filteredProducts.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No results found</Text>
                <Text style={styles.emptySubtitle}>
                  Try a different search term
                </Text>
              </View>
            )}
          </>
        )}
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
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
  },
});
