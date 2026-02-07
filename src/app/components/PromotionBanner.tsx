import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export default function PromotionBanner() {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{t('specialOffer')}</h3>
            <p className="text-white/90">{t('limitedTime')}</p>
          </div>
        </div>
        
        <Button className="bg-white text-amber-600 hover:bg-amber-50 font-semibold px-8 transition-colors">
          {t('shopNow')}
        </Button>
      </div>
    </div>
  );
}
