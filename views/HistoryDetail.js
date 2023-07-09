import { StyleSheet, View, Image, Text, ScrollView, FlatList, TextInput, Pressable, TouchableOpacity, SafeAreaView } from "react-native";
import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";
import { usePatients } from "../viewModels/learnerData";

const HistoryDetail = ({navigation, route}) => {

  // take id from previous screen
  const userId = route.params?.userId || "0000";
  console.log('id from param:' + userId);
  const learnerId = route.params?.learnerId || "0000";
  console.log('Learner ID from param:' + learnerId);
  const date = route.params?.lastUsed || "Unknown";
  console.log('Experiment date from param:' + date);

  const [comments, setComments] = useState('');
  const [email, setEmail] = useState('');


  return (
    <SafeAreaView>
      <View>
        <Header userId = {userId} navigation = {navigation}></Header>
      </View>
      <View style = {styles.page}>
        <Text style = {[styles.text, {marginTop: '3%'}]}>Participant ID: {learnerId}</Text>
        <Text style = {[styles.text, {marginBottom: '8%'}]}>Experiment Data: {date}</Text>
        <View style = {{flexDirection: 'row'}}>
            <View style = {styles.leftContainer}>
              <Text style = {styles.text}>Control level: </Text>
              <Text style = {styles.text}>RIAs: </Text>
              <Text style = {[styles.text, {marginBottom: 10}]}>RPIs: </Text>

              <Text style = {styles.text}>EO Total Time: </Text>
              <Text style = {styles.text}>SR Total Time: </Text>
              <Text style = {[styles.text, {marginBottom: 10}]}>Total Time: </Text>

              <Text style = {styles.text}>Total EO PBs: </Text>
              <Text style = {[styles.text, {marginBottom: 10}]}>Total EO SRs: </Text>

              <Text style = {styles.text}>Lowest PB Rate: </Text>
              <Text style = {[styles.text, {marginBottom: 10}]}>Lowest SR Rate: </Text>
            </View>
            <View style = {styles.rightContainer}>
              <InputBox title = "Comments" style = {styles.input} value = {comments} setValue = {setComments}></InputBox>
              <InputBox title = "Email" style = {[styles.input, {marginTop: '5%'}]} value = {email} setValue = {setEmail}></InputBox>
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
    
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  input: {
    marginRight: '10%',
    padding: 10,
  },
});

export default(HistoryDetail);