import { PageData, PageDatas } from '@/node/types';
import * as fs from 'fs';
import path from 'path';
type MDXNodeType = 'text' | 'heading' | 'code' | 'inlineCode';
// 策略模式
const pushStrategy = {
  AddBind: function (pageDatas: PageDatas, i18n: string, pageData: PageData) {
    const finalNode = pageDatas[i18n][pageDatas[i18n].length - 1];

    if (finalNode.routePath === pageData.routePath) {
      finalNode.content += pageData.content;
     
      
      this.count--; // 恢复id
      return;
    }
    pushStrategy.AddnoBind(pageDatas, i18n, pageData);
  },
  AddnoBind: function (pageDatas: PageDatas, i18n: string, pageData: PageData) {
    pageDatas[i18n].push(pageData);
  },
  InitnoBind: function (pageDatas: PageDatas, i18n: string, pageData: PageData) {
    pageDatas[i18n] = [];
    pageDatas[i18n].push(pageData);
  }
};

export class PageSearch {
  #pageData: PageDatas;
  count: number;
  #lastType?: MDXNodeType;
  constructor() {
    this.#pageData = {};
    this.count = 0;
  }
  isBind(type: MDXNodeType) {
    const isRightLastType = this.#lastType === 'inlineCode' || this.#lastType === 'text';
    const isRightCurType = type === 'inlineCode' || type === 'text';
    this.#lastType = type;
    return isRightLastType && isRightCurType;
  }
  push(i18n: string, pageData: Omit<PageData, 'id'>, type: MDXNodeType) {
    const isBind = this.isBind(type);
    const key = `${this.#pageData[i18n] ? 'Add' : 'Init'}${isBind ? 'Bind' : 'noBind'}`;
    
    pushStrategy[key || 'InitnoBind'](this.#pageData, i18n, {
      ...pageData,
      id: this.count++
    });
  }

  get() {
    return this.#pageData;
  }
  writePageSearchToJSONFile(root: string) {
    const pageData = JSON.stringify(this.#pageData, null, 2);
    fs.writeFileSync(path.join(root, 'pageSearch.json'), pageData);
  }
}
