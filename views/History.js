import { StyleSheet, View, Image, Text, ScrollView, FlatList, TextInput, Pressable, TouchableOpacity, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";
import { usePatients } from "../viewModels/learnerData";
import ArrowSvg from "./components/ArrowSvg";

const History = ({navigation, route}) =>{
    const [searchDate, setSearchDate] = useState('');
    const [searchID, setSearchID] = useState('');

    // take id from previous screen
    const userId = route.params?.userId || "0000";
    console.log('id from param:' + userId);

    //todo: if userId has no data I'm not sure this functions properly

    let patientsArr = usePatients(userId);

    //filter data by search criteria
    const filteredData = patientsArr.filter((item) => item.id.toString().includes(searchID) && item.last_time_used.includes(searchDate))

    return (
        <SafeAreaView style={styles.page}>
            <View>
                <Header userId = {userId} navigation = {navigation}></Header>
            </View>
            <Text style = {styles.titleText}>History</Text>
            <View style = {{alignItems: 'center'}}>
                <View style={styles.searchContainer}>
                    <InputBox title = "Search Learn ID" style = {styles.input} value = {searchID} setValue = {setSearchID}></InputBox>
                    <InputBox title = "Search Date" style = {styles.input} value = {searchDate} setValue = {setSearchDate}></InputBox>
                </View>

                <View style = {styles.table}>
                    <View style={styles.label}>
                        <TextInput style={[styles.cell, {fontWeight: 'bold'}]} placeholder="ID" />
                        <TextInput style={[styles.cell, {fontWeight: 'bold'}]} placeholder="Date" />
                    </View>
                    <FlatList
                      data={filteredData}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                        <View style={styles.row}>
                          <Text style={styles.cell}>{item.id}</Text>
                          <Text style={styles.cell}>{item.last_time_used}</Text>
                        </View>
                      )}
                    />
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
  titleText: {
    fontSize: 35,
    lineHeight: 30,
    padding: '5%',
  },
  searchContainer: {
    flexDirection: 'row',
    width: '80%',
    marginBottom: '4%',
  },
  input: {
    flex: 1,
    fontWeight: 'bold',
    padding: 10,
  },
  table: {
    flex: 1,
    width: '80%',
  },
  label: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 2,
    borderColor: '#E9EDF5', // light gray
    borderRadius: 4,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default(History);