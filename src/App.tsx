import React, { useState, ChangeEvent } from 'react';
import { Input } from 'antd';
import { CrossStitchEditor } from './editor/cross-stitch-editor';
import './App.scss';

function App() {
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(120);

  const onHeightChange = (ev: ChangeEvent<HTMLInputElement>) => setHeight(+ev.target.value);
  const onWidthChange = (ev: ChangeEvent<HTMLInputElement>) => setWidth(+ev.target.value);

  return (
    <div className="App">
      <Input type="number" addonBefore="height" value={height} onChange={onHeightChange}/>
      <br/>
      <br/>
      <Input type="number" addonBefore="width" value={width} onChange={onWidthChange}/>
      <br/>
      <br/>
      <CrossStitchEditor height={height} width={width} />
    </div>
  );
}

export default App;
