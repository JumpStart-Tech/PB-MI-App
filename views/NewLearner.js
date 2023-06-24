import { StyleSheet, View, Image, Text, ScrollView, FlatList, Pressable, SafeAreaView } from "react-native";
import { useState } from "react";
import Header from "./components/Header";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";

export default function NewLearner(){
    const [id, setId] = useState('');
    const [analysisName, setAnalysisName] = useState('')
    const [sessionName, setSessionName] = useState('')
    const [hreTime, setHreTime] = useState('')
    const [key, setKey] = useState('')
    const [behavior, setBehavior] = useState('')

    function buttonPress(){
        console.log('key:' + key)
    }

    return (
        <SafeAreaView style={styles.page}>
            <Header></Header>
            <ScrollView style={styles.body}>
                <View style={styles.topHalfContainer}>
                    <Text style={styles.titleText}>Learner</Text>
                    <View style={styles.topFourInputsContainer}>
                        <View style={styles.leftTwoInputsContainer}>
                            <InputBox title={'Participant Id'} style={styles.topHalfInput} value={id} setValue={setId}></InputBox>
                            <InputBox title={'Behavior Analysis Name'} style={styles.topHalfInput} value={analysisName} setValue={setAnalysisName}></InputBox>
                        </View>
                        <View style={styles.rightTwoInputsContainer}>
                            <InputBox title={'Session Name'} style={styles.topHalfInput}value={sessionName} setValue={setSessionName}></InputBox>
                            <InputBox title={'HRE Time'} style={styles.topHalfInput} value={hreTime} setValue={setHreTime}></InputBox>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomHalfContainer}>
                    <View style={styles.keyInputsHolder}>
                        <View style={styles.keyInputContainer}><InputBox title={'Key'} value={key} setValue={setKey}></InputBox></View>
                        <View style={styles.rightTwoInputsContainer}><InputBox title={'Target Behavior'} value={behavior} setValue={setBehavior}></InputBox></View>
                        <RoundButton buttonText='Add Key' style={{'justifyContent': 'flex-end'}} onClick={buttonPress}></RoundButton>
                    </View>
                    <KeyTable></KeyTable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

function KeyTable(){
    const [inputs, setInputs] = useState([
        {
            chosenKey: 'L',
            behavior: 'behavior 1'
        },
        {
            chosenKey: 'M',
            behavior: 'loooooooooooooooooooooooong string'
        },
        {
            chosenKey: 'G',
            behavior: 'bhv 3'
        }
    ])

    return(
        <>
        <FlatList 
            style={styles.table}
            data={inputs}
            keyExtractor={(item, index) => item.chosenKey + index}
            renderItem={({item})=>{
                    return <TableRow chosenKey={item.chosenKey} behavior={item.behavior}></TableRow>
                }
            }
            ListHeaderComponent={<TableRow chosenKey='Key' behavior='Target Behavior'></TableRow>}
        />
        </>
    )

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
            <View style={styles.buttonHolder}>
                <Pressable>
                    <Text style={styles.rowText}>X</Text>
                </Pressable>
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
    topHalfInput: {
        paddingVertical: '10%',
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 2,
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
    keyInputContainer: {
        borderColor: 'purple',
        borderStyle: 'solid',
        borderWidth: 2,
        paddingRight: '8%',
    },
    keyInputsHolder: {
        flexDirection: 'row',
        borderColor: 'yellow',
        borderStyle: 'solid',
        borderWidth: 3,
        justifyContent: 'center',
        paddingVertical: 30,
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
        flex: 1,
    },
    behaviorSide: {
        flex: 8,
        borderRightColor: 'pink',
        borderRightWidth: 1,
        borderRightStyle: 'solid',
    },
    rowText: {
        padding: 10,
        fontSize: 16,
        lineHeight: 30,
        alignSelf: 'center',
    },
    bottomHalfContainer: {
        alignItems: 'center',
    },
    button: {

    }
});