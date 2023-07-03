import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

//import for navigation 
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

//include all views
import Onboarding from './views/Onboarding';
import Registration from './views/Registration';
import ExistingLearner from './views/ExistingLearner';
import Learner from './views/Learner';
import NewLearner from './views/NewLearner';
import ForgotPassword from './views/ForgotPassword';
import Home from './views/Home';
import Profile from './views/Profile';
import History from './views/History';

import { UserContext } from './viewModels/userContext';

const App = () =>  {
  const [user, setUser] = useState('jerry');

  return (
    <UserContext.Provider value={{user, setUser}}>
      <NavigationContainer linking={{ enabled: true }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="ExistingLearner" component={ExistingLearner} />
          <Stack.Screen name="Learner" component={Learner} />
          <Stack.Screen name="NewLearner" component={NewLearner} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="History" component={History} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
