import { StyleSheet, View, Image, Text, ScrollView, FlatList, Pressable, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";

export default function ForgotPassword(){

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
        borderColor: 'red',
        borderWidth: 2,
        borderStyle: 'solid',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 35,
        lineHeight: 30,
    },
    dialogue: {
        borderColor: 'blue',
        borderWidth: 2,
        borderStyle: 'solid',
        height: 400,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    signUpText: {
        color: '#04A69D',
        fontWeight: 'bold',
    }
})