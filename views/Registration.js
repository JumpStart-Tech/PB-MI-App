import { StatusBar } from 'expo-status-bar';
import { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ImageBackground,
} from 'react-native';

//import background image
import bg from '../blue-bg.png';
//import standard teal button component
import RoundButton from "./components/RoundButton";
//import input line component
import InputLine from './components/InputLine';

//import view model to take data and interface server
import { useSignUpControls } from "../viewModels/registrationLogic"

// Screen accessed from clicking 'Sign up' on the Onboarding or Forgot Password screen
const Registration = ({ navigation, route }) => {
  // store data in a state to track changes in input
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [passC, setPassC] = React.useState('');

  // pull in items from registrationLogic so they may be used here
  const {nameError, emailError, passwordError, confirmPasswordError, signUp} = useSignUpControls(navigation);

  useEffect(() => {
    async function signIn(username, password) {
      try {
        const user = await Auth.signIn(username, password);
        console.log('signed in successfully');
      } catch (error) {
        console.log('error signing in', error);
      }
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.image} className="App-bg" alt="bg">
        <View style={styles.insideBlue}>
          <Text style={styles.title}>Create Account</Text>
          {/* All input fields */}
          <InputLine viewStyle={{width: '50%'}}
            placeholder="Name *"
            errorMessage={nameError}
            setValue={setName}
            value={name}
          >
          </InputLine>
          <InputLine viewStyle={{width: '50%'}}
            placeholder="Email *"
            errorMessage={emailError}
            setValue={setEmail}
            keyboardType='email-address'
            value={email}
          >
          </InputLine>
          <InputLine viewStyle={{width: '50%'}}
            placeholder="Password *"
            secureTextEntry={true}
            errorMessage={passwordError}
            setValue={setPass}
            value={pass}
          >
          </InputLine>
          <InputLine viewStyle={{width: '50%'}}
            placeholder="Confirm Password *"
            secureTextEntry={true}
            errorMessage={confirmPasswordError}
            setValue={setPassC}
            value={passC}
          >
          </InputLine>
          {/* sign up button */}
          <View style={styles.endButton}>
            <RoundButton
              buttonText="Sign Up"
              buttonWidth="2"
              /* call function in registrationLogic to store data and move to next page */
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
  buttonText: { // text formatting inside button
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