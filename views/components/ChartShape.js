import { useState, useEffect } from "react";
import { Linking, StyleSheet, View, Text } from "react-native";
import Svg, { G, Line } from "react-native-svg";
import { useLayout } from "react-native-web-hooks";

export default function ChartShape({data, Shape, shapeProps, xPosShapeProp, yPosShapeProp, height, xStart, xEnd, xScale}){
    let shapes = []
    const xIncrement = (xEnd - xStart) / xScale;
    for(let ind in data){
        let xPos = data[ind] * xIncrement + xStart;
        let tempShapeProps = structuredClone(shapeProps)
        tempShapeProps[xPosShapeProp] = xPos;
        tempShapeProps[yPosShapeProp] = height;
        shapes.push(

                <Shape {...tempShapeProps}></Shape>

        )
    }
    
    return <>{shapes.map((item) => item)}</>;
}