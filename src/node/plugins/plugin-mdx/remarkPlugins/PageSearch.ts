
import * as fs from 'fs';
import path from 'path';
interface PageData {
    /** 唯一标识 */
    id: number;
    /** 路由路径 */
    routePath: string;
    /** 对应的 toc 标题 */
    tocTitle: string;
    /** 对应内容 */
    content: string;
    /** code 类型对应的语言 */
    lang?: string;
}

export class PageSearch {
    #pageData: {
        [key: string]: PageData[]
    }
    count: number
    constructor() {
        this.#pageData = {}
        this.count = 0
    }
    push(i18n: string ,pageData: Omit<PageData, 'id'>) {
        if(this.#pageData[i18n]) {
            this.#pageData[i18n].push({
                ...pageData,
                id: this.count++
            })
            return
        }
        this.#pageData[i18n] = []
        this.#pageData[i18n].push({
            ...pageData,
            id: this.count++
        })
    }
    get() {
        return this.#pageData
    }
    writePageSearchToJSONFile(root: string) {
        const pageData = JSON.stringify(this.#pageData, null, 2)
        fs.writeFileSync(path.join(root, 'pageSearch.json'), pageData)
    }
}