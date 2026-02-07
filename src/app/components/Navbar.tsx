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
    <nav className="bg-gradient-to-br from-slate-50 to-stone-100 border-b border-stone-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* First Row: Language, Logo+Name, Logout */}
        <div className="flex items-center justify-between h-16 py-2">
          {/* Language Button - Left */}
          <div className="flex-1 flex justify-start">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-stone-700 hover:bg-stone-200/50 hover:text-stone-900"
            >
              <Globe className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">{language === 'en' ? t('arabic') : t('english')}</span>
            </Button>
          </div>

          {/* Logo and App Name - Center */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center border border-stone-200">
              <Store className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="relative">
              <span className="font-bold text-xl text-emerald-700 relative z-10">ShopHub</span>
              <span className="absolute inset-0 text-xl font-bold text-white blur-sm">ShopHub</span>
            </div>
          </Link>

          {/* Logout Button - Right */}
          <div className="flex-1 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-stone-700 hover:bg-stone-200/50 hover:text-stone-900"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">{t('logout')}</span>
            </Button>
          </div>
        </div>

        {/* Second Row: Navigation Links */}
        <div className="flex items-center justify-center gap-2 md:gap-6 pb-3 bg-gradient-to-br from-stone-700 to-stone-800 rounded-lg mx-2 mb-2 px-2 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[70px] ${
                  isActive
                    ? 'bg-emerald-50 border border-emerald-200'
                    : 'hover:bg-stone-100/50'
                }`}
              >
                <div className="relative">
                  <Icon className={`h-5 w-5 ${isActive ? 'text-emerald-400' : 'text-stone-300'}`} />
                  {item.badge !== undefined && item.badge > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-amber-400 text-stone-900 hover:bg-amber-400 text-xs h-5 w-5 flex items-center justify-center p-0">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className={`text-xs font-medium ${isActive ? 'text-emerald-700' : 'text-white'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}