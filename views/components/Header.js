import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

function HeaderButtons(){
    return (
        <View style={styles.headerButtonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
                <Text style = {styles.text}> Home </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
                <Text style = {styles.text}> History </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
                <Text style = {styles.text}> Profile </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{borderWidth: 2, borderColor: 'blue', borderRadius: 5,}} onPress={() => navigation.navigate('Onboarding')}>
                <Text style = {styles.text}> Logout </Text>
            </TouchableOpacity>
        </View>
    )
}

export default function Header(){

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={require('./temporary.png')}  />
                <HeaderButtons style = {{justifyContent: 'flex-end'}}></HeaderButtons>
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
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    image: {
        height: 43,
        width: undefined,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        aspectRatio: 512 / 297,
        marginTop: 5,
        marginLeft: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
     },
})