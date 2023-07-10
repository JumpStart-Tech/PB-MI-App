import { StyleSheet, View, Image, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import RoundButton from "./components/RoundButton";
import InputLine from "./components/InputLine";

//import view model to take data and interface server
import { newPassControls} from '../viewModels/newPasswordLogic';

// Screen accessed after inputting a valid account email in the Forgot Password screen
const NewPassword = ({navigation, route}) => {
    // use state to track changes in input
    const [pass, setPass] = React.useState('');
    const [passC, setPassC] = React.useState('');

    // store values from newPasswordLogic
    const {passwordError, confirmPasswordError, click} = newPassControls(navigation);

    // take query param for email from previous screen
    const email = route.params?.userEmail || "0000";

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
    body: { // centered inner container
        height: '70%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    titleText: { // forgot password title
        marginTop: '15%',
        marginBottom: '15%',
        fontSize: 35,
        lineHeight: 30,
    },
    dialogue: { // holds input lines
        justifyContent: 'center',
        alignItems: 'center',
        width: '48%',
    },
    signUpText: { // sign up button text formatting
        color: '#04A69D',
        fontWeight: 'bold',
    },
    bottom: { // ensures continue button is aligned near the bottom of the screen
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: '10%',
    },
});

export default NewPassword;