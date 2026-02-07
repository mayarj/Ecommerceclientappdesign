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
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-200 hover:border-emerald-300 h-full flex flex-col">
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-stone-100 to-slate-100 overflow-hidden">
            <img
              src={product.images[0]}
              alt={displayName}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          {product.discount && (
            <Badge className="absolute top-2 right-2 bg-amber-500 text-white hover:bg-amber-500">
              {product.discount}% {t('off')}
            </Badge>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-stone-800 mb-2 line-clamp-2 min-h-[3rem]">
            {displayName}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-stone-700">{product.rating}</span>
            <span className="text-xs text-stone-500">({product.reviews})</span>
          </div>

          <div className="space-y-1 mt-auto">
            {product.discount && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                <span className="text-sm text-stone-400 line-through">
                  ${product.priceUSD.toFixed(2)}
                </span>
                <span className="text-xs sm:text-sm text-stone-400 line-through">
                  {product.priceSYP.toLocaleString()} SYP
                </span>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="text-lg font-bold text-emerald-700">
                ${finalPriceUSD.toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-stone-700">
                {finalPriceSYP.toLocaleString()} SYP
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
