import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState } from "react";
import RoundButton from "./components/RoundButton";
import InputLine from "./components/InputLine";

//import view model to take data and interface server
import { useControls } from '../viewModels/forgotPasswordLogic';

// Screen accessed after clicking 'Forgot password?' on the Onboarding screen
const ForgotPassword = ({navigation}) => {
    // state variable to track changes in email input
    const [email, setEmail] = React.useState('');

    // pull in data from forgotPasswordLogic for use here
    const {emailError, click} = useControls(navigation);

    // todo: must verify email before allowing password to be changed 

    return(
        <SafeAreaView style={styles.page}>
             <View style={styles.body}>
                <View style={styles.dialogue}>
                    <Text style={styles.titleText}>Forgot Password</Text>
                    <InputLine 
                        style={{color: '#04A69D', borderBottomColor: 'black'}} 
                        viewStyle={{marginVertical: 80, width: 400}}
                        placeholder='Email *'
                        errorMessage={emailError}
                        setValue={setEmail}
                        keyboardType='email-address'
                        value={email}>
                    </InputLine>
                    <RoundButton onClick = {() => click(email, setEmail)} buttonText='Continue' buttonWidth='2'></RoundButton>
                    <Text style = {{marginVertical: '3%'}}>Don't have an account?
                        <TouchableOpacity onPress = {() => navigation.navigate('Registration')}><Text style={styles.signUpText}> Sign up</Text></TouchableOpacity>
                    </Text>
                </View>
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
        height: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    titleText: { // forgot password title
        marginTop: '15%',
        marginBottom: '15%',
        fontSize: 35,
        lineHeight: 30,
    },
    dialogue: { // holds input line
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '48%',
    },
    signUpText: { // sign up button text formatting
        color: '#04A69D',
        fontWeight: 'bold',
    }
})

export default ForgotPassword;