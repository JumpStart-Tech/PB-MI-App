import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './views/Home';
import NewLearner from './views/NewLearner';

export default function App() {
  return (
      <>
        <NewLearner></NewLearner>
        <StatusBar style="auto" />
      </>
    );
  // return (
  //   <>
  //     <Home name="Jack"></Home>
  //     <StatusBar style="auto" />
  //   </>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
});
