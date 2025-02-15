import { PageData, PageDatas } from '@/node/types';
import * as fs from 'fs';
import path from 'path';

export class PageSearch {
  #pageData: PageDatas;
  count: number;
  constructor() {
    this.#pageData = {};
    this.count = 0;
  }
  push(i18n: string, pageData: Omit<PageData, 'id'>) {
    if (this.#pageData[i18n]) {
      this.#pageData[i18n].push({
        ...pageData,
        id: this.count++
      });
      return;
    }
    this.#pageData[i18n] = [];
    this.#pageData[i18n].push({
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
