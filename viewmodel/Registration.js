import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native';
//import posts from "../model/post";

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
    handlePasswordCheck(pass, passC);
  };

  const handlePassCChange = (text) => {
    setPassC(text);
    handlePasswordCheck(pass, passC);
  };

  const handlePasswordCheck = (pass, passC) => {
    <Text>Pass is {pass} and passC is {passC}</Text>
    if (pass !== passC) {
      setPasswordError('true');
    } 
  };

  const handleSubmit = () => {
    // Handle form submission with name and email data
    // Submit new sign up data to server (checking that another account doesn't already exist')
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Pass:', pass);
      console.log('PassC:', passC);

      // Reset form values
      setName('');
      setEmail('');
      setPass('');
      setPassC('');
    
  };

  return {
    name,
    email,
    passwordError,
    handleNameChange,
    handleEmailChange,
    handlePassChange,
    handlePassCChange,
    handleSubmit,
  };
};

export default ViewModel;