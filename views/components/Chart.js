import { useState, useEffect } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import Svg, { Line } from "react-native-svg";
import { useLayout } from "react-native-web-hooks";

export default function Chart(){
    const { onLayout, width, height, x, y } = useLayout();
    const [data, setData] = useState([]);
    let numSeconds = 230;

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
        console.log(increment)

        const pixelIncrement = (increment / numSeconds) * width; //tick will be needed every x pixels

        let tickArray = []
        let tickVal = 0;
        let tickPx = 0;

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
                y1={height}
                x2={xLocation}
                y2={height - 20}
                stroke="black"
                strokeWidth="2"
                key={ind}
              />
            );
        }
        console.log(lineArray)
        return lineArray;
    }

    const lineArray = generateTicks();
    console.log('width ' + width);
    
    return (
      <View style={styles.chartHolder} onLayout={onLayout}>
        <Svg height="100%" width="100%">
          <Line x1='0' y1={height} x2={width} y2={height} stroke='black' strokeWidth='2'
          key='33'
          />
          {lineArray.map((item) => item)}
        </Svg>
      </View>
    );
}

const styles = StyleSheet.create({
    chartHolder: {
        alignSelf: 'center',
        marginHorizontal: 'auto',
        // borderColor: 'black',
        // borderWidth: 2,
        // borderStyle: 'dotted',
        height: 500,
        width: 500,
    },
})