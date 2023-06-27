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
import ViewModel from "../viewModels/Registration";

import {signUp} from "../viewModels/auth"


// size to current window
let w = window.innerWidth;
let h = window.innerHeight;

const Registration = ({goBack, goFwd}) => {

  const viewModel = ViewModel();

  //todo: not working
  /*
  function checkPass(viewModel) {
                if (viewModel.passwordError == 'true') {
                  <Text style={styles.error}>{"Passwords do not match."}</Text>
                  return null;
                } else {
                  //return ({viewModel.handleSubmit, goFwd});
                }
  }
  */

  return (
      <View style={styles.container}>
        <ImageBackground source={bg} resizeMode="cover" style={styles.image} className="App-bg" alt="bg">
           <View style = {styles.insideBlue}>
               <View style = {{alignItems: 'flex-start', alignSelf: 'auto', marginVertical: 0, padding: 10}}>
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
               <TextInput style={[styles.input, {marginBottom: 10}]}
                  placeholder="Confirm Password *"
                  secureTextEntry={true}
                  onChangeText={viewModel.handlePassCChange}
                  value={viewModel.passC}
               />
               <View style={styles.endButton}>
                   <RoundButton
                        buttonText="Sign Up"
                        buttonWidth="2"
                        //onClick = {viewModel.handleSubmit, goFwd}
                        //onClick = {signUp(viewModel.email, viewModel.pass)}
                        onClick = {viewModel.handleSubmit}
                        >
                   </RoundButton>
               </View>
           </View>
        </ImageBackground>
      </View>  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  insideBlue: {
    //portion of background that is blue to center content into:
     width: '48%',
  },
  title: { // Create account format
    color: 'white',
    fontSize: 36,
    lineHeight: 84,
    textAlign: 'center',
    marginVertical: h/9,
  },
  image: { //Background image formatting
    width: w,
    height: h,
  },
  input: { // Take email and password formatting
    color: 'white',
    fontSize: 16,
    lineHeight: 20,
    alignSelf: 'center',
    width: 350,
    borderWidth: 0,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  endButton: { //starts at bottom of page
    flexDirection: 'column-reverse',
    justifyContent: 'flex-start',
    padding: 2,
    marginTop: 50,
  },
  error: {
    flex: 1,
    color: 'red',
    fontSize: 20,
    lineHeight: 44,
    textAlign: 'center',
    marginVertical: 10,
    marginBottom: 10,
  },
});

export default Registration;