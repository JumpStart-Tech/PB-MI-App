import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import EmailComments from "./components/EmailComments";
import SummaryData from "./components/SummaryData";
import RoundButton from "./components/RoundButton";
import SquareButton from "./components/SquareButton";

{/* TODO: must pull in data from previous screen */}

// Summary screen that is displayed when session is complete
const Summary = ({navigation, route}) => {

  // take id from previous screen
  const userId = route.params?.userId || "0000";
  console.log('id from param:' + userId);
  const learnerId = route.params?.learnerId || "0000";
  console.log('Learner ID from param:' + learnerId);
  const date = route.params?.lastUsed || "Unknown";
  console.log('Experiment date from param:' + date);

  const screenTime = route.params?.screenTimer || "Unknown";
  const eoTime = route.params?.eoTimer || "Unknown";
  const srTime = route.params?.srTimer || "Unknown";

  // tracks colors of buttons depending on whether they are selected
  const [colorC, setColorC] = useState('#04A69D'); //control
  const [colorT, setColorT] = useState('#04A69D80'); // test

  // change button colors
  const changeColor = (color, setColor) => {
    //prevent two options from being selected at once
    if (color === '#04A69D80') { // light color
        setColorC('#04A69D80');
        setColorT('#04A69D80');
    }
    //toggle color selection
    if (color === '#04A69D80') { // unselected button
        setColor('#04A69D'); // dark color
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Header userId = {userId} navigation = {navigation}></Header>
      </View>
      <View style = {styles.page}>
        <Text style = {styles.title}>Summary</Text>
        {/* Graph goes here */}
        <View style = {{flexDirection: 'row'}}>
            <View style = {styles.leftContainer}>
              <SummaryData userId = {userId} learnerId = {learnerId} screenTimer = {screenTime} eoTimer = {eoTime} srTimer = {srTime}></SummaryData>
            </View>
            <View style = {styles.middleContainer}>
                <View style = {{flexDirection: 'row', marginBottom: '5%',}}>
                    <SquareButton buttonText = {"Control"} color = {colorC} onClick = {() => changeColor(colorC, setColorC)}></SquareButton>
                    <SquareButton buttonText = {"Test"} color = {colorT} onClick = {() => changeColor(colorT, setColorT)}></SquareButton>
                </View>
                {/* TODO: must add email functionality when selecting start SBT */}
                <RoundButton buttonWidth = {"1.5"} buttonText = {"Start SBT"}></RoundButton>
                {/* TODO: when clicking New Session, which screen should it take you to? which data is saved? */}
                <RoundButton buttonWidth = {"1.5"} buttonText = {"New Session"} onClick = {() => navigation.navigate('Session', {userId: userId})}></RoundButton>
            </View>
            <View style = {styles.rightContainer}>
              <View style = {{flex: 1}}>
                 <EmailComments></EmailComments>
             </View>
            </View>
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
     alignItems: 'left',
     textAlign: 'left',
     padding: 10,
  },
  leftContainer: {
    flex: 1,
    marginLeft: '4%',
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: '5%',
    padding: 10,
  },
});

export default(Summary);