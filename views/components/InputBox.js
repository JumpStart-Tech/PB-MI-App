import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native';


const InputBox  = ({title, style, value, setValue}) => {

    return (
       <View style={style}>
          <Text style = {styles.text}>{title}</Text>
          <View style = {styles.input}>
             <TextInput
                placeholder="Enter text"
                onChangeText={setValue}
                value={value}
                style={styles.textInput}
             />
          </View>
       </View>
    )
}

const styles = StyleSheet.create({
  text: {
     color: 'black',
     fontSize: 16,
     lineHeight: 24,
     textAlign: 'left',
   },
  input: {
     color: 'black',
     fontSize: 16,
     lineHeight: 30,
     alignSelf: 'left',
     width: 295,
     backgroundColor: '#eff7ff',
   },
  textInput: {
    padding: 10,
  },
  });

export default(InputBox);