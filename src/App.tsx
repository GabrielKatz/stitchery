import React, { useState, ChangeEvent } from 'react';
import { Input } from 'antd';
import { CrossStitchEditor } from './editor/cross-stitch-editor';
import './App.scss';
import produce from 'immer';

function App() {
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(120);
  const getNewImageForSize = (oldImage: string[][]) => {
    const newImage: string[][] = [];
    for(let i=0; i<height; i++){
      newImage.push([]);
      for(let j=0; j< width; j++) {
        newImage[i].push((oldImage[i] && oldImage[i][j]) || '#ffffff');
      }
    }
    return newImage;  
  }
  const color = '#000000';

  const [image, setImage] = useState<string[][]>(getNewImageForSize([]));

  const onHeightChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setHeight(+ev.target.value);
    setImage(getNewImageForSize(image));
  }
  const onWidthChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setWidth(+ev.target.value);
    setImage(getNewImageForSize(image));
  }

  const onFieldSelect = (x: number, y: number) => {
    setImage(produce(image, draft => {
      draft[y][x]= color;
    }));
  }

  return (
    <div className="App">
      <Input type="number" addonBefore="height" value={height} onChange={onHeightChange}/>
      <br/> 
      <br/>
      <Input type="number" addonBefore="width" value={width} onChange={onWidthChange}/>
      <br/>
      <br/>
      <div className="editor-container">
        <CrossStitchEditor image={image} onSelect={onFieldSelect}/>
      </div>
    </div>
  );
}

export default App;
