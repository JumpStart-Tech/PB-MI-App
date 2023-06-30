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
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [passC, setPassC] = React.useState('');
  const [validPass, setValidPass] = React.useState('false');
  const [disabled, setDisabled] = React.useState('false');

  return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={bg} resizeMode="cover" style={styles.image} className="App-bg" alt="bg">
           <View style = {styles.insideBlue}> 
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
                  onChangeText={setPassC}
                  value={passC}
                  currPassC = {passC}
               />
               <View style={styles.endButton}>
                 <RoundButton
                    buttonText="Sign Up"
                    buttonWidth="2"
                    disabled={disabled}
                    onClick = {() => {
                      signUp(email,pass)
                        .then(res => {
                          console.log(JSON.stringify(res));
                          let status = res.status;
                          if(status != 'Error'){
                            setName('')
                            setEmail('')
                            setPass('')
                            setPassC('')
                            navigation.navigate('NewLearner');
                          }
                          else{
                            console.log('Navigation blocked')
                          }
                        })
                      }}
                    >
                   </RoundButton>
               </View>
           </View>
        </ImageBackground>
      </SafeAreaView>  
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
    marginTop: '20%',
    marginBottom: '10%'
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
    marginTop: '8%',
  },
});

export default Registration;