import { StyleSheet, View, Image, Text } from "react-native";
import Header from "./components/Header";
import RoundButton from "./components/RoundButton";

export default function Home({navigation, route}){
    // take id from previous screen
    const userId = route.params?.userId || '0000';
    console.log('id from param:' + userId);

    // todo: get name from userid
    let name = "Therapist " + userId;

    return (
        <View style={styles.page}>
            <View>
              <Header userId = {userId} navigation = {navigation}></Header>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyItemsContainer}>
                    <Image style={styles.image} source={require('./components/temporary.png')} resizeMode="center" />
                    <Text style={styles.welcomeText}>Welcome Back, {name}</Text>
                    <View>
                        <RoundButton buttonText="Start" buttonWidth="1.5" onClick = {() => navigation.navigate('ExistingLearner', {userId})}></RoundButton>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
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