import { StyleSheet, View, Image, Text } from "react-native";
import HeaderButton from "./HeaderButton";


function HeaderButtons(){
    return (
        <View style={styles.headerButtonContainer}>
            <HeaderButton buttonText={'Home'}></HeaderButton>
            <HeaderButton buttonText={'History'}></HeaderButton>
            <HeaderButton buttonText={"Profile"}></HeaderButton>
            <HeaderButton buttonText={"Logout"}></HeaderButton>
        </View>
    )
}

export default function Header(){

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderButtons></HeaderButtons>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        marginRight: 13,
    },
    header: {
        height: 48,
        flexDirection: 'row',
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
        //flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
     },
})