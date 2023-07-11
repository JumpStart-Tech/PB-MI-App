import { StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable, SafeAreaView, Alert } from "react-native";
import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import EmailComments from "./components/EmailComments";
import SummaryData from "./components/SummaryData";
import RoundButton from "./components/RoundButton";
import SquareButton from "./components/SquareButton";

{/* TODO: must store keys and values and track time in EO vs SR */}
{/* TODO: must pull in keys and values from Learner screen */}

// Session screen that is displayed while session is running
const Session = ({navigation, route}) => {

  // take id from previous screen
  const userId = route.params?.userId || "0000";
  console.log('id from param:' + userId);
  const learnerId = route.params?.learnerId || "0000";
  console.log('Learner ID from param:' + learnerId);
  const sessionName = route.params?.sessionName || "Session Name";
  console.log('Session name from param:' + sessionName);

  // tracks colors of buttons depending on whether they are selected
  const [colorEO, setColorEO] = useState('#048CCC'); 
  const [colorSR, setColorSR] = useState('#04A69D80');

  //tracks times EO button has been pressed
  const [countEO, setCountEO] = useState(0);

  // change button colors
  const changeColor = (isEO, color, setColor) => {
    //prevent two options from being selected at once
    if (color === '#04A69D80') { // light color
        setColorEO('#04A69D80');
        setColorSR('#04A69D80');
        }
    //toggle color selection
    if (color === '#04A69D80') { // unselected button
        setColor('#048CCC'); // dark color
    }
    {/* TODO: should the counter go up when selecting EO even when it is already selected? move inside above if statement if not */}
    if (isEO) {
        setCountEO(countEO + 1);
    }
  }

  const CalmButton = () => {
      const [timerRunning, setTimerRunning] = useState(false);
      const [countdown, setCountdown] = useState(0);

      const startTimer = () => {
        setTimerRunning(true);
        setCountdown(30); // Set the initial countdown time (in seconds)
      };

      useEffect(() => {
        let intervalId;
        if (timerRunning) {
          intervalId = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
          }, 1000); // Update countdown every second
        }

        if (countdown === 0) {
          clearInterval(intervalId);
          setTimerRunning(false);
        }

        return () => {
          clearInterval(intervalId);
        };
      }, [timerRunning, countdown]);

      return (
        <View style={{flexDirection: 'row'}}>
          <SquareButton buttonText = {"Calm"} buttonHeight = {"0.8"} onClick = {startTimer} disabled = {timerRunning}></SquareButton>
          {timerRunning && <Text style={[styles.text, {alignSelf: 'center'}]}>{countdown}s</Text>}
          {/* TODO: timer disappears whenever any other buttons are pressed */}
        </View>
      );
    };

  return (
    <SafeAreaView>
      <View>
        <Header userId = {userId} navigation = {navigation}></Header>
      </View>
      <View style = {styles.page}>
        <Text style = {styles.title}>{sessionName}</Text>
        {/* Top half of screen */}
        <View style = {{flexDirection: 'row'}}>
            <View style = {styles.topLeftContainer}>
              {/* graph goes here */}
            </View>
            <View style = {styles.topRightContainer}>
              <View style = {{marginBottom: 5}}>
                <SquareButton buttonText = {"Confirm Control"} buttonWidth = {"2"} buttonHeight = {"0.8"}
                  /* TODO: must notify machine learning algorithm */
                  onClick = {() => {alert("Machine learning algorithm notified.")}}>
                </SquareButton>
              </View>
              <View style = {{flexDirection: 'row', marginBottom: 5}}>
                <SquareButton buttonText = {"EO"} buttonWidth = {"0.7"} buttonHeight = {"0.7"} color = {colorEO} onClick = {() => changeColor(true, colorEO, setColorEO)}></SquareButton>
                <SquareButton buttonText = {"SR"} buttonWidth = {"0.7"} buttonHeight = {"0.7"} color = {colorSR} onClick = {() => changeColor(false, colorSR, setColorSR)}></SquareButton>
                <SquareButton buttonText = {countEO} buttonWidth = {"0.7"} buttonHeight = {"0.7"} color = {'#04A69D40'}></SquareButton>
              </View>
              <CalmButton></CalmButton>
            </View>
        </View>

        {/* Bottom half of screen */}
        <View style = {{flexDirection: 'row'}}>
            <View style = {styles.bottomLeftContainer}>
              <Text style = {styles.text}>RIA: </Text>
              <Text style = {styles.text}>RPI: </Text>
              <Text style = {styles.text}>Timer: </Text>
              <Text style = {styles.text}>EO Time: </Text>
              <Text style = {styles.text}>SR Time: </Text>
              <Text style = {styles.text}>PB Logged: </Text>
              <Text style = {styles.text}>PB During EO: </Text>
              <Text style = {styles.text}>PB During SR: </Text>
            </View>
            <View style = {styles.bottomRightContainer}>
            {/* 9 problem behavior (PB) buttons */}
              <View style = {{flexDirection: 'row'}}>
                <SquareButton buttonText = {"PB 1"}></SquareButton>
                <SquareButton buttonText = {"PB 2"}></SquareButton>
                <SquareButton buttonText = {"PB 3"}></SquareButton>
              </View>
              <View style = {{flexDirection: 'row'}}>
                <SquareButton buttonText = {"PB 4"}></SquareButton>
                <SquareButton buttonText = {"PB 5"}></SquareButton>
                <SquareButton buttonText = {"PB 6"}></SquareButton>
              </View>
              <View style = {{flexDirection: 'row', marginBottom: 10}}>
                <SquareButton buttonText = {"PB 7"}></SquareButton>
                <SquareButton buttonText = {"PB 8"}></SquareButton>
                <SquareButton buttonText = {"PB 9"}></SquareButton>
              </View>
              <View style = {{flexDirection: 'row'}}>
                <RoundButton buttonWidth = {"0.85"} buttonText = {"Undo"}></RoundButton>
                <RoundButton buttonWidth = {"0.85"} buttonText = {"Redo"}></RoundButton>
              </View>
            </View>
        </View>
          <View style = {styles.bottomContainer}>
            <Pressable style = {styles.buttons}>
              {/* TODO: must store data and clear values */}
              <Text style = {styles.buttonText}>Reset</Text>
            </Pressable>
            <Pressable style = {styles.buttons}
              /* TODO: must end all timers and store data when clicking end session */
              onPress = {() => navigation.navigate("Summary", {userId: userId, learnerId: learnerId})}>
              <Text style = {styles.buttonText}>End Session</Text>
            </Pressable>
            </View>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  page: {
     flex: 1,
     backgroundColor: '#fff',
  },
  title: {
    color: 'black',
    fontSize: 36,
    justifyContent: 'top',
    textAlign: 'left',
    marginVertical: '3%',
    marginHorizontal: '4%',
  },
  text: {
     color: 'black',
     fontSize: 14,
     lineHeight: 14,
     textAlign: 'left',
     justifyContent: 'center',
     padding: 10,
     marginHorizontal: '6%',
  },
  topLeftContainer: {
    flex: 1,
  },
  topRightContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bottomLeftContainer: {
    flex: 1,
  },
  bottomRightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: '2%',
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 22,
    color: '#FFFFFF',
    paddingVertical: 12,
  },
  buttons: {
    borderRadius: 100,
    alignItems: 'center',  
    backgroundColor: 'red',
    alignSelf: 'center',
    marginVertical: '2%',
    width: 148,
    marginHorizontal: 10,
  }
});

export default(Session);