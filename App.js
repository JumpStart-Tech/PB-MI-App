import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

//include all views
import Onboarding from './views/Onboarding';
import Registration from './views/Registration';
import Learner from './views/Learner';
import NewLearner from './views/NewLearner';
import ForgotPassword from './views/ForgotPassword';


export default function App() {
  //set up page navigation:

  //set first page to the onboarding screen
  const [currentPage, setCurrentPage] = useState('Onboarding');

  //clicking the sign up button on Onboarding takes you to Registration
  const signUp = () => {
    setCurrentPage('Registration');
  };

  //clicking the back button on Registration takes you to Onboarding
  const goBack = () => {
    setCurrentPage('Onboarding');
  };

  //clicking the sign up button on Registration takes you to NewLearner
  const register = () => {
    // TODO: must store data so they can log in
    setCurrentPage('NewLearner');
  };

  //clicking the log in button on Onboarding takes you to Learner
  const logIn = () => {
    setCurrentPage('Learner');
  }

  const forgot = () => {
    setCurrentPage('ForgotPassword');
  }
  const session = () => {
    setCurrentPage('Onboarding');
    //todo: change to Session
  }

  return (
    <>
      {currentPage === 'Onboarding' && <Onboarding signUp = {signUp} logIn = {logIn} forgotPass = {forgot} />}
      {currentPage === 'Registration' && <Registration goBack = {goBack} goFwd = {register} />}
      {currentPage === 'Learner' && <Learner next = {session}/>}
      {currentPage === 'NewLearner' && <NewLearner next = {session}/>}
      {currentPage === 'ForgotPassword' && <ForgotPassword goBack = {goBack} signUp = {signUp} />}
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