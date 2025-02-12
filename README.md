
欢迎使用我们基于 Vite 的强大静态站点生成器！这个工具不仅提供了丰富的开发体验，还支持在 Markdown 文件中编写 React 组件，并拥有强大的默认全文搜索主题。让我们开始快速创建您的静态站点吧。

## 简介
我们的静态站点生成器具备以下核心功能：

- 🚀 基于 Vite：带来快速的开发和构建体验。
- 📝 MDX 支持：使您可以在 Markdown 文件中无缝编写和使用 React 组件。
- 🔥 全功能搜索主题：支持多语言（i18n）等特性，让您的网站内容检索更高效。
- 🏝️ 岛屿架构：通过减少客户端捆绑包大小和实现部分水化，提升性能。

## 快速开始

```bash
npm install -g viteland
vl dev
```

## 编写内容
创建 Markdown 文件：

在 content 目录中，创建一个新的 Markdown 文件（例如：index.mdx），编写您的内容并添加 React 组件：

```markdown
# 欢迎使用我的网站

<MyComponent />

一些介绍内容...
```
您可以在该文件中直接使用 React 组件，如 <MyComponent />。

## 配置项目：

在项目的 docs 目录创建或修改配置文件（如 config.js），定义站点的基本信息、导航、搜索等功能。

这是一份基本的配置示例：
```js
export default {
  title:'Viteland',
  themeConfig: {
    nav: [
      {text: "主页", link: "/"},
      {text: "指南", link: '/guide/'}
    ],
    sidebar: {
      '/guide/': [
        {
          text: '教程',
          items: [
            {
              text: '快速上手',
              link: '/guide/a'
            },
            {
              text: '如何安装',
              link: '/guide/b'
            },
            {
             text: '注意事项',
             link: '/guide/c'
            }
          ]
        }
      ]
    }
  }
}
```

## 部署
在选择部署平台后，根据平台要求将 dist 目录中的文件上传即可完成网站上线。