import { StyleSheet, View, Image, Text } from "react-native";
import Header from "./components/Header";
import RoundButton from "./components/RoundButton";

export default function NewLearner(){

    return (
        <View style={styles.page}>
            <Header></Header>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    }
});