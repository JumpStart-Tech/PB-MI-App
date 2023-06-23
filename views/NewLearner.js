import { StyleSheet, View, Image, Text, ScrollView, SectionList } from "react-native";
import { useState } from "react";
import Header from "./components/Header";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";

export default function NewLearner(){

    return (
        <View style={styles.page}>
            <Header></Header>
            <ScrollView style={styles.body}>
                <View style={styles.topHalfContainer}>
                    <Text style={styles.titleText}>Learner</Text>
                    <View style={styles.topFourInputsContainer}>
                        <View style={styles.leftTwoInputsContainer}>
                            <InputBox title={'Participant Id'}></InputBox>
                            <InputBox title={'Behavior Analysis Name'}></InputBox>
                        </View>
                        <View style={styles.rightTwoInputsContainer}>
                            <InputBox title={'Session Name'}></InputBox>
                            <InputBox title={'HRE Time'}></InputBox>
                        </View>
                    </View>
                </View>
                <View>
                    <TableRow chosenKey="V" behavior="yells"></TableRow>
                </View>
            </ScrollView>
        </View>
    )
}

function KeyBehavior(){
    [inputs, setInputs] = useState({})


}

function TableRow({chosenKey, behavior}){

    return (
        <View style={styles.tableRow}>
            <View style={styles.keySide}>
                <Text style={styles.rowText}>{chosenKey}</Text>
            </View>
            <View style={styles.behaviorSide}>
                <Text style={styles.rowText}>{behavior}</Text>
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
    },
    topHalfContainer: {
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 2,
        width: '100%',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 35,
        lineHeight: 30,
        padding: '6%',
    },
    topFourInputsContainer: {
        borderColor: 'blue',
        borderStyle: 'solid',
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    leftTwoInputsContainer: {
        borderColor: 'green',
        borderStyle: 'solid',
        borderWidth: 2,
        paddingHorizontal: '8%',
    },
    rightTwoInputsContainer: {
        borderColor: 'purple',
        borderStyle: 'solid',
        borderWidth: 2,
        paddingHorizontal: '8%',
    },
    tableRow : {
        width: 1000,
        borderColor: 'orange',
        borderStyle: 'solid',
        borderWidth: 2,
        flexDirection: 'row',
    },
    keySide: {
        borderRightColor: 'pink',
        borderRightWidth: 1,
        borderRightStyle: 'solid',
    },
    behaviorSide: {
        flex: 1,
    },
    rowText: {
        padding: 10,
        fontSize: 16,
        lineHeight: 30,
        alignSelf: 'center',
    },
});