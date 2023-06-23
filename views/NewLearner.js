import { StyleSheet, View, Image, Text } from "react-native";
import Header from "./components/Header";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";

export default function NewLearner(){

    return (
        <View style={styles.page}>
            <Header></Header>
            <InputBox title={'Participant Id'}></InputBox>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    }
});