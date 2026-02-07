import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { Button } from '../app/components/ui/button';
import { Input } from '../app/components/ui/input';
import { Label } from '../app/components/ui/label';
import { Phone, MessageSquare, Globe } from 'lucide-react';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser, language, toggleLanguage } = useApp();
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [countryCode, setCountryCode] = useState('+963');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const handleSendCode = () => {
    if (phoneNumber) {
      setStep('code');
    }
  };

  const handleVerify = () => {
    if (verificationCode) {
      // Mock user login
      setUser({
        id: '1',
        phone: `${countryCode}${phoneNumber}`,
        name: 'User Name',
        email: 'user@example.com',
        address: 'Damascus, Syria',
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 bg-white/90 backdrop-blur-sm"
        onClick={toggleLanguage}
      >
        <Globe className="h-5 w-5" />
      </Button>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Phone className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('welcome')}</h1>
          <p className="text-gray-600">{t('loginTitle')}</p>
        </div>

        {step === 'phone' ? (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-4">{t('enterPhone')}</p>
              
              <Label htmlFor="countryCode" className="text-gray-700">
                {t('countryCode')}
              </Label>
              <Input
                id="countryCode"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="mt-1 mb-4"
                placeholder="+963"
              />

              <Label htmlFor="phone" className="text-gray-700">
                {t('phoneNumber')}
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1"
                placeholder="9XX XXX XXX"
              />
            </div>

            <Button 
              onClick={handleSendCode}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              size="lg"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              {t('sendCode')}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-4">{t('enterCode')}</p>
              
              <Label htmlFor="code" className="text-gray-700">
                {t('verificationCode')}
              </Label>
              <Input
                id="code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="mt-1 text-center text-2xl tracking-widest"
                placeholder="XXXX"
                maxLength={4}
              />
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleVerify}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                size="lg"
              >
                {t('verify')}
              </Button>

              <Button 
                onClick={() => setStep('phone')}
                variant="outline"
                className="w-full"
              >
                {t('back')}
              </Button>

              <button
                onClick={handleSendCode}
                className="w-full text-sm text-purple-600 hover:text-purple-700 underline"
              >
                {t('resendCode')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}