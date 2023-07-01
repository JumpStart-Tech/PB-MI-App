import { StyleSheet, View, Image, Text, ScrollView, FlatList, TextInput, Pressable, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";

// need to pull in data from server
const data = [
  {date: '2023-06-01',  id: '1'},
  {date: '2023-06-02',  id: '2',  },
  {date: '2023-06-03',  id: '3',  },
];

const History = ({navigation}) =>{
  const [searchDate, setSearchDate] = useState('');
  const [searchID, setSearchID] = useState('');

  const filteredData = data.filter((item) => {
    return item.date.includes(searchDate) && item.id.includes(searchID);
  });

    return (
        <SafeAreaView style={styles.page}>
            <View>
                <Header></Header>
            </View>
            <Text style = {styles.titleText}>History</Text>
            <View style = {{alignItems: 'center'}}>
                <View style={styles.searchContainer}>
                    <InputBox title = "Search Learn ID" style = {styles.input} value = {searchID} setValue = {setSearchID}></InputBox>
                    <InputBox title = "Search Date" style = {styles.input} value = {searchDate} setValue = {setSearchDate}></InputBox>
                </View>

                <View style = {styles.table}>
                    <View style={styles.label}>
                        <TextInput style={[styles.cell, {fontWeight: 'bold'}]} placeholder="Date" />
                        <TextInput style={[styles.cell, {fontWeight: 'bold'}]} placeholder="ID" />
                    </View>
                    <FlatList
                      data={filteredData}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                        <View style={styles.row}>
                          <Text style={styles.cell}>{item.id}</Text>
                          <Text style={styles.cell}>{item.date}</Text>
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
    borderColor: '#E9EDF5',
    borderRadius: 4,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default(History);