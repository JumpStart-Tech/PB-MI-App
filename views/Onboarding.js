import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

//import background image
import bg from '../blue-bg.png';
//import standard teal button component
import RoundButton from "./components/RoundButton";
//import view model to take data and interface server
import {signIn, signUp} from "../viewModels/registrationLogic"

import InputLine from './components/InputLine';

import { useSignInControls } from '../viewModels/onboardingLogic';


const Onboarding = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const {emailError, passwordError, signInClick} = useSignInControls(navigation);

  return (  
      <SafeAreaView style={styles.container}>
        <ImageBackground source={bg} resizeMode="cover" style={styles.image} className="App-bg" alt="bg">
          <View style = {styles.insideBlue}>
              <Text style={styles.title}>PB.MI</Text>
              <View style = {styles.textBox}>
               <InputLine placeholder={'Email *'}
                keyboardType={'email-address'}
                errorMessage={emailError}
                setValue={setEmail}
                value={email}>
               </InputLine>
               <InputLine placeholder={'Password *'}
                secureTextEntry={true}
                errorMessage={passwordError}
                setValue={setPass}
                value={pass}>
               </InputLine>
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
                    onClick = {() => navigation.navigate('Registration')}
                    >
                  </RoundButton>
                  <RoundButton 
                    buttonText="Log In"
                    buttonWidth="2"
                    onClick = {() => signInClick(email, pass, setEmail, setPass)}
                    >
                  </RoundButton>
               </View>
          </View>
        </ImageBackground>
      </SafeAreaView>     
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
     justifyContent: 'center',
     alignItems: 'center',
  },
  title: { // Create account format
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 84,
    marginVertical: '16%',
  },
  image: { //Background image formatting
    flex: 1,
    height: '100%',
  },
  textBox: {
    flex: 1,
    width: '60%',
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