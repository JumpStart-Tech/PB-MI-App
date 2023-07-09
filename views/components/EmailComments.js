import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { useState } from "react";

export default function EmailComments() {
    const [comments, setComments] = useState('');
    const [email, setEmail] = useState('');

	return (
        <View>
	        <Text style = {styles.inputText}>Comments</Text>
            <TextInput
               placeholder="Enter text"
               onChangeText={setComments}
               value={comments}
               style={styles.input}
               multiline
               numberOfLines={6}
               textAlignVertical="top"
             />
             <TouchableOpacity style={[styles.buttonSelf]}
               onPress = {() => setComments(comments)}>
               <Text style={styles.buttonText}>Save</Text>
             </TouchableOpacity>

             <Text style = {styles.inputText}>Email</Text>
               <TextInput
                 placeholder="Enter text"
                 onChangeText={setEmail}
                 value={email}
                 multiline
                 numberOfLines={3}
                 textAlignVertical="top"
                 style={styles.input}
               />
             <TouchableOpacity style={[styles.buttonSelf]}
                 onPress = {() => setEmail(email)}>
                 <Text style={styles.buttonText}>Send</Text>
             </TouchableOpacity>
        </View>
	)
}

const styles = StyleSheet.create({
  input: {
     color: 'black',
     fontSize: 16,
     lineHeight: 20,
     width: 400,
     padding: 5,
     backgroundColor: '#eff7ff',  
     marginVertical: 10,
  },
  inputText: {
     color: 'black',
     fontSize: 16,
     lineHeight: 16,
     alignItems: 'left',
     textAlign: 'left',
     padding: 5,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 22,
    color: '#FFFFFF',
    paddingVertical: 12,
  },
  buttonSelf: {
    borderRadius: 100,
    alignItems: 'center',  
    backgroundColor: '#04A69D',
    alignSelf: 'flex-end',
    marginVertical: 5,
    width: '40%',
  },
});
