import { I18nConfig } from '../types'
/** '/zh' or '' */
export const getLang = (path: string, i18n: I18nConfig[]) => {
    const routeAbsoluteName = path.split('.');
    const lang =
      routeAbsoluteName.length >= 3 &&
      i18n.find((item) => item.value === routeAbsoluteName[routeAbsoluteName.length - 2])
        ? `/${routeAbsoluteName[routeAbsoluteName.length - 2]}`
        : '';
  return lang
}