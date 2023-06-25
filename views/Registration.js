import { StatusBar } from 'expo-status-bar';

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';

//import background image
import bg from '../blue-bg.png';
//import standard teal button component
import RoundButton from "./components/RoundButton";
//import view model to take data and interface server
import ViewModel from "../viewmodel/Registration";

// size to current window
let w = window.innerWidth;
let h = window.innerHeight;


const Registration = ({goBack, goFwd}) => {

  const viewModel = ViewModel();

  function checkPass(viewModel) {
                if (viewModel.passwordError == 'true') {
                  <Text style={styles.error}>{"Passwords do not match."}</Text>
                  return null;
                } else {
                  //return ({viewModel.handleSubmit, goFwd});
                }
  }

  return (
      <View style={styles.container}>
        <ImageBackground source={bg} resizeMode="cover" style={styles.image} className="App-bg" alt="bg">
           <View style = {[styles.buttons, {marginVertical: 0, marginHorizontal: 0}]}>
             <RoundButton 
                buttonText="Go Back"
                buttonWidth="1"
                onClick = {goBack}
                >
              </RoundButton>
          </View>  
          <Text style={styles.title}>Create Account</Text> 
          <TextInput style={styles.input}
              placeholder="Name *"
              onChangeText={viewModel.handleNameChange}
              value={viewModel.name}
           /> 
          <TextInput style={styles.input}
              placeholder="Email *"
              onChangeText={viewModel.handleEmailChange}
              value={viewModel.email}
           />
           <TextInput style={styles.input}
              placeholder="Password *"
              secureTextEntry={true}
              onChangeText={viewModel.handlePassChange}
              value={viewModel.pass}
           />
           <TextInput style={styles.input}
              placeholder="Confirm Password *"
              secureTextEntry={true}
              onChangeText={viewModel.handlePassCChange}
              value={viewModel.passC}
           />
           <View style={styles.buttons}>
              <RoundButton 
                buttonText="Sign Up"
                buttonWidth="2"
                onClick = {viewModel.handleSubmit, goFwd}
              </RoundButton>
           </View>
        </ImageBackground>
      </View>  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { // Create account format
    color: 'white',
    fontSize: 36,
    lineHeight: 84,
    alignItems: 'center',
    textAlign: 'center',
    width: 300,
    //arithmetic ensures that text is centered in the dark blue portion
    marginHorizontal: (w*407/844 - 300)/2,
    marginVertical: h/9,
  },
  image: { //Background image formatting
    width: w,
    height: h,
    alignItems: 'right',
    justifyContent: 'center',
  },
  input: { // Take email and password formatting
    color: 'white',
    fontSize: 16,
    lineHeight: 20,
    alignItems: 'center',
    textAlign: 'left',
    marginHorizontal: (w*407/844 - 350)/2,
    width: 350,
    borderWidth: 0,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    padding: 10,
  },
  buttons: { // sign up button formatting
    justifyContent: 'left',
    alignItems: 'left',
    width: 250,
    marginHorizontal:(w*407/844 - 250)/2,
    marginVertical: h/9,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  error: {
    flex: 1,
    color: 'red',
    fontSize: 20,
    lineHeight: 44,
    alignItems: 'center',
    textAlign: 'center',
    width: 300,
    marginHorizontal: (w*407/844 - 300)/2,
    marginVertical: 10,
    marginBottom: 10,
  },
  },
});

export default Registration;