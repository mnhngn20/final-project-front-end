import { useTranslation } from 'react-i18next';
import { TranslationKeys } from '#/src/generated/translationKeys';
import { Dictionary } from '../utils/type';

const useTypeSafeTranslation = () => {
  const { t } = useTranslation();

  return {
    t: (s: TranslationKeys, f?: Dictionary<string>) => t(s, f),
  };
};

export default useTypeSafeTranslation;
