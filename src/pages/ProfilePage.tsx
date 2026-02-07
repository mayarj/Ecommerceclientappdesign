import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { Button } from '../app/components/ui/button';
import { Card } from '../app/components/ui/card';
import { Input } from '../app/components/ui/input';
import { Label } from '../app/components/ui/label';
import MapPicker from '../app/components/MapPicker';
import { User, Phone, Mail, MapPin, Globe, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user, setUser, language, toggleLanguage } = useApp();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(user?.address || '');
  const [showMap, setShowMap] = useState(false);

  const handleLocationSelect = (lat: number, lng: number, selectedAddress: string) => {
    setAddress(selectedAddress);
    setShowMap(false);
    toast.success(t('success'), {
      description: t('selectLocation'),
    });
  };

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        name,
        email,
        address,
      });
      toast.success(t('success'), {
        description: t('saveChanges'),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('myProfile')}</h1>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                <p className="text-gray-600">{user?.phone}</p>
              </div>
            </div>
          </Card>

          {/* Personal Information */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">{t('personalInfo')}</h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {t('name')}
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                  placeholder={t('name')}
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {t('phone')}
                </Label>
                <Input
                  id="phone"
                  value={user?.phone}
                  disabled
                  className="mt-1 bg-gray-50"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t('email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                  placeholder={t('email')}
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-gray-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {t('address')}
                </Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1"
                  placeholder={t('address')}
                />
                <Button
                  onClick={() => setShowMap(!showMap)}
                  variant="outline"
                  className="w-full mt-2 border-2 border-purple-300 hover:border-purple-500"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  {showMap ? t('hideMap') : t('selectLocationOnMap')}
                </Button>
                {showMap && (
                  <div className="mt-4">
                    <MapPicker onLocationSelect={handleLocationSelect} />
                  </div>
                )}
              </div>

              <Button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Save className="mr-2 h-5 w-5" />
                {t('saveChanges')}
              </Button>
            </div>
          </Card>

          {/* Language Settings */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">{t('language')}</h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-purple-600" />
                <div>
                  <p className="font-semibold text-gray-800">{t('language')}</p>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? t('english') : t('arabic')}
                  </p>
                </div>
              </div>

              <Button
                onClick={toggleLanguage}
                variant="outline"
                className="border-2 border-purple-300 hover:border-purple-500"
              >
                {language === 'en' ? t('arabic') : t('english')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}