import { useState } from 'react';
//@ts-ignore .d.ts 报错，但实际存在
import siteData from 'viteland:site-data';

export default function App() {
  const [count, setCount] = useState(0);
  console.log(siteData);

  return (
    <div>
      <h1>This is Layout Component</h1>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>Add Count</button>
      </div>
    </div>
  );
}
