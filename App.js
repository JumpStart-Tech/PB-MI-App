import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

//import for navigation 
import { NavigationContainer, useRoute} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator(); // navigation stack holding history of screens visited

//include all views
import Onboarding from './views/Onboarding';
import Registration from './views/Registration';
import ExistingLearner from './views/ExistingLearner';
import Learner from './views/Learner';
import NewLearner from './views/NewLearner';
import ForgotPassword from './views/ForgotPassword';
import NewPassword from './views/NewPassword';
import Home from './views/Home';
import Profile from './views/Profile';
import History from './views/History';
import HistoryDetail from './views/HistoryDetail';
import Session from"./views/Session";
import Summary from './views/Summary';

//simply outlines all possible pages so that we can navigate to them. The app will start on the Onboarding page
const App = () =>  {

  return (
    // set linking equal true to enable back and forward buttons and updated URL for each page
    <NavigationContainer linking={{ enabled: true }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false //don't need a page title on screens and will use custom header
        }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="ExistingLearner" component={ExistingLearner} />
        <Stack.Screen name="Learner" component={Learner} />
        <Stack.Screen name="NewLearner" component={NewLearner} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="HistoryDetail" component={HistoryDetail} />
        <Stack.Screen name="Session" component={Session} />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
