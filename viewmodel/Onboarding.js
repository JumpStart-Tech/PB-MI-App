import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native';
//import posts from "../
//import posts from "../model/post";

const ViewModel = () => {

  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePassChange = (text) => {
    setPass(text);
  };

  const handleSubmit = () => {
    // Handle form submission with email and pass data
    // Must check if matches with server data
    console.log('Email:', email);
    console.log('Pass:', pass);

    // Reset form values
    setEmail('');
    setPass('');
  };

  return {
    name,
    email,
    handleEmailChange,
    handlePassChange,
    handleSubmit,
  };
};

export default ViewModel;