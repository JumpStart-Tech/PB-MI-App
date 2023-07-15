import { useState, useEffect } from "react";
import { Linking, StyleSheet, View, Text } from "react-native";
import Svg, { G, Line, Rect } from "react-native-svg";
import { useLayout } from "react-native-web-hooks";

export default function ChartLine({ data, color, height, xStart, xEnd, xScale}) {
  function generateLines() {
    const xIncrement = (xEnd - xStart) / xScale;
    let lines = [];
    for (let i = 0; i < data.length; i += 2) {
      //note that it's counting by 2
      let lineStart = data[i] * xIncrement + xStart;
      let lineEnd = null;
      if (i + 1 < data.length) {
        //the line has a pair
        lineEnd = data[i + 1] * xIncrement + xStart;
      } else {
        //the line goes until the end of the chart
        lineEnd = xEnd;
      }
      lines.push(
        <Line
          x1={lineStart}
          y1={height - 5}
          x2={lineStart}
          y2={height + 5}
          stroke={color}
          strokeWidth="1"
        ></Line>
      ); //vertical start line
      lines.push(
        <Line
          x1={lineStart}
          y1={height}
          x2={lineEnd}
          y2={height}
          stroke={color}
          strokeWidth="1"
        ></Line>
      ); //horizontal line
      lines.push(
        <Line
          x1={lineEnd}
          y1={height - 5}
          x2={lineEnd}
          y2={height + 5}
          stroke={color}
          strokeWidth="1"
        ></Line>
      ); //vertical end line
    }
    for (let i = 1; i < data.length; i += 2) {
      //note that it's counting by 2
      let lineStart = data[i] * xIncrement + xStart;
      let lineEnd = null;
      if (i + 1 < data.length) {
        //the line has a pair
        lineEnd = data[i + 1] * xIncrement + xStart;
      } else {
        //the line goes until the end of the chart
        lineEnd = xEnd;
      }
      lines.push(
        
      );
    }
    return lines;
  }
  let lines = generateLines()

  return <>
  {lines.map((item) => item)}
  </>;
}
