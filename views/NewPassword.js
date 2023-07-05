import { StyleSheet, View, Image, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";
import Header from "./components/Header";
import InputLine from "./components/InputLine";
import { newPassControls} from '../viewModels/newPasswordLogic';

const NewPassword = ({navigation, route}) => {
    const [pass, setPass] = React.useState('');
    const [passC, setPassC] = React.useState('');
    const {passwordError, confirmPasswordError, click} = newPassControls(navigation);

    // take email from previous screen
    const email = route.params?.data || 'No data received.';

    return(
        <SafeAreaView style={styles.page}>
             <View style={styles.body}>
                <View style={styles.dialogue}>
                    <Text style={styles.titleText}>Forgot Password</Text>
                    <InputLine 
                        style={{color: '#04A69D', borderBottomColor: 'black'}} 
                        viewStyle={{width: '60%', marginBottom: 10,}}
                        placeholder='New Password *'
                        errorMessage={passwordError}
                        secureTextEntry={true}
                        setValue={setPass}
                        value={pass}>
                    </InputLine>
                    <InputLine 
                        style={{color: '#04A69D', borderBottomColor: 'black'}} 
                        viewStyle={{width: '60%'}}
                        placeholder='Confirm New Password *'
                        errorMessage={confirmPasswordError}
                        secureTextEntry={true}
                        setValue={setPassC}
                        value={passC}>
                    </InputLine>
                </View>
            </View>
            <View style = {styles.bottom}>
                    <RoundButton onClick = {() =>  click(email, pass, setPass, passC, setPassC)} buttonText='Continue' buttonWidth='2'></RoundButton>
                </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
    },
    body: {
        height: '70%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    titleText: {
        marginTop: '15%',
        marginBottom: '15%',
        fontSize: 35,
        lineHeight: 30,
    },
    dialogue: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '48%',
    },
    signUpText: {
        color: '#04A69D',
        fontWeight: 'bold',
    },
    bottom: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: '10%',
    },
})

export default NewPassword;