import { StyleSheet, View, Image, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";
import Header from "./components/Header";
import InputLine from "./components/InputLine";

import { useControls } from '../viewModels/forgotPasswordLogic';

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = React.useState('');
    const {emailError, click} = useControls(navigation);

    return(
        <SafeAreaView style={styles.page}>
             <View style={styles.body}>
                <View style={styles.dialogue}>
                    <Text style={styles.titleText}>Forgot Password</Text>
                    <InputLine 
                        style={{color: '#04A69D', borderBottomColor: 'black'}} 
                        viewStyle={{marginVertical: 80, width: 400}}
                        placeholder='Email*'
                        errorMessage={emailError}
                        setValue={setEmail}
                        keyboardType='email-address'
                        value={email}>
                    </InputLine>
                    <RoundButton onClick = {() => click(email)} buttonText='Continue' buttonWidth='2'></RoundButton>
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
    body: {
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        marginTop: '10%',
        marginBottom: '5%',
        fontSize: 35,
        lineHeight: 30,
    },
    dialogue: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '48%',
    },
    signUpText: {
        color: '#04A69D',
        fontWeight: 'bold',
    }
})

export default ForgotPassword;