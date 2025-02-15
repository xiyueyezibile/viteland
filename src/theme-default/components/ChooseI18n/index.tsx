import { useI18n } from '@/theme-default/hooks/useI18n';
import { usePageData } from '@/theme-default/hooks/usePageData';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './index.module.scss';

/** 选择不同的语言跳到不同页面 */
export const ChooseI18n = () => {
  const lang = useI18n();
  const { siteData } = usePageData();
  const { pathname } = useLocation();
  const i18n = siteData.themeConfig.i18n;
  const [show, setShow] = useState(false);
  const windowClick = () => {
    setShow(false);
    window.removeEventListener('click', windowClick);
  };
  const chooseClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setShow(true);
    window.addEventListener('click', windowClick);
  };
  return (
    <div display="block">
      <div onClick={chooseClick} text="sm" className={`${styles.choose}`}>
        {/* 一个语言切换的图标 */}
        <div className="i-carbon-language w-5 h-[24px] fill-current"></div>
      </div>
      <div className="relative w-full">
        {/* 一个语言切换的图标 */}
        {show && (
          <div
            border="1px solid #f4f4f4 dark:gray"
            overflow="hidden"
            rounded="md"
            className="absolute top-[3px] left-[10px]"
            bg="white dark:black">
            {i18n.map((item) => {
              return (
                <div
                  cursor="pointer"
                  text="sm center"
                  p="x-1 y-1"
                  border="1px solid #f4f4f4 dark:gray"
                  color={lang === item.value ? 'brand' : 'black dark:white'}
                  onClick={() => {
                    if (!(lang === item.value)) {
                      const target = pathname.split('/');
                      target.splice(1, 1, item.value);
                      window.location.href = target.join('/');
                    }
                  }}
                  key={item.value}>
                  {item.text}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
