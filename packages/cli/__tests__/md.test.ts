import { unified } from 'unified';
import { describe, test, expect } from 'vitest';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { getHighlighter } from 'shiki/bundle/full';
import { rehypePluginShiki } from '../plugins/plugin-mdx/rehypePlugins/shiki';
import { remarkPluginToc } from '../plugins/plugin-mdx/remarkPlugins/toc';

describe('Markdown compile cases', async () => {
  // 初始化 processor
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypePluginShiki, {
      highlighter: await getHighlighter({
        langs: ['html', 'css', 'js'],
        themes: ['github-dark', 'github-light']
      })
    });

  test('Compile title', async () => {
    const mdContent = '# 123';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot('"<h1>123</h1>"');
  });

  test('Compile code', async () => {
    const mdContent = 'I am using `Island.js`';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot('"<p>I am using <code>Island.js</code></p>"');
  });
  // ...
  test('Compile code block', async () => {
    const mdContent = '```js\nconsole.log(123);\n```';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot(`
      "<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">console.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">log</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#005CC5;--shiki-dark:#79B8FF">123</span><span style="color:#24292E;--shiki-dark:#E1E4E8">);</span></span>
      <span class="line"></span></code></pre>"
    `);
  });
});
