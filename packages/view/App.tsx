import { createElement, useState } from 'react';

import Content from './Content';
import siteData from './virtual-modules/site-data';

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
