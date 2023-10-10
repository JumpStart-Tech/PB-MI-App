import { StyleSheet, View, Text, Button, Pressable, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Auth } from "aws-amplify";

export default function VerifyEmail({navigation, route}){
    const [messageProps, setMessageProps] = useState({message: 'Confirming your email...', seconds: 4});
    const [button, setButton] = useState(null);

    useEffect(() => {
        try{
            const data = route.params.data;
            const code = route.params.code;
            const dataString = atob(data);
            const dataJson = JSON.parse(dataString);
            confirmSignUp(dataJson.userName, code)
                .then((res) => {
                    successRedirect();
                })
                .catch((res) => {
                    setMessageProps((prevMessageProps) => {
                        return {
                            message: 'Email confirmation failed!',
                            seconds: prevMessageProps.seconds,
                            redirectLocation: 'Login'
                        }
                    });
                    setButton(<Pressable onPress={resendEmail} style={styles.button}><Text>Resend Email</Text></Pressable>)
                })
        }
        catch(e){
            invalidRedirect();
        }
    }, [])

    useEffect(() => {
            if (messageProps.seconds <= 0) {
                navigation.navigate(messageProps.redirectLocation);
            }
        }, [messageProps.seconds, navigation]);

    async function confirmSignUp(username, code) {
        return Auth.confirmSignUp(username, code);
    }

    async function resendEmail(username){
        console.log('resend email clicked');
        try{
            const response = await Auth.resendSignUp(username);
            console.log(response);
        }
        catch(e){
            console.log('resend error: ', e);
            resendFailureRedirect();
        }
    }

    function successRedirect() {
        const interval = setInterval(() => {
            setMessageProps((prevMessageProps) => {
                if (prevMessageProps.seconds <= 0) {
                    clearInterval(interval);
                    return prevMessageProps; // return current state to avoid further changes
                }
                return {
                    message: `Email confirmed! Redirecting you in ${prevMessageProps.seconds - 1}`,
                    seconds: prevMessageProps.seconds - 1,
                    redirectLocation: 'Home'
                };
            });
        }, 1000);
    }

    function invalidRedirect() {
        const interval = setInterval(() => {
            setMessageProps((prevMessageProps) => {
                if (prevMessageProps.seconds <= 0) {
                    clearInterval(interval);
                    return prevMessageProps; // return current state to avoid further changes
                }
                return {
                    message: `Invalid url! Check your email or sign in again. Redirecting you in ${prevMessageProps.seconds - 1}`,
                    seconds: prevMessageProps.seconds - 1,
                    redirectLocation: 'Onboarding'
                };
            });
        }, 1000);
    }

    function resendFailureRedirect() {
        const interval = setInterval(() => {
            setMessageProps((prevMessageProps) => {
                if (prevMessageProps.seconds <= 0) {
                    clearInterval(interval);
                    return prevMessageProps; // return current state to avoid further changes
                }
                return {
                    message: `Email resend failed. Redirecting you in ${prevMessageProps.seconds - 1}`,
                    seconds: prevMessageProps.seconds - 1,
                    redirectLocation: 'Onboarding'
                };
            });
        }, 1000);
    }

    return (
        <View>
            <Text>{messageProps.message}</Text>
            {button}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'gray',
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        alignSelf: 'flex-start',
        borderRadius: 3,
        padding: 3,
    },
})