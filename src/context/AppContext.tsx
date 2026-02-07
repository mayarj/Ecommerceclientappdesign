import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { CartItem, Order, mockOrders } from '../data/mockData';

interface User {
  id: string;
  phone: string;
  name: string;
  email: string;
  address: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartItem: (cartItemId: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  language: string;
  toggleLanguage: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Set document direction based on language
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      // Generate unique cart item ID if not provided
      const cartItemId = item.cartItemId || `${item.id}-${item.selectedColor || 'no-color'}-${item.selectedSize || 'no-size'}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Check if exact same item (same product, color, size) already exists
      const existingItem = prev.find(
        i => i.cartItemId === cartItemId || (
          i.id === item.id && 
          i.selectedColor === item.selectedColor && 
          i.selectedSize === item.selectedSize &&
          !i.cartItemId // Only merge if old item doesn't have cartItemId
        )
      );
      
      if (existingItem && !existingItem.cartItemId) {
        // Update existing item with cartItemId and merge quantities
        return prev.map(i =>
          i.id === item.id && 
          i.selectedColor === item.selectedColor && 
          i.selectedSize === item.selectedSize &&
          !i.cartItemId
            ? { ...i, cartItemId, quantity: i.quantity + item.quantity }
            : i
        );
      }
      
      // Add as new item with unique cartItemId
      return [...prev, { ...item, cartItemId }];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => {
      // Support both old items (without cartItemId) and new items (with cartItemId)
      if (item.cartItemId) {
        return item.cartItemId !== cartItemId;
      }
      // For backward compatibility, also check by product id
      return item.id !== cartItemId;
    }));
  };

  const updateCartItem = (cartItemId: string, updates: Partial<CartItem>) => {
    setCart(prev => prev.map(item => {
      // Support both old items (without cartItemId) and new items (with cartItemId)
      if (item.cartItemId === cartItemId || (!item.cartItemId && item.id === cartItemId)) {
        return { ...item, ...updates };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        orders,
        addOrder,
        language,
        toggleLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
