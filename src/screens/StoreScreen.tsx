import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { getStoreById, getProductsByStore } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { RootStackParamList } from '../navigation/types';

type StoreScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Store'>;
type StoreScreenRouteProp = RouteProp<RootStackParamList, 'Store'>;

interface StoreScreenProps {
  navigation: StoreScreenNavigationProp;
  route: StoreScreenRouteProp;
}

export const StoreScreen = ({ navigation, route }: StoreScreenProps) => {
  const { storeId } = route.params;
  const store = getStoreById(storeId);
  const products = getProductsByStore(storeId);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return cats;
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    return filtered;
  }, [products, searchQuery, selectedCategory]);

  if (!store) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Store not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.headerImage}>
          <Image source={{ uri: store.image }} style={styles.storeImage} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Store Info */}
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{store.name}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="star" size={16} color="#FFB800" />
            <Text style={styles.rating}>{store.rating}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.meta}>{store.deliveryTime}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.meta}>{store.deliveryFee} delivery</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={`Search ${store.name}`}
          />
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryPills}
        >
          <TouchableOpacity
            style={[
              styles.categoryPill,
              !selectedCategory && styles.categoryPillActive,
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text
              style={[
                styles.categoryPillText,
                !selectedCategory && styles.categoryPillTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryPill,
                selectedCategory === cat && styles.categoryPillActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryPillText,
                  selectedCategory === cat && styles.categoryPillTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
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
  headerImage: {
    position: 'relative',
  },
  storeImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
  },
  backButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeInfo: {
    padding: 16,
  },
  storeName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginLeft: 4,
  },
  dot: {
    color: '#999',
    marginHorizontal: 8,
  },
  meta: {
    fontSize: 14,
    color: '#666',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryPills: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  categoryPillActive: {
    backgroundColor: '#43B02A',
  },
  categoryPillText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  categoryPillTextActive: {
    color: '#fff',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
});
