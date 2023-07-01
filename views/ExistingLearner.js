import { StyleSheet, View, Image, Text, ScrollView, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";
import Header from "./components/Header";
import { usePatients } from "../viewModels/learnerData";
import ArrowSvg from "./components/ArrowSvg";

export default function ExistingLearner(){
    let patientsArr = usePatients(5827);

    return (
        <SafeAreaView style={styles.page}>
            <View>
                <Header></Header>
            </View>
            <View style={styles.body}>
                <View>
                    <Text style={styles.titleText}>Existing Learners</Text>
                </View>
                <View style={styles.tableHolder}>
                    <Table inputs={patientsArr} style={styles.table}>
                </Table></View>
            </View>
        </SafeAreaView>
    )
}

function Table({inputs}){
    
    return(
        <>
        <FlatList 
            style={styles.table}
            data={inputs}
            keyExtractor={(item) => item.id}
            renderItem={({item})=>{
                    return <TableRow learnerId={item.id} 
                    lastUsed={item.last_time_used}
                    compSessions={item.number_of_sessions}>
                    </TableRow>
                }
            }
            ListHeaderComponent={<TableRow learnerId={'Learner ID'} lastUsed={'Last Time Used'} 
                compSessions={'Completed Sessions'} isHeader={true} listIsEmpty={false}></TableRow>}
        />
        </>
    )

}

function TableRow({learnerId, lastUsed, compSessions, isHeader=false, listIsEmpty}){

    return (
        <View style={{...styles.tableRow, borderTopLeftRadius: (isHeader) ? 8 : 0, 
        borderTopRightRadius: isHeader ? 8 : 0, borderTopWidth: (isHeader) ? 2 : 0, display: (listIsEmpty) ? 'none' : 'flex'}}>
            <View style={styles.arrow}>
                {!isHeader && <ArrowSvg></ArrowSvg>}
            </View>
            <View style={styles.learnerId}>
                <Text style={{...styles.rowText, color: (isHeader) ? '#687182': ''}}>{learnerId}</Text>
            </View>
            <View style={styles.lastUsed}>
                <Text style={{...styles.rowText, color: (isHeader) ? '#687182': ''}}>{lastUsed}</Text>
            </View>
            <View style={styles.sessions}>
                <Text style={{...styles.rowText, color: (isHeader) ? '#687182': ''}}>{compSessions}</Text>
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
        borderColor: 'red',
        borderWidth: 2,
        borderStyle: 'solid',
    },
    titleText: {
        fontSize: 35,
        lineHeight: 30,
        padding: '4%',
    },
    tableHolder: {
        alignSelf: 'center',
        width: '80%',
        borderColor: 'green',
        borderStyle: 'solid',
        borderWidth: 2,
    },
    tableRow : {
        borderColor: '#E9EDF5',
        borderStyle: 'solid',
        borderWidth: 2,
        flexDirection: 'row',
    },
    arrow: {
        justifyContent: 'center',
    },
    learnerId: {
        borderRightColor: '#E9EDF5',
        borderRightWidth: 1,
        borderRightStyle: 'solid',
        flex: 8,
        alignItems: 'left',
    },
    lastUsed: {
        flex: 2,
        borderRightColor: '#E9EDF5',
        borderRightWidth: 1,
        borderRightStyle: 'solid',
        alignItems: 'center',
    },
    sessions: {
        flex: 2,
        alignItems: 'center',
    },
    rowText: {
        padding: 10,
        fontSize: 16,
        lineHeight: 30,
    },
})