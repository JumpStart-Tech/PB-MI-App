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

    const [value, onChangeValue] = React.useState('');

    return (
       <View style={styles.page}>
          <Text style = {styles.text}>{title}</Text>
          <View style = {styles.input}>
             <TextInput
                placeholder="Enter text"
                onChangeText={onChangeValue}
                value={value}
             />
          </View>
       </View>
    )
}

const styles = StyleSheet.create({
  container: { // General formatting
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
    lineHeight: 20,
    alignItems: 'left',
    textAlign: 'left',
    padding: 0,
    marginVertical: 0,
    marginHorizontal: w/25,
   },
   
   input: {
     color: 'black',
     fontSize: 16,
     lineHeight: 30,
     alignSelf: 'left',
     width: w/4,
     borderWidth: 0,
     marginHorizontal: w/25,
     marginVertical: 15,
     backgroundColor: '#eff7ff',
     padding: 10,
   }
  });

export default(InputBox);