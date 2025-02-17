# 快速启动

欢迎使用 Viteland！以下是快速启动指南，帮助您快速搭建一个基于 Viteland 的静态站点。

## 安装

首先，全局安装 Viteland：

```bash
npm install -g viteland
```

## 开发

启动开发服务器：

```bash
vl dev
```

打开浏览器访问，您将看到默认的 Viteland 站点。

## 编写内容

在 `docs` 目录中创建一个新的 Markdown 文件（例如：`index.mdx`），并编写您的内容：

```markdown
# 欢迎使用 Viteland

这是您的第一个 Viteland 页面！
```

## 配置项目

在项目的 `docs` 目录中创建或修改配置文件（如 `config.js`），定义站点的基本信息、导航、搜索等功能：

```js
export default {
  title: 'Viteland', // 站点标题
  themeConfig: {
    // 导航栏配置
    nav: [
      { text: "主页", link: "/" },
      { text: "指南", link: '/guide/' }
    ],
    // 侧边栏配置
    sidebar: {
      '/guide/': [
        {
          text: '教程',
          items: [
            { text: '快速上手', link: '/guide/start' },
            { text: '如何安装', link: '/guide/install' },
            { text: '注意事项', link: '/guide/notes' }
          ]
        }
      ]
    },
    // GitHub 链接
    github: 'https://github.com/xiyueyezibile/viteland',
    // 国际化配置
    i18n: [
      { value: 'zh-CN', text: '中文' },
      { value: 'en-US', text: 'English' }
    ]
  }
}
```

## 构建

构建您的静态站点：

```bash
vl build
```

## 部署

将 `build` 目录中的文件上传到您的部署平台，即可完成网站上线。

恭喜！您已经成功搭建了一个基于 Viteland 的静态站点。
