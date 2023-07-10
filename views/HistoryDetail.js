import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import EmailComments from "./components/EmailComments";
import SummaryData from "./components/SummaryData";
import { usePatients } from "../viewModels/learnerData";

const HistoryDetail = ({navigation, route}) => {

  // take id from previous screen
  const userId = route.params?.userId || "0000";
  console.log('id from param:' + userId);
  const learnerId = route.params?.learnerId || "0000";
  console.log('Learner ID from param:' + learnerId);
  const date = route.params?.lastUsed || "Unknown";
  console.log('Experiment date from param:' + date);

  return (
    <SafeAreaView>
      <View>
        <Header userId = {userId} navigation = {navigation}></Header>
      </View>
      <View style = {styles.page}>
        <Text style = {[styles.text, {marginTop: '3%'}]}>Participant ID: {learnerId}</Text>
        <Text style = {[styles.text, {marginBottom: '8%'}]}>Experiment Date: {date}</Text>
        <View style = {{flexDirection: 'row'}}>
            <View style = {styles.leftContainer}>
              <SummaryData userId = {userId} learnerId = {learnerId}></SummaryData>
            </View>
            <View style = {styles.rightContainer}>
              <View style = {{flex: 1}}>
                 <EmailComments></EmailComments>
             </View>
            </View>
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
  text: {
     color: 'black',
     fontSize: 14,
     lineHeight: 14,
     alignItems: 'left',
     textAlign: 'left',
     padding: 10,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: '5%',
    padding: 10,
  },
});

export default(HistoryDetail);