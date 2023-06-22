import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Onboarding from './views/Onboarding';
import Registration from './views/Registration';


export default function App() {
  const [currentPage, setCurrentPage] = useState('Onboarding');

  const signUp = () => {
    setCurrentPage('Registration');
  };

  const goBack = () => {
    setCurrentPage('Onboarding');
  };

  return (
    <>
      {currentPage === 'Onboarding' && <Onboarding signUp = {signUp} />}
      {currentPage === 'Registration' && <Registration goBack = {goBack} />}
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
