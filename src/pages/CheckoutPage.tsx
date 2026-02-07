import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { Button } from '../app/components/ui/button';
import { Card } from '../app/components/ui/card';
import { Input } from '../app/components/ui/input';
import { Label } from '../app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '../app/components/ui/radio-group';
import MapPicker from '../app/components/MapPicker';
import { MapPin, CreditCard, DollarSign, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const DELIVERY_FEE_SYP = 50000;
const DELIVERY_FEE_USD = 2;

export default function CheckoutPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cart, user, clearCart, addOrder } = useApp();
  const [address, setAddress] = useState(user?.address || '');
  const [showMap, setShowMap] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'syriatelCash'>('cash');

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

  const handleLocationSelect = (lat: number, lng: number, selectedAddress: string) => {
    setAddress(selectedAddress);
    setShowMap(false);
    toast.success(t('success'), {
      description: t('selectLocation'),
    });
  };

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      toast.error(t('error'), {
        description: t('selectLocation'),
      });
      return;
    }

    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending' as const,
      items: cart,
      totalUSD,
      totalSYP,
      deliveryFee: DELIVERY_FEE_SYP,
      address,
      paymentMethod,
    };

    addOrder(order);
    clearCart();
    
    toast.success(t('success'), {
      description: t('placeOrder'),
    });
    
    navigate('/orders');
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('checkout')}</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{t('deliveryInfo')}</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-gray-700">
                    {t('address')}
                  </Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t('selectLocation')}
                    className="mt-1"
                  />
                </div>

                <Button
                  onClick={() => setShowMap(!showMap)}
                  variant="outline"
                  className="w-full border-2 border-purple-300 hover:border-purple-500"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  {showMap ? t('hideMap') : t('selectLocationOnMap')}
                </Button>

                {/* Map */}
                {showMap && (
                  <MapPicker onLocationSelect={handleLocationSelect} />
                )}
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{t('paymentMethod')}</h2>
              </div>

              <RadioGroup value={paymentMethod} onValueChange={(v: any) => setPaymentMethod(v)}>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:border-purple-400 transition-colors">
                    <RadioGroupItem value="cash" id="cash" />
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="flex-1 font-medium">{t('cashOnDelivery')}</span>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:border-purple-400 transition-colors">
                    <RadioGroupItem value="syriatelCash" id="syriatelCash" />
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <span className="flex-1 font-medium">{t('syriatelCash')}</span>
                  </label>
                </div>
              </RadioGroup>
            </Card>
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
                      <div className="text-purple-600">${totalUSD.toFixed(2)}</div>
                      <div className="text-sm text-gray-700">{totalSYP.toLocaleString()} SYP</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-12"
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                {t('placeOrder')}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}