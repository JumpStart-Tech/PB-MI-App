import {
    StyleSheet,
    TextInput,
  } from 'react-native';

export default function InputLine({style, placeholder, secureTextEntry=false, value, setValue, keyboardType='default'}){

    return(
        <TextInput style={{...styles.input, style}}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            onChangeText={setValue}
            value={value}
        />)
}

const styles = StyleSheet.create({
    input: { // Take email and password formatting
        flex: 1,
        width: '100%',
        color: 'white',
        fontSize: 16,
        lineHeight: 20,
        borderWidth: 0,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginVertical: 10,
        padding: 10,
      },
})