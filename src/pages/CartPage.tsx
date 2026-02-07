import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { Button } from '../app/components/ui/button';
import { Card } from '../app/components/ui/card';
import { Trash2, ShoppingBag, Minus, Plus } from 'lucide-react';

const DELIVERY_FEE_SYP = 50000;
const DELIVERY_FEE_USD = 2;

export default function CartPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartItem, language } = useApp();

  const subtotalUSD = cart.reduce((sum, item) => {
    const price = item.discount 
      ? item.priceUSD * (1 - item.discount / 100)
      : item.priceUSD;
    return sum + price * item.quantity;
  }, 0);

  const subtotalSYP = cart.reduce((sum, item) => {
    const price = item.discount 
      ? item.priceSYP * (1 - item.discount / 100)
      : item.priceSYP;
    return sum + price * item.quantity;
  }, 0);

  const totalUSD = subtotalUSD + DELIVERY_FEE_USD;
  const totalSYP = subtotalSYP + DELIVERY_FEE_SYP;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-slate-50 to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('emptyCart')}</h2>
          <Button
            onClick={() => navigate('/')}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
          >
            {t('shopNow')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-slate-50 to-stone-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('myCart')}</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => {
              const displayName = language === 'ar' ? item.nameAr : item.name;
              const itemPrice = item.discount 
                ? item.priceUSD * (1 - item.discount / 100)
                : item.priceUSD;
              const itemPriceSYP = item.discount 
                ? item.priceSYP * (1 - item.discount / 100)
                : item.priceSYP;
              
              // Use cartItemId if available, otherwise fallback to id-index combination
              const cartItemId = item.cartItemId || `${item.id}-${index}`;

              return (
                <Card key={cartItemId} className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-stone-100 to-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={
                          item.selectedColor && item.imageVariations?.[item.selectedColor]
                            ? item.imageVariations[item.selectedColor][0]
                            : item.images[0]
                        }
                        alt={displayName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 mb-2">{displayName}</h3>
                      
                      {/* Color Selection */}
                      {item.colors && item.colors.length > 0 && (
                        <div className="mb-2">
                          <label className="text-xs font-medium text-gray-600 mb-1 block">
                            {t('color')}:
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {item.colors.map((color) => (
                              <Button
                                key={color}
                                variant={item.selectedColor === color ? 'default' : 'outline'}
                                size="sm"
                                onClick={() =>
                                  updateCartItem(cartItemId, {
                                    selectedColor: color,
                                    images: item.imageVariations?.[color] || item.images,
                                  })
                                }
                                className={
                                  item.selectedColor === color
                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 h-7 text-xs px-2'
                                    : 'border-stone-300 bg-white text-stone-700 hover:border-emerald-400 h-7 text-xs px-2'
                                }
                              >
                                {color}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Size Selection */}
                      {item.sizes && item.sizes.length > 0 && (
                        <div className="mb-2">
                          <label className="text-xs font-medium text-gray-600 mb-1 block">
                            {t('size')}:
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {item.sizes.map((size) => (
                              <Button
                                key={size}
                                variant={item.selectedSize === size ? 'default' : 'outline'}
                                size="sm"
                                onClick={() =>
                                  updateCartItem(cartItemId, {
                                    selectedSize: size,
                                  })
                                }
                                className={
                                  item.selectedSize === size
                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 h-7 text-xs px-2'
                                    : 'border-stone-300 bg-white text-stone-700 hover:border-emerald-400 h-7 text-xs px-2'
                                }
                              >
                                {size}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-3 space-y-1">
                        <p className="font-semibold text-emerald-700">
                          ${itemPrice.toFixed(2)} × {item.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          {itemPriceSYP.toLocaleString()} SYP × {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(cartItemId)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateCartItem(cartItemId, {
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateCartItem(cartItemId, {
                              quantity: item.quantity + 1,
                            })
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">{t('total')}</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>{t('subtotal')}</span>
                  <div className="text-right">
                    <div className="font-semibold">${subtotalUSD.toFixed(2)}</div>
                    <div className="text-sm">{subtotalSYP.toLocaleString()} SYP</div>
                  </div>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>{t('deliveryFee')}</span>
                  <div className="text-right">
                    <div className="font-semibold">${DELIVERY_FEE_USD.toFixed(2)}</div>
                    <div className="text-sm">{DELIVERY_FEE_SYP.toLocaleString()} SYP</div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>{t('total')}</span>
                    <div className="text-right">
                      <div className="text-emerald-700">${totalUSD.toFixed(2)}</div>
                      <div className="text-sm text-gray-700">{totalSYP.toLocaleString()} SYP</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => navigate('/checkout')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 transition-colors"
              >
                {t('checkout')}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}