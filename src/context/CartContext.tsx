import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface ToastState {
  visible: boolean;
  productName: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  totalItems: number;
  totalPrice: number;
  toast: ToastState;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<ToastState>({ visible: false, productName: '' });

  const hideToast = useCallback(() => {
    setToast({ visible: false, productName: '' });
  }, []);

  const addToCart = useCallback((product: Product) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { product, quantity: 1 }];
    });
    setToast({ visible: true, productName: product.name });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(currentItems => currentItems.filter(item => item.product.id !== productId));
    } else {
      setItems(currentItems =>
        currentItems.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getItemQuantity = useCallback((productId: string) => {
    const item = items.find(item => item.product.id === productId);
    return item?.quantity ?? 0;
  }, [items]);

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [items]);

  const value = useMemo(() => ({
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    totalItems,
    totalPrice,
    toast,
    hideToast,
  }), [items, addToCart, removeFromCart, updateQuantity, clearCart, getItemQuantity, totalItems, totalPrice, toast, hideToast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
