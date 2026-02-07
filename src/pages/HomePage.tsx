import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mockProducts } from '../data/mockData';
import ProductCard from '../app/components/ProductCard';
import PromotionBanner from '../app/components/PromotionBanner';
import { Button } from '../app/components/ui/button';
import { Utensils, Shirt, Laptop } from 'lucide-react';

export default function HomePage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: t('allCategories'), icon: null },
    { id: 'food', label: t('food'), icon: Utensils },
    { id: 'cloth', label: t('cloth'), icon: Shirt },
    { id: 'electronic', label: t('electronic'), icon: Laptop },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? mockProducts
    : mockProducts.filter(p => p.category === selectedCategory);

  // Insert promotion banner after every 4 rows (8 products in 2-column grid)
  const productsWithPromotions = [];
  for (let i = 0; i < filteredProducts.length; i += 8) {
    productsWithPromotions.push(...filteredProducts.slice(i, i + 8));
    if (i + 8 < filteredProducts.length) {
      productsWithPromotions.push({ type: 'promotion', id: `promo-${i}` });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('filter')}</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  className={
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'border-2 border-purple-200 hover:border-purple-400'
                  }
                >
                  {Icon && <Icon className="h-4 w-4 mr-2" />}
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('products')} ({filteredProducts.length})
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsWithPromotions.map((item: any, index) => {
              if (item.type === 'promotion') {
                return (
                  <div key={item.id} className="col-span-full">
                    <PromotionBanner />
                  </div>
                );
              }
              return <ProductCard key={item.id} product={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}