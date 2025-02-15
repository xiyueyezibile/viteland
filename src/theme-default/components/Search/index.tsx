import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { useI18n } from '@/theme-default/hooks/useI18n';
import Flexsearch from 'flexsearch';
import { PageData } from '@/node/types';
const index = new Flexsearch.Document({
  document: {
    id: 'id',
    index: ['content']
  },
  tokenize: 'forward' // 使用 'forward' 分词方式，支持部分匹配
});
export const Search = () => {
  const [show, setShow] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const lang = useI18n();
  const searchData = useRef<Map<number, PageData>>(null);

  function closePopup() {
    setShow(false);
    window.removeEventListener('click', closePopup);
  }
  async function getPageSearch() {
    try {
      const res = await fetch('/pageSearch.json');
      const data = await res.json();
      searchData.current = new Map<number, PageData>(
        (data[lang] as PageData[]).map((item) => {
          // 添加到索引

          index.add(item.id, item);
          return [item.id, item];
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
  function search() {
    console.log(searchKey);
    const results = index.search(searchKey);
    console.log(results);
  }
  useEffect(() => {
    if (show && !searchData.current) {
      getPageSearch();
    }
  }, [show]);

  return (
    <div flex="~" ml="30px" className="relative">
      {show && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-[35px] w-full bg-white"
          p="5px "
          rounded="5px"
          border="0.5px solid black dark:white">
          123
        </div>
      )}
      <input
        onClick={(e) => {
          e.stopPropagation();
          setShow(true);
          window.addEventListener('click', closePopup);
        }}
        onChange={(e) => setSearchKey(e.target.value)}
        type="text"
        border="0.5px solid black dark:white"
        mr="5px"
        rounded="13px"
        px="8px"
      />
      <div h="26px" onClick={search} className={`i-carbon-search ${styles.searchButton}`}></div>
    </div>
  );
};
