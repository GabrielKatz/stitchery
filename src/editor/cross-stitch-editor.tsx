import React from "react";
import { Layer, Stage, Line } from "react-konva";

interface CrossStitchEditorProps {
  height: number;
  width: number;
}

export const CrossStitchEditor: React.FunctionComponent<CrossStitchEditorProps> = ({ height, width }) => {
  const ratio = 10;
  const lineFill= "#a0a0a0";
  const verticals : React.ReactNode[] = [];
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
  for(let i=0; i <= height; i++) {
    const points = [ 0, i * ratio , width * ratio, i * ratio ];
    horizontals.push(
      <Line key={i}
            points={points}
            strokeWidth={(i % 10) ?  1 : 2} 
            stroke={lineFill}>
      </Line>);
  }
  return <Stage width={800} height={600} draggable={true}>
      <Layer>
        { verticals }
      </Layer>
      <Layer>
        { horizontals }
      </Layer>
    </Stage>;
}