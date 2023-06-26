import { StyleSheet, View, Image, Text, ScrollView, FlatList, Pressable, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";
import { signUp } from "../viewModels/auth";

export default function ForgotPassword(){

    useEffect(()=>{
        signUp('teSTEMAIL2@GMAIL.COM', 'password')
    },[])

    return(
        <SafeAreaView style={styles.page}>
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
        alignItems: 'center',
        justifyContent: 'center',
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