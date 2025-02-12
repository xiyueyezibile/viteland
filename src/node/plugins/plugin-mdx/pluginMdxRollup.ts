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
      // 支持 GitHub Flavored Markdown (GFM)，例如任务列表、表格和删除线等语法
      remarkPluginGFM,
      // 支持解析 Markdown 文件头部的 YAML/ TOML 格式的前置内容。
      remarkPluginFrontmatter,
      // 支持解析 MDX 文件中 YAML 格式的前置数据，并将其作为属性，包括在内容中。 被命名为 frontmatter 并用于提取元数据。
      [remarkPluginMDXFrontMatter, { name: 'frontmatter' }],
      // 生成表格 (Table of Contents，TOC)，帮助构建文章的章节目录。
      remarkPluginToc
    ],
    rehypePlugins: [
      // 为每个标题元素生成唯一的 slug（用于锚点链接的 ID）。被用来配合 rehype-autolink-headings 为每个标题生成 ID
      rehypePluginSlug,
      [
      // 自动为文档中的标题生成链接，实现页面内导航。
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
        // shiki 是一个代码高亮工具，通过 rehypePluginShiki 和 getHighlighter 可以进行代码高亮。
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
