import { useState, useEffect } from "react";
import { Linking, StyleSheet, View, Text } from "react-native";
import Svg, { Line } from "react-native-svg";
import { useLayout } from "react-native-web-hooks";

//TODO: make it work when page is resized maybe by throwing everything into a useEffect
//TODO: consider splitting y axis into 2 child components with container as parent so y axis doesn't have to rerender every frame
export default function Chart(){
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
    const [data, setData] = useState([]);
    let [numSeconds, setNumSeconds] = useState(230);

    const DASH_LENGTH = 20;

    // useEffect(() => {
    //   const intervalId = setInterval(() => {
    //     setNumSeconds((numSeconds) => numSeconds + 10);
    //   }, 1000);
    //   // clear interval on re-render to prevent multiple intervals from running
    //   return () => clearInterval(intervalId);
    //   // no dependency array, meaning it will run once on mount, and cleanup on unmount
    // }, []);

    function calculateTicks(){ //returns an array of tick objects where each object is of the form {xlocation, value}
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
        console.log(increment);

        const pixelIncrement = (increment / numSeconds) * (widthChart - widthYAxis); //tick will be needed every x pixels

        let tickArray = [];
        let tickVal = 0;
        let tickPx = widthYAxis;

        while(tickVal < numSeconds){
            tickArray.push({
                value: tickVal,
                xLocation: tickPx,
            })
            tickVal += increment;
            tickPx += pixelIncrement;
        }
        console.log(tickArray);
        return tickArray;
    }

    function generateTicks(){
        const tickArray = calculateTicks();
        let lineArray = [];
        for(let ind in tickArray){
            const {value, xLocation} = tickArray[ind];
            lineArray.push(
              <Line
                x1={xLocation}
                y1={heightChart}
                x2={xLocation}
                y2={heightChart - DASH_LENGTH}
                stroke="black"
                strokeWidth="1"
                key={ind}
              />
            );
        }
        console.log(lineArray)
        return lineArray;
    }

    const lineArray = generateTicks();
    console.log("width " + widthChart);

    function handleOnLayout(event){
      const { textWidth } = event.nativeEvent.layout;
      console.log("Text width: ", textWidth);
    };
    
    return (
      <>
        <View
          style={[
            styles.yAxis,
            { height: heightChart - DASH_LENGTH, top: yChart, left: xChart },
          ]}
          onLayout={onLayoutYAxis}
        >
          <Text onLayout={handleOnLayout}>Dangerous</Text>
          <Text>Nondangerous</Text>
          <Text>Interactive Behavior</Text>
          <Text>Engagement</Text>
          <Text>Calmness</Text>
          <Text>Reinforcement</Text>
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
    justifyContent: 'space-between',
    position: 'relative',
    paddingRight: 5,
  },
});