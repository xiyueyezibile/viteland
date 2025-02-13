export default {
  title:'Viteland',
  themeConfig: {
    nav: [
      {text: "主页", link: "/", 'text-en-US': 'Home'},
      {text: "指南", link: '/guide/', 'text-en-US': 'Guide'}
    ],
    sidebar: {
      '/guide': [
        {
          text: '教程',
          'text-en-US': 'Guide',
          items: [
            {
              text: '快速上手',
              'text-en-US': 'Quick Start',
              link: '/guide/start'
            },
            {
              text: '如何安装',
              'text-en-US': 'How to install',
              link: '/guide/install'
            },
            {
             text: '注意事项',
              'text-en-US': 'Precautions',
             link: '/guide/attention'
            }
          ]
        }
      ]
    },
    github: 'https://github.com/xiyueyezibile/viteland',
    i18n: [{
      value: 'zh-CN',
      text: '中文'
    }, {
      value: 'en-US',
      text: 'English'
    }]
  }
}