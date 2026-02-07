import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { Product } from '../../data/mockData';
import { Star } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
  const { language } = useApp();

  const displayName = language === 'ar' ? product.nameAr : product.name;
  const finalPriceUSD = product.discount 
    ? product.priceUSD * (1 - product.discount / 100)
    : product.priceUSD;
  const finalPriceSYP = product.discount 
    ? product.priceSYP * (1 - product.discount / 100)
    : product.priceSYP;

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-purple-400">
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
            <img
              src={product.images[0]}
              alt={displayName}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          {product.discount && (
            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white">
              {product.discount}% {t('off')}
            </Badge>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
            {displayName}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>

          <div className="space-y-1">
            {product.discount && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 line-through">
                  ${product.priceUSD.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {product.priceSYP.toLocaleString()} SYP
                </span>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="text-lg font-bold text-purple-600">
                ${finalPriceUSD.toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-gray-700">
                {finalPriceSYP.toLocaleString()} SYP
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
