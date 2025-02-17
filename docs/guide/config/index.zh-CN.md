# 配置指南

在 Viteland 项目中，您可以通过配置文件 `config.js` 来定义站点的基本信息、导航、搜索等功能。以下是配置文件的详细说明。

## 基本配置

创建或修改 `docs/config.js` 文件，添加以下内容：

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

## 配置项说明

### title

`title` 是站点的标题，将显示在浏览器标签页和站点的顶部。

### themeConfig

`themeConfig` 包含站点主题的配置项。

#### nav

`nav` 是导航栏的配置，包含导航项的文本和链接。

#### sidebar

`sidebar` 是侧边栏的配置，包含侧边栏的文本和链接。

#### github

`github` 是 GitHub 仓库的链接，将显示在站点的右上角。

#### i18n

`i18n` 是国际化配置，包含语言代码和对应的文本。

## 示例

以下是一个完整的配置示例：

```js
export default {
  title: 'Viteland', // 站点标题
  themeConfig: {
    nav: [
      { text: "主页", link: "/", 'text-en-US': 'Home' },
      { text: "指南", link: '/guide/', 'text-en-US': 'Guide' }
    ],
    sidebar: {
      '/guide': [
        {
          text: '教程',
          'text-en-US': 'Guide',
          items: [
            { text: '快速上手', 'text-en-US': 'Quick Start', link: '/guide/start' },
            { text: '如何安装', 'text-en-US': 'How to install', link: '/guide/install' },
            { text: '注意事项', 'text-en-US': 'Precautions', link: '/guide/attention' }
          ]
        }
      ]
    },
    github: 'https://github.com/xiyueyezibile/viteland',
    i18n: [
      { value: 'zh-CN', text: '中文' },
      { value: 'en-US', text: 'English' }
    ]
  }
}
```

通过以上配置，您可以轻松自定义 Viteland 站点的外观和功能。
