import { StyleSheet, View, Image, Text, ScrollView, FlatList, Pressable, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";
import { signIn, signUp } from "../viewModels/auth";

export default function ForgotPassword({goBack}){

    useEffect(()=>{
        signIn('realEMAIL2@GMAIL.COM', 'testpass')
    },[])

    return(
        <SafeAreaView style={styles.page}>
             <View style = {{alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 50, padding: 10}}>
                 <RoundButton 
                    buttonText="Go Back"
                    buttonWidth="1"
                    onClick = {goBack}
                    >
                  </RoundButton>
              </View>  
            <View style={styles.dialogue}>
                <Text style={styles.titleText}>Forgot Password</Text>
                <InputBox title='Email*'></InputBox>
                <RoundButton buttonText='Continue' buttonWidth='1.8'></RoundButton>
                <Text>Don't have an account?
                    <Pressable><Text style={styles.signUpText}> Sign up</Text></Pressable>
                </Text>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
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