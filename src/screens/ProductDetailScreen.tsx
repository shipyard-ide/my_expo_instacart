import React from 'react';
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
import { getProductById, getStoreById } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { RootStackParamList } from '../navigation/types';

type ProductDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

interface ProductDetailScreenProps {
  navigation: ProductDetailNavigationProp;
  route: ProductDetailRouteProp;
}

export const ProductDetailScreen = ({ navigation, route }: ProductDetailScreenProps) => {
  const { productId } = route.params;
  const product = getProductById(productId);
  const store = product ? getStoreById(product.storeId) : null;
  
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const quantity = product ? getItemQuantity(product.id) : 0;

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Product not found</Text>
      </SafeAreaView>
    );
  }

  const handleAdd = () => {
    addToCart(product);
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(product.id, quantity - 1);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <Image source={{ uri: product.image }} style={styles.productImage} />

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productUnit}>{product.unit}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          
          {store && (
            <View style={styles.storeInfo}>
              <Ionicons name="storefront-outline" size={16} color="#666" />
              <Text style={styles.storeName}>{store.name}</Text>
            </View>
          )}

          <View style={styles.divider} />

          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        {quantity === 0 ? (
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAdd}>
            <Text style={styles.addToCartText}>Add to cart</Text>
            <Text style={styles.addToCartPrice}>${product.price.toFixed(2)}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityRow}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.quantityButton} onPress={handleDecrement}>
                <Ionicons name="remove" size={24} color="#43B02A" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
                <Ionicons name="add" size={24} color="#43B02A" />
              </TouchableOpacity>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalPrice}>${(product.price * quantity).toFixed(2)}</Text>
            </View>
          </View>
        )}
      </View>
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
    paddingVertical: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  productUnit: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#43B02A',
    marginBottom: 12,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  storeName: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  bottomAction: {
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  addToCartButton: {
    backgroundColor: '#43B02A',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  addToCartPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 4,
  },
  quantityButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 20,
    fontWeight: '700',
    color: '#43B02A',
    minWidth: 40,
    textAlign: 'center',
  },
  totalContainer: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: 12,
    color: '#999',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#43B02A',
  },
});
