import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native';
//import posts from "../model/post";

import {signUp} from "../viewModels/auth"


const ViewModel = () => {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [passC, setPassC] = React.useState('');
  const [passwordError, setPasswordError] = useState('False');

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePassChange = (text) => {
    setPass(text);
    //handlePasswordCheck(pass, passC);
  };

  const handlePassCChange = (text) => {
    setPassC(text);
    //handlePasswordCheck(pass, passC);
  };

  
  //TODO: not working
  const handlePasswordCheck = (pass, passC) => {
    <Text>Pass is {pass} and passC is {passC}</Text>
    if (pass !== passC) {
      setPasswordError('true');
    } 
  };

  function handleSubmit() {
     signUp(email, pass);

     // Reset form values
     setName('');
     setEmail('');
     setPass('');
     setPassC('');
    
   }
  

  return {
    name,
    email,
    pass, //todo: remove this
    passC,
    passwordError,
    handleNameChange,
    handleEmailChange,
    handlePassChange,
    handlePassCChange,
    handleSubmit,
  };
};

export default ViewModel;