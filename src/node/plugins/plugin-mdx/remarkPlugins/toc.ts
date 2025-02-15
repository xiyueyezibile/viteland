import type { Plugin } from 'unified';
import Slugger from 'github-slugger';
import { visit } from 'unist-util-visit';
import { Heading, Root } from 'mdast';
import type { MdxjsEsm } from 'mdast-util-mdxjs-esm';
import { Program, parse } from 'acorn';
import { routeService } from '../../plugin-routes/pluginRoutes';
import { PageSearch } from './PageSearch';
import { RouteService } from '../../plugin-routes/RouteService';
import { I18nConfig } from '@/node/types';
import { getLang } from '@/node/utils/lang';
interface ChildNode {
  type: 'link' | 'text' | 'inlineCode';
  value: string;
  children?: ChildNode[];
}

const slugger = new Slugger();

interface TocItem {
  id: string;
  text: string;
  depth: number;
}
export const pageSearch = new PageSearch()

function collectTocContent(node: Heading, toc: TocItem[]): string {
  let title = ''
  if (!node.depth || !node.children) {
    return title;
  }
  // h1
  if (node.depth === 1) {
    title = (node.children[0] as ChildNode).value;
  }
  // h2 ~ h4
  if (node.depth > 1 && node.depth < 5) {
    const originText = (node.children as ChildNode[])
      .map((child) => {
        switch (child.type) {
          case 'link':
            return child.children?.map((c) => c.value).join('') || '';
          default:
            return child.value;
        }
      })
      .join('');
    // 对标题文本进行规范化,生成唯一且稳定的字符串标识符（slug）
    const id = slugger.slug(originText);
    toc.push({
      id,
      text: originText,
      depth: node.depth
    });
  }
  return title
}

/** 获取 toc 内容 */
export const remarkPluginToc: Plugin<[I18nConfig[]], Root> = (i18n) => {
  return (tree, file) => {
    const lang = getLang(file.path, i18n)
    console.log(lang);
    
    
    const routes = (routeService as RouteService).getRouteData()
    
    // 初始化 toc 数组
    const toc: TocItem[] = [];
    let title = '';
    visit(tree, (node) => {
      
      if(node.type === 'text') {
        pageSearch.push(lang? lang.slice(1) : lang,{
          tocTitle: '',
          content: node.value,
          routePath: `${lang}${routes.find((route => route.absolutePath === file.path)).routePath}`,
        })
      }
      else if(node.type === 'heading') {
      // 获取toc数据
        title = collectTocContent(node, toc);
        // title 存在代表时h1，也就是标题，否则则是大纲
        pageSearch.push(lang? lang.slice(1) : lang,{
          tocTitle: title? '': toc[toc.length - 1].id,
          content: title || toc[toc.length - 1].text,
          routePath: `${lang}${routes.find((route => route.absolutePath === file.path)).routePath}`,
        })
      } else if(node.type === 'code') {
        // 获取代码块内容
        pageSearch.push(lang? lang.slice(1) : lang,{
          tocTitle: '',
          lang: node.lang,
          content: node.value,
          routePath: `${lang}${routes.find((route => route.absolutePath === file.path)).routePath}`,
        })
      }
    });
    
    const insertCode = `export const toc = ${JSON.stringify(toc, null, 2)};`;
    // 在 MDX 文件中插入, 路由导出时会获取到对应的内容
    tree.children.push({
      type: 'mdxjsEsm',
      value: insertCode,
      data: {
        estree: parse(insertCode, {
          ecmaVersion: 2020,
          sourceType: 'module'
        })
      }
    } as MdxjsEsm);
    if (title) {
      const insertedTitle = `export const title = '${title}';`;

      tree.children.push({
        type: 'mdxjsEsm',
        value: insertedTitle,
        data: {
          estree: parse(insertedTitle, {
            ecmaVersion: 2020,
            sourceType: 'module'
          }) as unknown as Program
        }
      } as MdxjsEsm);
    }
  };
};
