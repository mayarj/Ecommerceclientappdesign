import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { Home, ShoppingCart, Package, User, Globe, LogOut, Store } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const { cart, toggleLanguage, setUser, language } = useApp();

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/cart', icon: ShoppingCart, label: t('cart'), badge: cart.length },
    { path: '/orders', icon: Package, label: t('orders') },
    { path: '/profile', icon: User, label: t('profile') },
  ];

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and App Name */}
          <Link to="/" className="flex items-center gap-3 mr-8">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Store className="h-6 w-6 text-purple-600" />
            </div>
            <span className="font-bold text-xl hidden sm:inline">ShopHub</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-2 md:gap-4 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/20 font-semibold'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden md:inline">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <Badge className="bg-yellow-400 text-purple-900 hover:bg-yellow-400">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-white hover:bg-white/10"
            >
              <Globe className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">{language === 'en' ? t('arabic') : t('english')}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-white hover:bg-white/10"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">{t('logout')}</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}