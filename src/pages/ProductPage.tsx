import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { mockProducts } from '../data/mockData';
import { Button } from '../app/components/ui/button';
import { Star, Minus, Plus, ShoppingCart, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '../app/components/ui/badge';
import { Input } from '../app/components/ui/input';
import { toast } from 'sonner';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language, addToCart } = useApp();
  
  const product = mockProducts.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    if (!product || product.images.length <= 1) return;
    
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [product]);

  // Update images when color/size changes
  useEffect(() => {
    if (product && selectedColor && product.imageVariations?.[selectedColor]) {
      // Use variation images if available
      setSelectedImage(0);
    }
  }, [selectedColor, selectedSize, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">{t('error')}</p>
      </div>
    );
  }

  const displayName = language === 'ar' ? product.nameAr : product.name;
  const displayDescription = language === 'ar' ? product.descriptionAr : product.description;
  
  const finalPriceUSD = product.discount 
    ? product.priceUSD * (1 - product.discount / 100)
    : product.priceUSD;
  const finalPriceSYP = product.discount 
    ? product.priceSYP * (1 - product.discount / 100)
    : product.priceSYP;

  // Get current images based on selection
  const currentImages = selectedColor && product.imageVariations?.[selectedColor]
    ? product.imageVariations[selectedColor]
    : product.images;

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev + 1) % currentImages.length);
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
    toast.success(t('success'), {
      description: `${displayName} ${t('addToCart').toLowerCase()}`,
    });
  };

  const isWeightBased = product.quantityType === 'weight';

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-slate-50 to-stone-100">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('back')}
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg p-6 lg:p-8">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gradient-to-br from-stone-100 to-slate-100 rounded-xl overflow-hidden">
              <img
                src={currentImages[selectedImage]}
                alt={displayName}
                className="w-full h-full object-cover"
              />
              {product.discount && (
                <Badge className="absolute top-4 right-4 text-lg bg-amber-500 text-white px-4 py-2 hover:bg-amber-500">
                  {product.discount}% {t('off')}
                </Badge>
              )}
              
              {/* Image Navigation Buttons */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft className="h-6 w-6 text-emerald-600" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight className="h-6 w-6 text-emerald-600" />
                  </button>
                </>
              )}
            </div>

            {currentImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {currentImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-emerald-500 ring-2 ring-emerald-200'
                        : 'border-stone-200 hover:border-emerald-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${displayName} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">{displayName}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold text-gray-700">{product.rating}</span>
                </div>
                <span className="text-gray-500">
                  ({product.reviews} {t('reviews')})
                </span>
              </div>

              <div className="space-y-2">
                {product.discount && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <div className="text-base sm:text-xl text-gray-400 line-through">
                      ${product.priceUSD.toFixed(2)}
                    </div>
                    <div className="text-[10px] sm:text-base text-gray-400 line-through">
                      {product.priceSYP.toLocaleString()} SYP
                    </div>
                  </div>
                )}
                
                <div>
                  <div className="flex items-baseline gap-2 flex-wrap mb-0.5 sm:mb-1">
                    <span className="text-2xl sm:text-3xl font-bold text-emerald-700">
                      ${finalPriceUSD.toFixed(2)}
                    </span>
                    {isWeightBased && product.weightUnit && (
                      <span className="text-sm sm:text-lg text-gray-500">
                        / {product.weightUnit}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] sm:text-base font-semibold text-gray-700 leading-tight">
                    {finalPriceSYP.toLocaleString()} SYP
                  </div>
                </div>
              </div>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">{t('color')}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? 'default' : 'outline'}
                      onClick={() => setSelectedColor(color)}
                      className={
                        selectedColor === color
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'border-2 border-stone-300 bg-white text-stone-700 hover:border-emerald-400'
                      }
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">{t('size')}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      onClick={() => setSelectedSize(size)}
                      className={
                        selectedSize === size
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'border-2 border-stone-300 bg-white text-stone-700 hover:border-emerald-400'
                      }
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">
                {t('quantity')}
                {isWeightBased && product.weightUnit && ` (${product.weightUnit})`}
              </h3>
              {isWeightBased ? (
                <Input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseFloat(e.target.value) || 0.1)}
                  className="w-32 text-center text-xl font-semibold"
                />
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border-2"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="border-2"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-lg transition-colors"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {t('addToCart')}
            </Button>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">{t('description')}</h3>
              <p className="text-gray-600 leading-relaxed">{displayDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}