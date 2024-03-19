import pluginMdx from '@mdx-js/rollup';
// 一个比较知名的 Markdown 语法规范
import remarkPluginGFM from 'remark-gfm';
// 下面两个 plugin 配合自动生成锚点
import rehypePluginAutolinkHeadings from 'rehype-autolink-headings';
import rehypePluginSlug from 'rehype-slug';
// 下面两个插件解析页面元信息
import remarkPluginMDXFrontMatter from 'remark-mdx-frontmatter';
import remarkPluginFrontmatter from 'remark-frontmatter';

import { rehypePluginShiki } from './rehypePlugins/shiki';
import { getHighlighter } from 'shiki/bundle/full';
import { remarkPluginToc } from './remarkPlugins/toc';

export async function pluginMdxRollup() {
  return pluginMdx({
    remarkPlugins: [
      remarkPluginGFM,
      remarkPluginFrontmatter,
      [remarkPluginMDXFrontMatter, { name: 'frontmatter' }],
      remarkPluginToc
    ],
    rehypePlugins: [
      rehypePluginSlug,
      [
        rehypePluginAutolinkHeadings,
        {
          properties: {
            class: 'header-anchor'
          },
          content: {
            type: 'text',
            value: '#'
          }
        }
      ],
      [
        rehypePluginShiki,
        {
          highlighter: await getHighlighter({
            langs: ['html', 'css', 'js'],
            themes: ['github-dark', 'github-light']
          })
        }
      ]
    ]
  });
}
