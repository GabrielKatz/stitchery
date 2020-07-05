import React, { useState } from "react";
import { Layer, Stage, Line, Rect } from "react-konva";
import './cross-stitch-editor.scss';
import { KonvaEventObject } from "konva/types/Node";

interface CrossStitchEditorProps {
  image: string[][];
  onSelect: (x: number, y: number) => void;
}


export const CrossStitchEditor: React.FunctionComponent<CrossStitchEditorProps> = ({ image, onSelect }) => {
  const ratio = 10;
  const lineFill= "#a0a0a0";
  const verticals : React.ReactNode[] = [];
  const height = image.length;
  const width = (image[0] && image[0].length) || 0;
  const [isClicked, setIsClicked] = useState(false);

  for(let i=0; i <= width; i++) {
    const points = [ i * ratio, 0, i * ratio, height * ratio ];
    verticals.push(
      <Line key={i}
            points={points}
            strokeWidth={(i % 10) ?  1 : 2} 
            stroke={lineFill}>
      </Line>);
  }
  const horizontals : React.ReactNode[] = [];

  const doDrag  = (e: KonvaEventObject<MouseEvent>) => {    
    const stage = e.target.getStage();
    const pointerPosition = stage!.getPointerPosition();
    if(!pointerPosition)
      return;
    onSelect(Math.floor(pointerPosition.x / ratio), Math.floor(pointerPosition.y / ratio));
  }

  const onDrag = (e: KonvaEventObject<MouseEvent>) => {
    if(!isClicked) {
      return;
    }
    doDrag(e);
  }

  const onStartDrag = (e: KonvaEventObject<MouseEvent>) => {
    setIsClicked(true);
    doDrag(e);
  }

  const onEndDrag = () => {
    setIsClicked(false);
  }
  for(let i=0; i <= height; i++) {
    const points = [ 0, i * ratio , width * ratio, i * ratio ];
    horizontals.push(
      <Line key={i}
            points={points}
            strokeWidth={(i % 10) ?  1 : 2} 
            stroke={lineFill}>
      </Line>);
  }
  return <Stage width={width * ratio} height={height * ratio} className="editor" onMouseDown={onStartDrag} onMouseMove={onDrag} onMouseUp={onEndDrag} onMouseLeave={onEndDrag}>
      <Layer>
        { image.map((row, i) => 
          row.map((column, j) => 
            column !== '#ffffff' &&
            <Rect key={i*width + j} 
                  useCache
                  x={j * ratio} 
                  y={i * ratio} 
                  width={ratio} 
                  height={ratio} 
                  strokeWidth={0} 
                  fill={column}
                  transformsEnabled="position"
            />
          )
        )}
      </Layer>
      <Layer>
        { verticals }
        { horizontals }
      </Layer>
    </Stage>;
}