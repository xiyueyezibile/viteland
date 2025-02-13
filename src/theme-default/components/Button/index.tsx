import React from 'react';
import { Link } from '../Link';
import styles from './index.module.scss';

interface ButtonProps {
  type?: string;
  size?: 'medium' | 'big';
  theme?: 'brand' | 'alt';
  text: string;
  href?: string;
  external?: boolean;
  className?: string;
}

// 导出一个名为Button的函数，接收一个ButtonProps类型的参数props
export function Button(props: ButtonProps) {
  // 从props中解构出theme、size、href、external、className属性，并赋予默认值
  const { theme = 'brand', size = 'big', href = '/', external = false, className = '' } = props;
  // 声明一个type变量，初始值为null
  let type: string | typeof Link | null = null;

  // 如果props中type属性为'button'，则type的值为'button'
  if (props.type === 'button') {
    type = 'button';
    // 如果props中type属性为'a'，则type的值为external为true时为'a'，否则为Link
  } else if (props.type === 'a') {
    type = external ? 'a' : Link;
  }

  // 返回一个React元素，元素类型为type或'a'，属性包括className和href，内容为props中的text
  return React.createElement(
    type ?? 'a',
    {
      className: `${styles.button} ${styles[theme]} ${styles[size]} ${className}`,
      href
    },
    props.text
  );
}
