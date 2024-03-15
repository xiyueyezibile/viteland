import { createElement, useState } from 'react';
//@ts-ignore .d.ts 报错 namespace child (hoisting) not supported yet，但实际存在
import siteData from 'viteland:site-data';
import Content from './Content';

export default function App() {
  console.log(siteData);

  return (
    <div>
      <h1>Common Content</h1>
      <h1>Doc Content</h1>
      <Content />
    </div>
  );
}
