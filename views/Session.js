import { StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable, SafeAreaView, Alert } from "react-native";
import { useState, useEffect, memo } from "react";
import Header from "./components/Header";
import EmailComments from "./components/EmailComments";
import SummaryData from "./components/SummaryData";
import RoundButton from "./components/RoundButton";
import SquareButton from "./components/SquareButton";

{/* TODO: must store button presses and history more completely */}
{/* TODO: must pull in keys and values from Learner screen */}

// Session screen that is displayed while session is running
// Use React memo to prevent additional re-renders
const Session = memo(({navigation, route}) => {

  // take id from previous screen
  const userId = route.params?.userId || "0000";
  console.log('id from param:' + userId);
  const learnerId = route.params?.learnerId || "0000";
  console.log('Learner ID from param:' + learnerId);
  const sessionName = route.params?.sessionName || "Session Name";
  console.log('Session name from param:' + sessionName);
  const keys = route.params?.selectedKeys || "No keys";
  console.log('Keys from param:' + keys);

  // tracks colors of buttons depending on whether they are selected
  const [colorEO, setColorEO] = useState('#04A69D80'); // unselected
  const [colorSR, setColorSR] = useState('#04A69D80'); // unselected
  const [colorCalm, setColorCalm] = useState('#04A69D'); // enabled

  // Calm, Screen, EO, and SR timers
  const [calmTimerRunning, setCalmTimerRunning] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [screenTimer, setScreenTimer] = useState(0);
  const [eoTimer, setEoTimer] = useState(0);
  const [srTimer, setSrTimer] = useState(0);
  const [eoTimerRunning, setEoTimerRunning] = useState(false);
  const [srTimerRunning, setSrTimerRunning] = useState(false);
  const [screenTimerRunning, setScreenTimerRunning] = useState(true);

  //tracks times EO button has been pressed
  const [countEO, setCountEO] = useState(0);

  // tracks key input
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [historyLength, setHistoryLength] = useState(0);

  // shuts down all timers and saves data before moving to the summary page
  const endSession = () => {
    setCalmTimerRunning(false);
    setEoTimerRunning(false);
    setSrTimerRunning(false);
    setScreenTimerRunning(false);
    navigation.navigate("Summary", {
      userId: userId,
      learnerId: learnerId,
      screenTimer: screenTimer,
      eoTimer: eoTimer,
      srTimer: srTimer,
    });
  };

  // saves data and then clears it
  const reset = () => {
    {/* TODO: save data */}

    {/* refresh page to set states to their initial values */}
    window.location.reload();
  }

  const handleKeyPress = (digit) => {
    const newInput = input + digit;
    setInput(newInput);

    // Add current input to history
    setHistory((prevHistory) => [...prevHistory, newInput]);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setHistoryLength(historyLength + 1);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setInput(history[newIndex]);
    }
    if (historyLength > 0) {
      setHistoryLength(historyLength - 1);
    }
  };

  
  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setInput(history[newIndex]);
      setHistoryLength(historyLength + 1);
    }
  };

  // change button colors
  const changeColor = (isEO, color, setColor) => {
    //prevent two options from being selected at once
    if (color === '#04A69D80') { // light color
        setColorEO('#04A69D80');
        setColorSR('#04A69D80');
    }
    //toggle color selection
    if (color === '#04A69D80') { // unselected button
        setColor('#048CCC'); // selected button
        if (isEO) {
            setCountEO(countEO + 1);
            setEoTimerRunning(true);
            setSrTimerRunning(false);
        } else {
            setSrTimerRunning(true);
            setEoTimerRunning(false);
        }
        setScreenTimerRunning(true);
    }
  };

  // calm button component 
  const CalmButton = () => {

      const startTimer = () => {
        setCalmTimerRunning(true);
        setCountdown(30); // Set the initial countdown time (in seconds)
      };

      return (
        <View style={{flexDirection: 'row'}}>
          <SquareButton buttonText = {"Calm"} buttonHeight = {"0.8"} onClick = {startTimer} disabled = {calmTimerRunning} color = {colorCalm}></SquareButton>
          {calmTimerRunning && <Text style={[styles.text, {alignSelf: 'center'}]}>{countdown}s</Text>}
          {/* TODO: timer disappears whenever any other buttons are pressed */}
        </View>
      );
  };

  // screen, EO, SR, and calm timers
  useEffect(() => {
    let eoIntervalId;
    let srIntervalId;
    let screenIntervalId;
    let calmIntervalId;

    if (eoTimerRunning) {
      eoIntervalId = setInterval(() => {
        setEoTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } 
    if (srTimerRunning) {
      srIntervalId = setInterval(() => {
        setSrTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } 
    if (calmTimerRunning) {
      setColorCalm('#04A69D80'); // disable calm button
      calmIntervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      if (countdown === 0) {
        clearInterval(calmIntervalId);
        setCalmTimerRunning(false);
        setColorCalm('#04A69D'); // enable calm button
      }
    } 
    if (screenTimerRunning) {
      screenIntervalId = setInterval(() => {
        setScreenTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      clearInterval(eoIntervalId);
      clearInterval(srIntervalId);
      clearInterval(screenIntervalId);
      clearInterval(calmIntervalId);
    };
  }, [eoTimerRunning, srTimerRunning, calmTimerRunning, screenTimerRunning, countdown]);

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
              <Text style = {styles.text}>RIA: {historyLength}</Text>
              <Text style = {styles.text}>RPI: </Text>
              <Text style = {styles.text}>Timer: {screenTimer}s</Text>
              <Text style = {styles.text}>EO Timer: {eoTimer}s</Text>
              <Text style = {styles.text}>SR Timer: {srTimer}s</Text>
              <Text style = {styles.text}>PB Logged: </Text>
              <Text style = {styles.text}>PB During EO: </Text>
              <Text style = {styles.text}>PB During SR: </Text>
            </View>
            <View style = {styles.bottomRightContainer}>
            {/* 9 problem behavior (PB) buttons */}
              <View style = {{flexDirection: 'row'}}>
                <SquareButton buttonText = {"PB 1"} onClick = {() => handleKeyPress('1')}></SquareButton>
                <SquareButton buttonText = {"PB 2"} onClick = {() => handleKeyPress('2')}></SquareButton>
                <SquareButton buttonText = {"PB 3"} onClick = {() => handleKeyPress('3')}></SquareButton>
              </View>
              <View style = {{flexDirection: 'row'}}>
                <SquareButton buttonText = {"PB 4"} onClick = {() => handleKeyPress('4')}></SquareButton>
                <SquareButton buttonText = {"PB 5"} onClick = {() => handleKeyPress('5')}></SquareButton>
                <SquareButton buttonText = {"PB 6"} onClick = {() => handleKeyPress('6')}></SquareButton>
              </View>
              <View style = {{flexDirection: 'row', marginBottom: 10}}>
                <SquareButton buttonText = {"PB 7"} onClick = {() => handleKeyPress('7')}></SquareButton>
                <SquareButton buttonText = {"PB 8"} onClick = {() => handleKeyPress('8')}></SquareButton>
                <SquareButton buttonText = {"PB 9"} onClick = {() => handleKeyPress('9')}></SquareButton>
              </View>
              <View style = {{flexDirection: 'row'}}>
                <RoundButton buttonWidth = {"0.85"} buttonText = {"Undo"} onClick = {handleUndo}></RoundButton>
                <RoundButton buttonWidth = {"0.85"} buttonText = {"Redo"} onClick = {handleRedo}></RoundButton>
              </View>
            </View>
        </View>
          <View style = {styles.bottomContainer}>
            <Pressable style = {styles.buttons}
              onPress = {reset}>
              <Text style = {styles.buttonText}>Reset</Text>
            </Pressable>
            <Pressable style = {styles.buttons}
              /* TODO: must end all timers and store data when clicking end session */
              onPress = {endSession}>
              <Text style = {styles.buttonText}>End Session</Text>
            </Pressable>
            </View>
      </View>
    </SafeAreaView>
  )
});


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