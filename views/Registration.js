import { StatusBar } from 'expo-status-bar';

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';

//import background image
import bg from '../blue-bg.png';
//import standard teal button component
import RoundButton from "./components/RoundButton";
//import view model to take data and interface server
import {signUp} from "../viewModels/auth"

// size to current window
let w = window.innerWidth;
let h = window.innerHeight;

const Registration = ({navigation}) => {
  //const currPass = '';
  //const currPassC = 'x';
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [passC, setPassC] = React.useState('');
  const [validPass, setValidPass] = React.useState('false');
  const [disabled, setDisabled] = React.useState('false');

  /*
  const isValid = () => {
    if (currPass === currPassC) {
      setValidPass('true');
      setDisabled('false');
    } else {
      setDisabled('true');
    }
  }
  */

  //TODO: need to check passwords are the same
  const checkPassword = (passC) => {
    setPassC(passC);
    //isValid();
  }

  /*
  const handlePress = () => {
    if (isValid) {
      Alert.alert('valid');
    } else {
        alert('invalid');
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
                  onClick ={() => navigation.goBack()}
                  >
                </RoundButton>
              </View>  
              <Text style={styles.title}>Create Account</Text> 
              <TextInput style={styles.input}
                  placeholder="Name *"
                  onChangeText={setName}
                  value = {name}
               /> 
              <TextInput style={styles.input}
                  placeholder="Email *"
                  onChangeText={setEmail}
                  keyboardType = 'email-address'
                  value = {email}
               />
               <TextInput style={styles.input}
                  placeholder="Password *"
                  secureTextEntry={true}
                  onChangeText={setPass}
                  value = {pass}
                  currPass = {pass}
               />
               <TextInput style={[styles.input, {marginBottom: 10}]}
                  placeholder="Confirm Password *"
                  secureTextEntry={true}
                  onChangeText={checkPassword}
                  value={passC}
                  currPassC = {passC}
               />
               <View style={styles.endButton}>
                 <RoundButton
                    buttonText="Sign Up"
                    buttonWidth="2"
                    disabled={disabled}
                    onClick = {signUp(email,pass), () => navigation.navigate('NewLearner')}
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
    marginVertical: '10%',
  },
  image: { //Background image formatting
    flex: 1,
    height: h,
  },
  input: { // Take email and password formatting
    color: 'white',
    fontSize: 16,
    lineHeight: 20,
    alignSelf: 'center',
    width: '60%',
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