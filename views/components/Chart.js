import { useState, useEffect } from "react";
import { Linking, StyleSheet, View, Text } from "react-native";
import Svg, { Line, Circle, Rect, Text as SvgText } from "react-native-svg";
import { useLayout } from "react-native-web-hooks";
import ChartShape from "./ChartShape";
import ChartLine from "./ChartLine";

//TODO: consider splitting y axis into 2 child components with container as parent so y axis doesn't have to rerender every frame
//TODO: add reasonable keys
export default function Chart({
  propWidth,
  propHeight,
  milliseconds,
  dangerousData,
  nonDangerousData,
  interactiveBehaviorData,
  engagementData,
  calmnessData,
  reinforcementData,
  chartStyle,
  chartDataset,
}) {
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
  // const [data, setData] = useState([0, 6, 10, 14, 23, 28]);
  // const [data2, setData2] = useState([0, 4, 10, 12, 16, 19, 27]);

  const LINE_HEIGHT = 30;
  const DASH_LENGTH = 40; //actual dashes are 20 and numbers are 20

  function calculateTicks() {
    //returns an array of tick objects where each object is of the form {xlocation, value}
    let roughIncrement = milliseconds / 5; //aiming for around 5 ticks

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

    const pixelIncrement = (increment / milliseconds) * (widthChart - widthYAxis); //tick will be needed every x pixels

    let tickArray = [];
    let tickVal = 0;
    let tickPx = widthYAxis;

    while (tickVal < milliseconds) {
      tickArray.push({
        value: tickVal / 1000, //display should be in seconds
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

  function generateYSpacing() {
    const dashIncrement = (heightChart - LINE_HEIGHT - DASH_LENGTH) / 5;
    let yVal = LINE_HEIGHT / 2;
    let yHeights = [];
    for (let i = 0; i < 6; i++) {
      yHeights.push(yVal);
      yVal += dashIncrement;
    }
    return yHeights;
  }

  function generateYDashes(yHeightsList) {
    let yDashes = [];
    for (let ind in yHeightsList) {
      yDashes.push(
        <Line
          x1={widthYAxis}
          y1={yHeightsList[ind]}
          x2={widthYAxis - 20}
          y2={yHeightsList[ind]}
          stroke="black"
          strokeWidth="1"
          key={ind * 5}
        ></Line>
      );
    }
    return yDashes;
  }

  let yHeights = generateYSpacing();
  let yDashes = generateYDashes(yHeights);

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
        <Text style={{ lineHeight: LINE_HEIGHT }}>Interactive Behavior</Text>
        <Text style={{ lineHeight: LINE_HEIGHT }}>Engagement</Text>
        <Text style={{ lineHeight: LINE_HEIGHT }}>Calmness</Text>
        <Text style={{ lineHeight: LINE_HEIGHT }}>Reinforcement</Text>
      </View>
      <View
        // style={[styles.chartHolder, { width: propWidth, height: propHeight }]}
        style={[styles.chartHolder, chartStyle]}
        dataSet={chartDataset}
        onLayout={(e) => {
          onLayoutChart(e);
        }}
      >
        <Svg height="100%" width="100%">
          <Rect
            width={widthChart + widthYAxis}
            height={heightChart}
            fill="none"
            stroke={"none"}
            strokeWidth={2}
          ></Rect>
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
          {yDashes.map((item) => item)}
          <ChartLine //items that are higher will go on the bottom, so rect line should be highest in return statement
            data={reinforcementData}
            color="#3cdfff"
            height={yHeights[5]}
            xStart={widthYAxis}
            xEnd={widthChart}
            xScale={milliseconds}
            needsRect={true}
            chartHeight={Math.max(heightChart - DASH_LENGTH, 1)} //heightChart will show up as 0 for a split second upon render which causes an error in the console and this fixes that
          ></ChartLine>
          <ChartShape
            data={dangerousData}
            Shape={Circle}
            shapeProps={{ r: "8", fill: "blue" }}
            xPosShapeProp="cx"
            yPosShapeProp="cy"
            height={yHeights[0]}
            xStart={widthYAxis}
            xEnd={widthChart}
            xScale={milliseconds}
          ></ChartShape>
          <ChartShape
            data={nonDangerousData}
            Shape={Circle}
            shapeProps={{ r: "8", fill: "blue" }}
            xPosShapeProp="cx"
            yPosShapeProp="cy"
            height={yHeights[1]}
            xStart={widthYAxis}
            xEnd={widthChart}
            xScale={milliseconds}
          ></ChartShape>
          <ChartShape
            data={interactiveBehaviorData}
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
            height={yHeights[2] - 8}
            xStart={widthYAxis - 8}
            xEnd={widthChart - 8}
            xScale={milliseconds}
          ></ChartShape>
          <ChartLine
            data={engagementData}
            color="purple"
            height={yHeights[3]}
            xStart={widthYAxis}
            xEnd={widthChart}
            xScale={milliseconds}
            needsRect={false}
            chartHeight={Math.max(heightChart - DASH_LENGTH, 1)} //heightChart will show up as 0 for a split second upon render which causes an error in the console and this fixes that
          ></ChartLine>
          <ChartLine
            data={calmnessData}
            color="blue"
            height={yHeights[4]}
            xStart={widthYAxis}
            xEnd={widthChart}
            xScale={milliseconds}
            needsRect={false}
            chartHeight={Math.max(heightChart - DASH_LENGTH, 1)} //heightChart will show up as 0 for a split second upon render which causes an error in the console and this fixes that
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
  },
  yAxis: {
    textAlign: "right",
    justifyContent: "space-between",
    position: "absolute",
    paddingRight: 25,
  },
});
