# Configuration Guide

In a Viteland project, you can define the basic information, navigation, search, and other functions of the site through the `config.js` configuration file. Below is a detailed explanation of the configuration file.

## Basic Configuration

Create or modify the `docs/config.js` file and add the following content:

```js
export default {
  title: 'Viteland', // Site title
  themeConfig: {
    // Navigation bar configuration
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: '/guide/' }
    ],
    // Sidebar configuration
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Quick Start', link: '/guide/start' },
            { text: 'How to Install', link: '/guide/install' },
            { text: 'Precautions', link: '/guide/notes' }
          ]
        }
      ]
    },
    // GitHub link
    github: 'https://github.com/xiyueyezibile/viteland',
    // Internationalization configuration
    i18n: [
      { value: 'zh-CN', text: '中文' },
      { value: 'en-US', text: 'English' }
    ]
  }
}
```

## Configuration Item Description

### title

`title` is the title of the site, which will be displayed in the browser tab and at the top of the site.

### themeConfig

`themeConfig` contains the configuration items for the site theme.

#### nav

`nav` is the configuration of the navigation bar, containing the text and links of the navigation items.

#### sidebar

`sidebar` is the configuration of the sidebar, containing the text and links of the sidebar items.

#### github

`github` is the link to the GitHub repository, which will be displayed in the upper right corner of the site.

#### i18n

`i18n` is the internationalization configuration, containing the language codes and corresponding texts.

## Example

Below is a complete configuration example:

```js
export default {
  title: 'Viteland', // Site title
  themeConfig: {
    nav: [
      { text: "Home", link: "/", 'text-en-US': 'Home' },
      { text: "Guide", link: '/guide/', 'text-en-US': 'Guide' }
    ],
    sidebar: {
      '/guide': [
        {
          text: 'Guide',
          'text-en-US': 'Guide',
          items: [
            { text: 'Quick Start', 'text-en-US': 'Quick Start', link: '/guide/start' },
            { text: 'How to Install', 'text-en-US': 'How to install', link: '/guide/install' },
            { text: 'Precautions', 'text-en-US': 'Precautions', link: '/guide/attention' }
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

With the above configuration, you can easily customize the appearance and functionality of the Viteland site.
