import { StyleSheet, View, Text, ScrollView, FlatList, Pressable, SafeAreaView } from "react-native";
import { useState, useRef } from "react";
import { useHover, useFocus, useActive } from 'react-native-web-hooks';
import Header from "./components/Header";
import InputBox from "./components/InputBox";
import { Pagination } from "./components/Pagination";
import { usePatients } from "../viewModels/learnerData";
//import ArrowSvg from "./components/ArrowSvg";

// Screen can be accessed through the header once you are logged in
const History = ({navigation, route}) =>{
    // store state of inputs
    const [searchDate, setSearchDate] = useState('');
    const [searchID, setSearchID] = useState('');

    // take id from previous screen
    const userId = route.params?.userId || "No Data";
    console.log('id from param:' + userId);

    // obtain patient data from learnerData view model
    let patientsArr = usePatients(userId);

    // filter data by search criteria
    const newArray = patientsArr.filter((item) => item.id.toString().includes(searchID) && item.last_time_used.includes(searchDate))
    // limit to ten items
    const [paginationView, filteredData] = Pagination({ array: newArray });

    return (
        <SafeAreaView style={styles.page}>
            <View>
                <Header userId = {userId} navigation = {navigation}></Header>
            </View>
            <Text style = {styles.titleText}>History</Text>
            <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                {/* Search boxes */}
                <View style={styles.searchContainer}>
                    <InputBox title = "Search Learn ID" style = {[styles.input, {marginRight: '5%'}]} value = {searchID} setValue = {setSearchID}></InputBox>
                    <InputBox title = "Search Date" style = {[styles.input, {marginLeft: '5%'}]} value = {searchDate} setValue = {setSearchDate}></InputBox>
                </View>

                {/* Display table */}
                <View style={styles.tableHolder}>
                  <Table
                    inputs={filteredData}
                    style={styles.table}
                    navigation={navigation}
                    userId={userId}
                  >
                  </Table>
                </View>
                <View>
                  {paginationView}
                </View>
            </View>
        </SafeAreaView>
    )
}

// Holds table styling to be called in main History function
function Table({inputs, navigation, userId}){
    return(
        <>
        <FlatList 
            style={styles.table}
            data={inputs}
            keyExtractor={(item) => item.id}
            renderItem={({item})=>{
                    return (
                      <TableRow
                        learnerId={item.id}
                        lastUsed={item.last_time_used}
                        navigation={navigation}
                        userId={userId}
                      ></TableRow>
                    );
                }
            }
            ListHeaderComponent={<TableRow learnerId={'Learner ID'} lastUsed={'Last Time Used'} 
                isHeader={true} listIsEmpty={false}
                navigation={navigation} userId={userId}></TableRow>}
        />
        </>
    )
}

// Holds row-specific styling that is called by Table function
function TableRow({learnerId, lastUsed, compSessions, isHeader=false, listIsEmpty, navigation, userId}){
    const ref = useRef(null);
    const isHovered = useHover(ref);
    // the header should not be selectable and should not be colored when the mouse hovers over it
    const PressableOrView = (isHeader) ? View : Pressable;
    const buttonPress = (isHeader) ? {} : {onPress: () => {navigation.navigate('HistoryDetail', {userId, learnerId, lastUsed})}}

    return (
        <PressableOrView ref={ref} {...buttonPress} style={[{...styles.tableRow, borderTopLeftRadius: (isHeader) ? 8 : 0, 
        borderTopRightRadius: isHeader ? 8 : 0, borderTopWidth: (isHeader) ? 2 : 0, display: (listIsEmpty) ? 'none' : 'flex'},
        (!isHeader) ? isHovered && { backgroundColor: '#E9EDF5'} : '']}>
            <View style={styles.items}>
                <Text style={{...styles.rowText, color: (isHeader) ? '#687182': ''}}>{learnerId}</Text>
            </View>
            <View style={styles.items}>
                <Text style={{...styles.rowText, color: (isHeader) ? '#687182': ''}}>{lastUsed}</Text>
            </View>
        </PressableOrView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleText: { // History title text formatting
    fontSize: 35,
    lineHeight: 30,
    padding: '5%',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '80%',
    marginBottom: '4%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontWeight: 'bold',
    padding: 10,
  },
  tableHolder: {
    alignSelf: 'center',
    width: '80%',
  },
  tableRow : {
    borderColor: '#E9EDF5',
    borderStyle: 'solid',
    borderWidth: 2,
    flexDirection: 'row',
  },
  items: {
    borderRightColor: '#E9EDF5',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    flex: 1,
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
});

export default(History);