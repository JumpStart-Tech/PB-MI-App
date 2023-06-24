import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from "react-native";

import Header from "./components/Header";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";
import DropDown from "./components/DropDown";

//size to current window
let w = window.innerWidth;
let h = window.innerHeight;


const Learner = ({next}) =>{
    return (
      <View>
        <View styles = {styles.topContainer}>
              <Header></Header>
              <Text style = {styles.title}>Learner</Text>
        </View>
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <InputBox title = {"Participant ID"}></InputBox>
                <InputBox title = {"Session Name"}></InputBox>
                <InputBox title = {"Behavior Analysis Name"}></InputBox>
                <InputBox title = {"HRE Time"}></InputBox>
            </View>
            <View style = {styles.rightContainer}>
                <View>
                  <DropDown title = {""} />
                </View>

                <View>
                  <RoundButton 
                  buttonText="Next"
                  buttonWidth="1"
                  onClick = {next}
                  >
                  </RoundButton>
                </View>
          </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: { // General formatting
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  topContainer: {
    flex: 1,
    width: '100%',
  },
  leftContainer: {
    width: w/3,
    justifyContent: 'top',
    marginHorizontal: w/25,
  },
  rightContainer: {
    justifyContent: 'top',
  },
  title: {
    color: 'black',
    fontSize: 36,
    textAlign: 'left',
    marginVertical: h/9,
    marginHorizontal: w/25,
   },
  });

export default(Learner);

