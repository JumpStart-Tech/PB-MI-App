import { StyleSheet, View, Image, Text, ScrollView, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";
import Header from "./components/Header";
import { usePatients } from "../viewModels/learnerData";

export default function ExistingLearner(){
    let patientsArr = usePatients(7012);

    return (
        <SafeAreaView style={styles.page}>
            <View>
                <Header></Header>
            </View>
            <View style={styles.body}>
                <View style={styles.titleHolder}>
                    <Text style={styles.titleText}>Existing Learners</Text>
                </View>
                
            </View>
        </SafeAreaView>
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
    titleHolder: {
        borderColor: 'blue',
        borderWidth: 2,
        borderStyle: 'solid',
    },
    titleText: {
        fontSize: 35,
        lineHeight: 30,
        padding: '4%',
    },
})