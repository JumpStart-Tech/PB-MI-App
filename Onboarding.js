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

/*
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Routes, useNavigate} from 'react-router-dom';
*/

//<Route path="./Registration" component={Registration} /> 
import bg from './blue-bg.png';

//size to current window
let w = window.innerWidth;
let h = window.innerHeight;

const Onboarding = ({ navigation }) => {
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const [email, onChangeEmail] = React.useState('');
  const [pass, onChangePass] = React.useState('');

  const handleButtonPress = () => {
    navigation.navigate('Registration');
  };
  return (  
    <div className="App">
      <View style={styles.container}>
        <ImageBackground source={bg} resizeMode="cover" style={styles.image} className="App-bg" alt="bg">
          <Text style={styles.title}>PB.MI</Text>
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
           <View style={styles.link}>
             <Forgot />
           </View>
          <View style={styles.buttons}>
            <LogIn />
            <Button style = {styles.buttons}
              title="Sign up"
              color="#00a69c"
              onPress={handleButtonPress}
            />
           </View>
        </ImageBackground>
      </View>     
    </div>

  );
}

function LogIn() {
  function handleClick() {
    alert('You clicked me!');
    isLoggedIn = true; // is this working?
    //TODO: go to home screen if valid credentials
  }
  return (
    <Button
      title="Log In"
      color="#00a69c"
      onPress={handleClick}
    />
  );
}

/*
function SignUp() {
  function handleClick() {
    navigation.navigate('Registration');
    //window.location.href = "/Registration";
  }
  return (
    //<a href = {"Registration"}>
    <Button
      title="Sign Up"
      color="#00a69c"
      onPress={handleClick}
    />
    //</a>
  );
}
*/

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
    flex: 1,
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 300,
    //arithmetic ensures that text is centered in the dark blue portion
    marginHorizontal: (w*407/844 - 300)/2,
    marginVertical: h/5,
    //backgroundColor: '#000000c0',
  },
  image: { //Background image formatting
    flex: 1,
    width: w,
    //height: h,
    alignItems: 'right',
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  input: { // Take email and password formatting
    flex: 1,
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
    flex: 1,
    color: 'white',
    fontSize: 16,
    lineHeight: 20,
    justifyContent: 'left',
    alignItems: 'left',
    width: 250,
    height: 100,
    marginHorizontal:(w*407/844 - 250)/2, 
    marginVertical: h/9,
    borderWidth: 0,
    borderRadius: 10
  },
  link: { // Forgot password link formatting
    lineHeight: 12,
    textAlign: 'right',
    justifyContent: 'right',
    alignItems: 'right',
    width: 200,
    marginHorizontal: (w*407/844 - 300 + 200)/2,
    marginVertical: 20,
  },
});

export default(Onboarding);