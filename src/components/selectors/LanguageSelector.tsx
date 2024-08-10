'use client';

import styles from './Selectors.module.css';
import { useTranslation } from '@/context/TranslationContext';
import { useRouter, usePathname } from 'next/navigation';

const LanguageSelector: React.FC = () => {
  const { currentLocale, setLocale } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale);
    setTimeout(() => {
      router.push(`/${newLocale}/${pathname.slice(4)}`);
    }, 500);
  };

  return (
    // <select value={currentLocale} onChange={handleLanguageChange}>
    //   <option value="en">English</option>
    //   <option value="fr">Français</option>
    // </select>
    /* From Uiverse.io by Pradeepsaranbishnoi */
    <div className={styles.container}>
      <div className={styles.tabs}>
        <input
          type="radio"
          id="radio-1"
          name="tabs"
          checked={currentLocale === 'en'}
          onChange={() => handleLanguageChange('en')}
        />
        <label className={styles.tab} htmlFor="radio-1">
          EN
        </label>
        <input
          type="radio"
          id="radio-2"
          name="tabs"
          checked={currentLocale === 'fr'}
          onChange={() => handleLanguageChange('fr')}
        />
        <label className={styles.tab} htmlFor="radio-2">
          FR
        </label>
        <span className={styles.glider}></span>
      </div>
    </div>
  );
};

export default LanguageSelector;
