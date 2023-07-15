import { useState, useEffect } from "react";
import { Linking, StyleSheet, View, Text } from "react-native";
import Svg, { Line, Circle, Rect, Text as SvgText } from "react-native-svg";
import { useLayout } from "react-native-web-hooks";
import ChartShape from "./ChartShape";
import ChartLine from "./ChartLine";

//TODO: switch the generateTestDashes function to generate a map from y axis label to height
//TODO: make it work when page is resized maybe by throwing everything into a useEffect
//TODO: consider splitting y axis into 2 child components with container as parent so y axis doesn't have to rerender every frame
//TODO: add reasonable keys
export default function Chart() {
  const {
    onLayout: onLayoutChart,
    width: widthChart,
    height: heightChart,
    x: xChart,
    y: yChart,
  } = useLayout();
  const {
    onLayout: onLayoutYAxis,
    width: widthYAxis,
    height: heightYAxis,
    x: xYAxis,
    y: yYAxis,
  } = useLayout();
  const [data, setData] = useState([6, 10, 14, 23, 28]);
  const [data2, setData2] = useState([0, 4, 10, 12, 16, 19, 27]);
  let [numSeconds, setNumSeconds] = useState(30);
  
  const LINE_HEIGHT = 30;
  const DASH_LENGTH = 40;


  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setNumSeconds((numSeconds) => numSeconds + .1);
  //   }, 100);
  //   // clear interval on re-render to prevent multiple intervals from running
  //   return () => clearInterval(intervalId);
  //   // no dependency array, meaning it will run once on mount, and cleanup on unmount
  // }, []);

  function calculateTicks() {
    //returns an array of tick objects where each object is of the form {xlocation, value}
    let roughIncrement = numSeconds / 5; //aiming for around 5 ticks

    // Calculate closest power of 10
    let power = Math.floor(Math.log10(roughIncrement));
    let increment = Math.pow(10, power);
    let residual = roughIncrement / increment;

    // "Pretty" increment rounding
    if (residual < 3.5) {
      increment = increment * 2; // e.g., 2, 20, 200, etc.
    } else if (residual < 7.5) {
      increment = increment * 5; // e.g., 5, 50, 500, etc.
    } else {
      increment = increment * 10; // e.g., 10, 100, 1000, etc.
    }

    const pixelIncrement = (increment / numSeconds) * (widthChart - widthYAxis); //tick will be needed every x pixels

    let tickArray = [];
    let tickVal = 0;
    let tickPx = widthYAxis;

    while (tickVal < numSeconds) {
      tickArray.push({
        value: tickVal,
        xLocation: tickPx,
      });
      tickVal += increment;
      tickPx += pixelIncrement;
    }
    return tickArray;
  }

  function generateTicks() {
    const tickArray = calculateTicks();
    let lineArray = [];
    for (let ind in tickArray) {
      const { value, xLocation } = tickArray[ind];
      lineArray.push(
        <Line
          x1={xLocation}
          y1={heightChart - 20}
          x2={xLocation}
          y2={heightChart - DASH_LENGTH}
          stroke="black"
          strokeWidth="1"
          key={ind}
        />
      );
      lineArray.push(
        <SvgText
          fill="black"
          stroke="black"
          fontSize="20"
          fontWeight="normal"
          x={xLocation}
          y={heightChart}
          textAnchor="middle"
          alignmentBaseline="ideographic"
        >
          {value}
        </SvgText>
      );
    }
    return lineArray;
  }

  const lineArray = generateTicks();


  function generateTestDashes() {
    const dashIncrement = (heightChart - LINE_HEIGHT - DASH_LENGTH) / 5;
    let yVal = LINE_HEIGHT / 2;
    let yHeights = [];
    for (let i = 0; i < 6; i++) {
      yHeights.push(yVal);
      yVal += dashIncrement;
    }
    return yHeights;
  }

  let yHeights = generateTestDashes();

  return (
    <>
      <View
        style={[
          styles.yAxis,
          { height: heightChart - DASH_LENGTH, top: yChart, left: xChart },
        ]}
        onLayout={onLayoutYAxis}
      >
        <Text style={{ lineHeight: LINE_HEIGHT }}>Dangerous</Text>
        <Text style={{ lineHeight: LINE_HEIGHT }}>Nondangerous</Text>
        <Text style={{ lineHeight: LINE_HEIGHT }}>
          Interactive Behavior
        </Text>
        <Text style={{ lineHeight: LINE_HEIGHT }}>Engagement</Text>
        <Text style={{ lineHeight: LINE_HEIGHT }}>Calmness</Text>
        <Text style={{ lineHeight: LINE_HEIGHT }}>Reinforcement</Text>
      </View>
      <View style={styles.chartHolder} onLayout={onLayoutChart}>
        <Svg height="100%" width="100%">
          <Line
            x1={widthYAxis}
            y1={heightChart - DASH_LENGTH}
            x2={widthChart}
            y2={heightChart - DASH_LENGTH}
            stroke="black"
            strokeWidth="2"
            key="33"
          />
          <Line
            x1={widthYAxis}
            y1="0"
            x2={widthYAxis}
            y2={heightChart - DASH_LENGTH}
            stroke="black"
            strokeWidth="2"
            key="34"
          />
          {lineArray.map((item) => item)}
          <ChartShape
            data={data}
            Shape={Circle}
            shapeProps={{ r: "8", fill: "blue" }}
            xPosShapeProp="cx"
            yPosShapeProp="cy"
            height={yHeights[0]}
            xStart={widthYAxis}
            xEnd={widthChart}
            xScale={numSeconds}
          ></ChartShape>
          <ChartShape
            data={data2}
            Shape={Rect}
            shapeProps={{
              width: 16,
              height: 16,
              fill: "white",
              stroke: "black",
              strokeWidth: 2,
            }}
            xPosShapeProp="x"
            yPosShapeProp="y"
            height={yHeights[3] - 8}
            xStart={widthYAxis - 8}
            xEnd={widthChart - 8}
            xScale={numSeconds}
          ></ChartShape>
          <ChartLine
            data={data}
            color="red"
            height={yHeights[4]}
            xStart={widthYAxis}
            xEnd={widthChart}
            xScale={numSeconds}
          ></ChartLine>
        </Svg>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  chartHolder: {
    alignSelf: "center",
    marginHorizontal: "auto",
    // borderColor: 'black',
    // borderWidth: 2,
    // borderStyle: 'dotted',
    height: 500,
    width: 800,
  },
  yAxis: {
    textAlign: "right",
    // borderColor: "black",
    // borderWidth: 2,
    // borderStyle: 'dotted',
    justifyContent: "space-between",
    position: "relative",
    paddingRight: 5,
  },
});
