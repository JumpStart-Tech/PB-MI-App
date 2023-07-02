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
import { useSignUpControls } from "../viewModels/registrationLogic"

import InputLine from './components/InputLine';

const Registration = ({ navigation }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [passC, setPassC] = React.useState('');
  const [validPass, setValidPass] = React.useState('false');
  const [disabled, setDisabled] = React.useState('false');
  const {nameError, emailError, passwordError, confirmPasswordError, signUp} = useSignUpControls(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.image} className="App-bg" alt="bg">
        <View style={styles.insideBlue}>
          <Text style={styles.title}>Create Account</Text>
          <InputLine viewStyle={{width: 400}}
            placeholder="Name *"
            errorMessage={nameError}
            setValue={setName}
            value={name}
          >
          </InputLine>
          <InputLine viewStyle={{width: 400}}
            placeholder="Email *"
            errorMessage={emailError}
            setValue={setEmail}
            keyboardType='email-address'
            value={email}
          >
          </InputLine>
          <InputLine viewStyle={{width: 400}}
            placeholder="Password *"
            secureTextEntry={true}
            errorMessage={passwordError}
            setValue={setPass}
            value={pass}
          >
          </InputLine>
          <InputLine viewStyle={{width: 400}}
            placeholder="Confirm Password *"
            secureTextEntry={true}
            errorMessage={confirmPasswordError}
            setValue={setPassC}
            value={passC}
          >
          </InputLine>
          <View style={styles.endButton}>
            <RoundButton
              buttonText="Sign Up"
              buttonWidth="2"
              disabled={disabled}
              onClick={() => signUp(name, email, pass, passC)}
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
    alignItems: 'center',
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
    height: '100%',
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