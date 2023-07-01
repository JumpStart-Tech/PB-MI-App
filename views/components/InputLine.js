import {
    View,
    StyleSheet,
    TextInput,
    Text
  } from 'react-native';

export default function InputLine({style, viewStyle, placeholder, secureTextEntry=false, value, setValue, keyboardType='default', errorMessage=''}){

    return(
        <View style={viewStyle}>
            <TextInput style={{...styles.input, ...style, 
                    marginBottom: (errorMessage != '') ? 5 : 10,
                    ...((errorMessage != '') ? {borderBottomColor: '#DB0F27', color: '#DB0F27'} : {})
            }}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                onChangeText={setValue}
                value={value}
            />
            <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
        )
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
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
      },
    errorText: {
        // color: '#BA110C',
        color: '#DB0F27',
        marginBottom: 5,
    }
})