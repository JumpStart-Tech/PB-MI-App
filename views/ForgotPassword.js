import { StyleSheet, View, Image, Text, ScrollView, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";
import { signIn, signUp } from "../viewModels/auth";

export default function ForgotPassword({navigation}){

    useEffect(()=>{
        signIn('realEMAIL2@GMAIL.COM', 'testpass')
    },[])

    return(
        <SafeAreaView style={styles.page}>
             <View style = {{alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 50, padding: 10}}>
                 <RoundButton 
                    buttonText="Go Back"
                    buttonWidth="1"
                    onClick = {() => navigation.goBack()}
                    >
                  </RoundButton>
              </View>  
            <View style={styles.dialogue}>
                <Text style={styles.titleText}>Forgot Password</Text>
                <InputBox title='Email*'></InputBox>
                <RoundButton onClick = {() => navigation.navigate('Onboarding')} buttonText='Continue' buttonWidth='1.8'></RoundButton>
                <Text>Don't have an account?
                    <TouchableOpacity onPress = {() => navigation.navigate('Registration')}><Text style={styles.signUpText}> Sign up</Text></TouchableOpacity>
                </Text>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleText: {
        fontSize: 35,
        lineHeight: 30,
    },
    dialogue: {
        height: 400,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    signUpText: {
        color: '#04A69D',
        fontWeight: 'bold',
    }
})