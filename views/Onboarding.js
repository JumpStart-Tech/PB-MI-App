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
  Pressable
} from 'react-native';

//import background image
import bg from '../blue-bg.png';
//import standard teal button component
import RoundButton from "./components/RoundButton";
//import view model to take data and interface server
import ViewModel from "../viewmodel/Onboarding";

//size to current window
let w = window.innerWidth;
let h = window.innerHeight;

const Onboarding = ({signUp, logIn}) => {
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const viewModel = ViewModel();

  return (  
    <div className="App">
      <View style={styles.container}>
        <ImageBackground source={bg} resizeMode="cover" style={styles.image} className="App-bg" alt="bg">
          <Text style={styles.title}>PB.MI</Text>
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
           <View style={styles.link}>
             <Forgot />
           </View>
           <Text style={styles.link}></Text>
           <View style = {styles.buttons}>
              <RoundButton 
                buttonText="Log In"
                buttonWidth="2"
                onClick = {viewModel.handleSubmit, logIn}
                >
              </RoundButton>
           </View>
           <View style = {styles.buttons}>
              <RoundButton 
                buttonText="Sign Up"
                buttonWidth="2"
                onClick = {signUp}
                >
              </RoundButton>
          </View>
        </ImageBackground>
      </View>     
    </div>
  );
}

function Forgot() { // Forgot password button
  function handleClick() {
    //TODO: go to forgot password screen
    alert('You clicked me!');
  }
  return (
    <TouchableOpacity onPress={handleClick}>
      <Text style = {{color: 'white', fontSize: 14}}> Forgot password? </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { // General formatting
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'center',
  },
  title: { // PB.MI title format
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 300,
    //arithmetic ensures that text is centered in the dark blue portion
    marginHorizontal: (w*407/844 - 300)/2,
    marginVertical: h/7,
  },
  image: { //Background image formatting
    width: w,
    height: h,
    alignItems: 'right',
    justifyContent: 'center',
    resizeMode: 'cover',
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
  buttons: { // Log in and sign up button formatting
    justifyContent: 'left',
    alignItems: 'left',
    width: 250,
    marginHorizontal:(w*407/844 - 250)/2,
  },
  link: { // Forgot password link formatting
    lineHeight: 12,
    textAlign: 'right',
    justifyContent: 'right',
    alignItems: 'right',
    width: 200,
    marginHorizontal: (w*407/844 - 250 + 200)/2,
    marginVertical: 20,
  },
});

export default(Onboarding);