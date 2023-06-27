import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native';
//import posts from "../model/post";

import {signIn} from "../viewModels/auth"

const ViewModel = () => {

  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePassChange = (text) => {
    setPass(text);
  };

  function handleSubmit() {
    signIn(email, pass);

    // Reset form values
    setEmail('');
    setPass('');
  };

  return {
    email,
    pass,
    handleEmailChange,
    handlePassChange,
    handleSubmit,
  };
};

export default ViewModel;