import { StyleSheet, View, Image, Text, TouchableOpacity, Platform } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

//TODO: I can't for the life of me figure out how to make the logout button have a rounded border
function HeaderButtons({navigation, userId}){

    return (
        <View style={styles.headerButtonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Home', {userId})}>
                <Text style = {styles.text}> Home </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('History', {userId})}>
                <Text style = {styles.text}> History </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile', {userId})}>
                <Text style = {styles.text}> Profile </Text>
            </TouchableOpacity>
            <View style = {styles.border}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Onboarding')}>
                  <Text style={styles.text}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function Header({navigation, userId}){
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style = {styles.logo}>
                  <Image style={styles.image} source={require('./temporary.png')}  />
                </View>
                <HeaderButtons userId = {userId} navigation={navigation} style = {{flex: 0.5, flexDirection: 'row',}}></HeaderButtons>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerButtonContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 13,
        padding: 5,
    },
    text: {
        color: 'black',
        fontSize: 16,
        lineHeight: 18.75,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 26,
        paddingRight: 26,
        borderRadius: 5,
    },
    header: {
        flex: 1,
        display: 'flex',
        height: 48,
        flexDirection: 'row',
    },
    logo: {
        flex: 0.5,
        flexDirection: 'row',
    },
    image: {
        height: 43,
        width: undefined,
        aspectRatio: 512 / 297,
        marginTop: 5,
        marginLeft: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {
        borderWidth: 1,
        borderRadius: 9,
        borderColor: 'white',
        backgroundColor: '#FFF',
        overflow: 'hidden'
    },
    border: {
        borderWidth: 1.5,
        borderColor: 'transparent',
        borderRadius: 11,
        overflow: 'hidden',
        backgroundImage: 'linear-gradient(to right, #36D1DC, #5B86E5)',
        padding: 2,
    },
 
})