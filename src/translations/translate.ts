import { t } from 'i18next';
import i18n from './i18n';

const translate = (key: string): string => {
    return i18n.t(key);
}

export default translate;