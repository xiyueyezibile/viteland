import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import type { Element, Root } from 'hast';

interface IElement extends Element {
  isVisited?: boolean;
}
/**
 * @description 更改代码块语法 dom 结构插件
 */
export const rehypePluginPreWrapper: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node: IElement) => {
      // <pre><code>...</code></pre>
      // 1. 找到 pre 元素
      // 2. 解析出代码的语言名称
      // 3. 变换 Html AST
      if (
        node.tagName === 'pre' &&
        node.children[0]?.type === 'element' &&
        node.children[0].tagName === 'code' &&
        node.isVisited
      ) {
        const codeNode = node.children[0];
        const codeClassName = codeNode.properties?.className?.toString() || '';
        // language-xxx
        const lang = codeClassName.split('-')[1];
        const clonedNode: IElement = {
          type: 'element',
          tagName: 'pre',
          children: node.children,
          properties: {},
          // 打上 data 标签，调用插件时会跳过 有data标签的 pre 元素
          isVisited: true
        };

        // 修改原来的 pre 标签 -> div 标签
        node.tagName = 'div';
        node.properties = node.properties || {};
        node.properties.className = codeClassName;

        // 构造 div 标签的子元素
        node.children = [
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: 'lang'
            },
            children: [
              {
                type: 'text',
                value: lang
              }
            ]
          },
          clonedNode
        ];
      }
    });
  };
};
