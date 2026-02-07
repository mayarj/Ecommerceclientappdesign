import React from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { Card } from '../app/components/ui/card';
import { Badge } from '../app/components/ui/badge';
import { Package, Calendar, MapPin, CreditCard, DollarSign } from 'lucide-react';

export default function OrdersPage() {
  const { t } = useTranslation();
  const { orders, language } = useApp();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'processing':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-emerald-500';
      case 'delivered':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-slate-50 to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('myOrders')}</h2>
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-slate-50 to-stone-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('myOrders')}</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Order Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-emerald-600" />
                      <span className="font-bold text-lg">
                        {t('orderNumber')} {order.id}
                      </span>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} text-white`}>
                      {t(order.status)}
                    </Badge>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {t('orderDate')}: {new Date(order.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{order.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {order.paymentMethod === 'cash' ? (
                        <DollarSign className="h-4 w-4" />
                      ) : (
                        <CreditCard className="h-4 w-4" />
                      )}
                      <span>{t(order.paymentMethod === 'cash' ? 'cashOnDelivery' : 'syriatelCash')}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-800">{t('products')}:</p>
                    <div className="space-y-2">
                      {order.items.map((item, index) => {
                        const displayName = language === 'ar' ? item.nameAr : item.name;
                        return (
                          <div key={`${item.id}-${index}`} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-stone-100 to-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={item.images[0]}
                                alt={displayName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">
                                {displayName}
                              </p>
                              <p className="text-xs text-gray-600">
                                {t('quantity')}: {item.quantity}
                                {item.selectedColor && ` • ${t('color')}: ${item.selectedColor}`}
                                {item.selectedSize && ` • ${t('size')}: ${item.selectedSize}`}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Order Total */}
                <div className="lg:w-48 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">{t('total')}</p>
                  <p className="text-2xl font-bold text-emerald-700">${order.totalUSD.toFixed(2)}</p>
                  <p className="text-sm font-semibold text-gray-700">
                    {order.totalSYP.toLocaleString()} SYP
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}