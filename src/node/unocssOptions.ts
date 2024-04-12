import { VitePluginConfig } from 'unocss/vite';
import { presetAttributify, presetWind, presetIcons } from 'unocss';

const options: VitePluginConfig = {
  presets: [presetAttributify(), presetWind({}), presetIcons()],
  rules: [
    [
      /^divider-(\w+)$/,
      ([, w]) => ({
        [`border-${w}`]: '1px solid var(--viteland-c-divider-light)'
      })
    ],
    [
      'menu-item-before',
      {
        'margin-right': '12px',
        'margin-left': '12px',
        width: '1px',
        height: '24px',
        'background-color': 'var(--viteland-c-divider-light)',
        content: '" "'
      }
    ]
  ],
  shortcuts: {
    'flex-center': 'flex justify-center items-center'
  },
  theme: {
    colors: {
      brandLight: 'var(--viteland-c-brand-light)',
      brandDark: 'var(--viteland-c-brand-dark)',
      brand: 'var(--viteland-c-brand)',
      text: {
        1: 'var(--viteland-c-text-1)',
        2: 'var(--viteland-c-text-2)',
        3: 'var(--viteland-c-text-3)',
        4: 'var(--viteland-c-text-4)'
      },
      divider: {
        default: 'var(--viteland-c-divider)',
        light: 'var(--viteland-c-divider-light)',
        dark: 'var(--viteland-c-divider-dark)'
      },
      gray: {
        light: {
          1: 'var(--viteland-c-gray-light-1)',
          2: 'var(--viteland-c-gray-light-2)',
          3: 'var(--viteland-c-gray-light-3)',
          4: 'var(--viteland-c-gray-light-4)'
        }
      },
      bg: {
        default: 'var(--viteland-c-bg)',
        soft: 'var(--viteland-c-bg-soft)',
        mute: 'var(--viteland-c-bg-mute)'
      }
    }
  }
};

export default options;
