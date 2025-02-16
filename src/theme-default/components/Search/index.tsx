import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { useI18n } from '@/theme-default/hooks/useI18n';
import Flexsearch from 'flexsearch';
import { PageData } from '@/node/types';

type SearchResult = PageData & {searchIndex: number }

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
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);

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
  function search(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    setShow(true);
    console.log(searchKey);
    const results = index.search(searchKey);
    const searchContents: SearchResult[] = []
    results.forEach((result) => {
        result.result.forEach((id) => {
          const item = searchData.current?.get(id as number);
          if (item) {
            let content = item.content;
            // 不区分大小写的查找
            let i = item.content.toLowerCase().indexOf(searchKey.toLowerCase());
            if(item.content.length > 40) {
                content = content.slice(i-20 < 0? 0: i-20, i+20);
            }
            searchContents.push({...item, content: content, searchIndex: i});
          }
        })
    })
    console.log(searchContents);
    
    setSearchResult(searchContents);
  }
  useEffect(() => {
    if (show && !searchData.current) {
      getPageSearch();
    }
    if (show) {
      window.addEventListener('click', closePopup);
    }
  }, [show]);

  const SearchList = (props: {searchResult: SearchResult[]}) => {
    const { searchResult } = props;
        // 超出滚动
    return <div className='max-h-[250px]' overflow="auto">
    {searchResult.length ? searchResult.map((item, i) => {
        const pre = item.content.slice(0, item.searchIndex);
        const key = item.content.slice(item.searchIndex, item.searchIndex + searchKey.length);
        const next = item.content.slice(item.searchIndex + searchKey.length);
        return <>
        <div cursor="pointer" onClick={() => {
            // item.routePath 格式为 /zh-CN/docs/xxx/
            // 想要前面不动的通过window跳转到 /zh-CN/docs/xxx
            // item.tocTitle 格式为 xxx-1
            let toc = item.tocTitle.length? `#${item.tocTitle}` : '';
            if(toc) {
                const arr = toc.split('-');
                arr.pop()
                toc = arr.join('-');
            }
            window.location.href = `${item.routePath.endsWith('/')? item.routePath.slice(0, -1) : item.routePath}${toc}`;
          setShow(false);
        }} p="5px" ><div text="sm" color='black dark:white'>
        <span>{pre}</span><span color="brand">{key}</span><span>{next}</span></div>
            <div text="sm" color='gray dark:white'>
            {item.routePath}
                </div></div>
        {i !== (searchResult.length - 1) && <div className=" h-[1px] bg-gray dark:bg-white"></div>}
        </>
      }): <div text="sm" p="5px">没有搜索结果</div>}
    </div>
  }

  return (
    <div flex="~" ml="30px" className="relative">
      {show && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-[35px] w-[200px] bg-white"
          p="5px "
          rounded="5px"
          border="0.5px solid black dark:white">
          <SearchList searchResult={searchResult} />
        </div>
      )}
      <input
        onClick={(e) => {
          e.stopPropagation();
            setShow(true);
        }}
        onChange={(e) => {
            setSearchKey(e.target.value)
        }}
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
