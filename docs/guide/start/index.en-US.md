# Quick Start

Welcome to Viteland! Here is a quick start guide to help you quickly set up a static site based on Viteland.

## Installation

First, install Viteland globally:

```bash
npm install -g viteland
```

## Development

Start the development server:

```bash
vl dev
```

Open your browser and visit `http://localhost:3000`, you will see the default Viteland site.

## Writing Content

Create a new Markdown file (e.g., `index.mdx`) in the `docs` directory and write your content:

```markdown
# Welcome to Viteland

This is your first Viteland page!
```

## Configuring the Project

Create or modify the configuration file (e.g., `config.js`) in the project's `docs` directory to define the basic information, navigation, search, and other functions of the site:

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

## Build

Build your static site:

```bash
vl build
```

## Deployment

Upload the files in the `build` directory to your deployment platform to complete the website launch.

Congratulations! You have successfully set up a static site based on Viteland.
