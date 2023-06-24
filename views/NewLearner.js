import { StyleSheet, View, Image, Text, ScrollView, FlatList, Pressable, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";

export default function NewLearner(){
    const [id, setId] = useState('');
    const [analysisName, setAnalysisName] = useState('')
    const [sessionName, setSessionName] = useState('')
    const [hreTime, setHreTime] = useState('')
    const [chosenKey, setChosenKey] = useState('')
    const [behavior, setBehavior] = useState('')
    const [inputs, setInputs] = useState([])

    function buttonPress(){
        let tempKey = structuredClone(inputs)
        tempKey.push({chosenKey, behavior})
        setInputs(tempKey)
        setChosenKey('')
        setBehavior('')
    }

    function removeRow(index){
        let tempKey = structuredClone(inputs)
        tempKey.splice(index, 1)
        setInputs(tempKey)
    }

    // useEffect(()=>{
    //     fetch('http://localhost:3000/1541')
    //         .then(response => response.json())
    //         .then(response => console.log(response))
    // }, [])

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
                        <View style={styles.keyInputContainer}><InputBox title={'Key'} value={chosenKey} setValue={setChosenKey}></InputBox></View>
                        <View style={styles.rightTwoInputsContainer}><InputBox title={'Target Behavior'} value={behavior} setValue={setBehavior}></InputBox></View>
                        <RoundButton buttonText='Add Key' style={{'justifyContent': 'flex-end'}} onClick={buttonPress}></RoundButton>
                    </View>
                    <KeyTable inputs={inputs} removeRow={removeRow}></KeyTable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

function KeyTable({inputs, removeRow}){
    
    return(
        <>
        <FlatList 
            style={styles.table}
            data={inputs}
            keyExtractor={(item, index) => item.chosenKey + index}
            renderItem={({item, index})=>{
                    return <TableRow chosenKey={item.chosenKey} 
                    behavior={item.behavior}
                    onClose={()=>{removeRow(index)}}>
                    </TableRow>
                }
            }
            ListHeaderComponent={<TableRow chosenKey='Key' behavior='Target Behavior' 
                isHeader={true} listIsEmpty={inputs.length == 0}></TableRow>}
        />
        </>
    )

}

function TableRow({chosenKey, behavior, isHeader=false, onClose, listIsEmpty}){

    return (
        <View style={{...styles.tableRow, borderTopLeftRadius: isHeader ? 8 : 0, 
        borderTopRightRadius: isHeader ? 8 : 0, borderTopWidth: isHeader ? 2 : 0, display: (listIsEmpty) ? 'none' : 'flex'}}>
            <View style={styles.keySide}>
                <Text style={styles.rowText}>{chosenKey}</Text>
            </View>
            <View style={styles.behaviorSide}>
                <Text style={styles.rowText}>{behavior}</Text>
            </View>
            <View style={styles.buttonHolder}>
                { isHeader 
                    ? <View>
                        <Text style={{...styles.rowText, 
                            color: 'white', cursor: 'default'}}>X</Text>
                    </View>
                    : <Pressable onPress={onClose}>
                        <Text style={{...styles.rowText, color: 'red' }} selectable={false}>X</Text>
                    </Pressable>
                }
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
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 2,
        flexDirection: 'row',
    },
    keySide: {
        borderRightColor: 'grey',
        borderRightWidth: 1,
        borderRightStyle: 'solid',
        flex: 1,
    },
    behaviorSide: {
        flex: 8,
        borderRightColor: 'grey',
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
});