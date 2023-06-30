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
import {signIn, signUp} from "../viewModels/auth"

//forgotPassword navigation
import {forgot} from "../App.js"

//size to current window
let w = window.innerWidth;
let h = window.innerHeight;

const Onboarding = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');

  return (  
    <div className="App">
      <View style={styles.container}>
        <ImageBackground source={bg} resizeMode="cover" style={styles.image} className="App-bg" alt="bg">
          <View style = {styles.insideBlue}>
              <Text style={styles.title}>PB.MI</Text>
              <View style = {styles.textBox}>
              <TextInput style={styles.input}
                  placeholder="Email *"
                  keyboardType= 'email-address'
                  onChangeText={setEmail}
                  value={email}
               />
               <TextInput style={styles.input}
                  placeholder="Password *"
                  secureTextEntry={true}
                  onChangeText={setPass}
                  value={pass}
               />
               <View style={styles.link}>
                 <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                   <Text style = {{color: 'white', fontSize: 14}}> Forgot password? </Text>
                 </TouchableOpacity>
               </View>
               </View>
               <Text style={styles.link}></Text>
               <View style = {[styles.endButton, {marginBottom: 8}]}>
                  <RoundButton 
                    buttonText="Sign Up"
                    buttonWidth="2"
                    onClick = {signUp(email, pass), () => navigation.navigate('Registration')}
                    >
                  </RoundButton>
                  <RoundButton 
                    buttonText="Log In"
                    buttonWidth="2"
                    onClick = {signIn(email, pass), () => navigation.navigate('Home')}
                    >
                  </RoundButton>
               </View>
          </View>
        </ImageBackground>
      </View>     
    </div>
  );
}

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
    fontSize: 42,
    lineHeight: 84,
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 84,
    textAlign: 'center',
    marginVertical: '16%',
  },
  image: { //Background image formatting
    flex: 1,
    height: h,
  },
  textBox: {
    flex: 1,
    width: '60%',
    alignSelf: 'center',
    //justifyContent: 'center',
  },
  input: { // Take email and password formatting
    flex: 1,
    width: '100%',
    color: 'white',
    fontSize: 16,
    lineHeight: 20,
    alignSelf: 'center',
    borderWidth: 0,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  link: { // Forgot password link formatting
    flex: 1,
    lineHeight: 12,
    textAlign: 'right',
    marginVertical: 10,
  },
  endButton: {
    flexDirection: 'column-reverse',
    justifyContent: 'flex-start',
    padding: 2,
    marginTop: 50,
    marginVertical: 10,
    alignItems: 'center',
  },
});

export default(Onboarding);