import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider, useCart } from './src/context/CartContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AddedToast } from './src/components/AddedToast';

function AppContent() {
  const { toast, hideToast } = useCart();
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <AppNavigator />
      <AddedToast
        visible={toast.visible}
        productName={toast.productName}
        onHide={hideToast}
      />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
