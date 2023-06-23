import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native';


const InputBox  = ({title}) => {

    const [value, onChangeValue] = React.useState('');

    return (
       <View>
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
     marginVertical: 15,
     backgroundColor: '#eff7ff',
     padding: 10,
   },
  });

export default(InputBox);