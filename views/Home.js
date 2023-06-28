import { StyleSheet, View, Image, Text } from "react-native";
import Header from "./components/Header";
import RoundButton from "./components/RoundButton";

export default function Home({name}){

    return (
        <View style={styles.page}>
            <Header></Header>
            <View style={styles.body}>
                <View style={styles.bodyItemsContainer}>
                    <Image style={styles.image} source={require('./components/temporary.png')} resizeMode="center" />
                    <Text style={styles.welcomeText}>Welcome Back, {name}</Text>
                    <View>
                        <RoundButton buttonText="Start" buttonWidth="2"></RoundButton>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    bodyItemsContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '70%',
    },
    image: {
        height: 86,
        width: undefined,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        aspectRatio: 512 / 297,
    },
    welcomeText: {
        fontSize: 35,
        fontWeight: 'bold',
        lineHeight: 30,
    }
})