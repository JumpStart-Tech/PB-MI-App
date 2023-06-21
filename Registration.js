import { StatusBar } from 'expo-status-bar';

import React from 'react';
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

import {Link } from "react-router-dom";
import bg from './blue-bg.png';

// size to current window
let w = window.innerWidth;
let h = window.innerHeight;

function Registration() {
  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [pass, onChangePass] = React.useState('');
  const [passC, onChangePassC] = React.useState('');
  return (
      <View style={styles.container}>
        <ImageBackground source={bg} resizeMode="cover" style={styles.image} className="App-bg" alt="bg">
          <Text style={styles.title}>Create Account</Text> 
          <TextInput style={styles.input}
              placeholder="Name *"
              onChangeText={onChangeName}
              value={name}
           /> 
          <TextInput style={styles.input}
              placeholder="Email *"
              onChangeText={onChangeEmail}
              value={email}
           />
           <TextInput style={styles.input}
              placeholder="Password *"
              onChangeText={onChangePass}
              value={pass}
           />
           <TextInput style={styles.input}
              placeholder="Confirm Password *"
              onChangeText={onChangePassC}
              value={passC}
           />
           <View style={styles.buttons}>
             <SignUp />
           </View>
        </ImageBackground>
      </View>  
  );
};

function SignUp() {
  function handleClick() {
    //TODO: move to home screen
    if (pass != passC) {
      <Text style={styles.error}>Passwords don't match</Text>
    } else {
      window.location.href = "/App";
    }
  }
  return (
    <Button
      title="Sign Up"
      color="#00a69c"
      onPress={handleClick}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { // Create account format
    flex: 1,
    color: 'white',
    fontSize: 36,
    lineHeight: 84,
    alignItems: 'center',
    textAlign: 'center',
    width: 300,
    //arithmetic ensures that text is centered in the dark blue portion
    marginHorizontal: (w*407/844 - 300)/2,
    marginVertical: h/4,
    //backgroundColor: '#000000c0',
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
    marginHorizontal: (w*407/844 - 300)/2,
    width: 300,
    borderWidth: 0,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    padding: 10,
  },
  buttons: { // sign up button formatting
    color: 'white',
    fontSize: 16,
    lineHeight: 20,
    justifyContent: 'left',
    alignItems: 'left',
    width: 260,
    height: 100,
    marginHorizontal: (w*407/844 - 250)/2, 
    marginVertical: h/9,
    borderWidth: 0,
    borderRadius: 10
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
  },
});

export default Registration;