import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native';

//size to current window
let w = window.innerWidth;
let h = window.innerHeight;

const InputBox  = ({title}) => {

    const [value, onChangeValue] = useState('');

    return (
       <View style={styles.inputContainer}>
          <Text style = {styles.text}>{title}</Text>
          <TextInput
            placeholder="Enter text"
            onChangeText={onChangeValue}
            value={value}
            style = {styles.input}
          />
       </View>
    )
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 16,
    lineHeight: 24,
    alignItems: 'left',
    textAlign: 'left',
   },
   input: {
     color: 'black',
     fontSize: 16,
     lineHeight: 30,
     alignSelf: 'left',
     width: 295,
     backgroundColor: '#eff7ff',
     padding: 10,
   },
   inputContainer: {
    paddingVertical: '10%'
   }
  });

export default(InputBox);