import React from "react";
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

  const clickHandler = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    const pointerPosition = stage!.getPointerPosition();
    if(!pointerPosition)
      return;
    onSelect(Math.floor(pointerPosition.x / ratio), Math.floor(pointerPosition.y / ratio));
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
  return <Stage width={width * ratio} height={height * ratio} className="editor" onClick={clickHandler}>
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