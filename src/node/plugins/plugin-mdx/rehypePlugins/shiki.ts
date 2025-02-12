import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Text, Root } from 'hast';
import { fromHtml } from 'hast-util-from-html';
import shiki from 'shiki';

interface Options {
  highlighter: shiki.Highlighter;
}

export const rehypePluginShiki: Plugin<[Options], Root> = ({ highlighter }) => {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      // 寻找符合 <pre><code>...</code></pre>
      if (node.tagName === 'pre' && node.children[0]?.type === 'element' && node.children[0].tagName === 'code') {
        const codeNode = node.children[0];
        const codeContent = (codeNode.children[0] as Text).value;
        const codeClassName = codeNode.properties?.className?.toString() || '';
        // 语言，例如：‘lang-js’,取‘js’
        const lang = codeClassName.split('-')[1];
        if (!lang) {
          return;
        }
        // 将代码内容转换为高亮的 HTML
        const highlightedCode = highlighter.codeToHtml(codeContent, {
          lang,
          themes: {
            light: 'github-light',
            dark: 'github-dark'
          }
        });
        // 将高亮后的 HTML 片段解析回 hast 格式的节点。
        const fragmentAst = fromHtml(highlightedCode, { fragment: true });
        parent.children.splice(index, 1, ...fragmentAst.children);
      }
    });
  };
};
