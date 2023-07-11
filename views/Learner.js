import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, FlatList, Pressable, SafeAreaView } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import Header from "./components/Header";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";
import DropDown from "./components/DropDown";

{/* TODO: should keys only be one character? */}
{/* TODO: need to pass along keys to session screen */}
const Learner = ({navigation, route}) =>{

    // take id from previous screen
    const userId = route.params?.userId || "0000";
    console.log('User ID from param:' + userId);
    const learnerId = route.params?.learnerId || "0000";
    console.log('Learner ID from param:' + learnerId);

    const [id, setId] = useState(learnerId);
    const [analysisName, setAnalysisName] = useState('')
    const [sessionName, setSessionName] = useState('')
    const [hreTime, setHreTime] = useState('')
    const [chosenKey, setChosenKey] = useState('')
    const [behavior, setBehavior] = useState('')

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    let selectedKeys = [];

    //allows new key and behavior to be added and orevent duplicate keys
    const handleAddToDropdown = () => {
      if (chosenKey !== '' && !items.find(item => item.label === chosenKey) && !items.find(item => item.value === behavior)) {
        setItems([...items, { label: chosenKey, value: behavior }]);
        setChosenKey('');
        setBehavior('');
      }
    };

    useEffect(() => {
      // Limit the number of items to 50
      if (items.length > 50) {
        setItems(items.slice(0, 50));
      }
    }, [items]);

    // prevent more than 9 keys from being selected
    const handleValueChange = (selectedItems) => {
      if (selectedItems.length <= 9) {
        setValue(selectedItems);
      }
      selectedKeys.push(value ? (value.map(selectedItem => selectedItem.label)) : ([]));
      console.log("Selected keys: " + selectedKeys);
    };

    return (
      <SafeAreaView style = {{backgroundColor: '#fff', flex: 1}}>
        <View styles = {styles.header}>
          <Header userId = {userId} navigation = {navigation}></Header>
        </View>
        <Text style = {styles.title}>Learner</Text>
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <InputBox title={'Participant ID'} value={id} setValue={setId}></InputBox>
                <InputBox title={'Behavior Analysis Name'} value={analysisName} setValue={setAnalysisName}></InputBox>
                <InputBox title={'Session Name'} value={sessionName} setValue={setSessionName}></InputBox>
                <InputBox title={'HRE Time'} value={hreTime} setValue={setHreTime}></InputBox>
            </View>
            <View style = {styles.rightContainer}>
                <View style={styles.inputHolder}>
                    <View><InputBox title={'Key'} value={chosenKey} setValue={setChosenKey}></InputBox></View>
                    <View style={styles.rightInput}><InputBox title={'Target Behavior'} value={behavior} setValue={setBehavior}></InputBox></View>
                </View>
                <RoundButton buttonText='Add Key' onClick={handleAddToDropdown}></RoundButton>
                <View>
                  <View style = {styles.dropDownMenu}>
                    <DropDownPicker
                      multiple = 'true'
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={handleValueChange}
                      setItems={setItems}
                      placeholder="Select an option"
                      placeholderStyle={ { color: 'gray' }}
                      searchable={true}
                      addCustomItem={true}
                      searchPlaceholder="Search:"
                      dropDownDirection="BOTTOM"
                      mode="BADGE"
                    />
                  </View>
                </View>
            </View>
            <View style={styles.nextButton}>
               <View style = {styles.button}>
                  <RoundButton 
                  buttonText="Next"
                  buttonWidth="1"
                  onClick = {() => navigation.navigate('Session', {userId, learnerId, sessionName, selectedKeys})}
                  >
                  </RoundButton>
                </View>
            </View>
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: { // General formatting
    flex: 1,
    flexDirection: 'row',
  },
  header: {
    flex: 1,
    width: '100%',
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    paddingVertical: '8%',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'top',
    marginHorizontal: '4%',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'top',
  },
  dropdown: {
      //marginHorizontal: w/4,
      //marginVertical: 100,
      justifyContent: 'center',
      //paddingVertical: '20%',
      alignSelf: 'center',
  },
  rightInput: {
        marginHorizontal: 20,
  },
  title: {
    color: 'black',
    fontSize: 36,
    justifyContent: 'top',
    textAlign: 'left',
    marginVertical: '6%',
    marginHorizontal: '4%',
   },
   button: {
     paddingVertical: '15%',
   },
   inputHolder: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: '8%',
      paddingRight: '8%',
  },
   nextButton: {
     flexDirection: 'column-reverse',
     padding: 20,
   },
   text: {
     color: 'black',
     fontSize: 14,
     lineHeight: 16,
     alignItems: 'left',
     textAlign: 'left',
     padding: 10,
   },
   dropDownItems: {
     textAlign: 'left',
     padding: 10,
   },
   dropDownMenu: {
     borderRadius: 10,
   },
  });

export default(Learner);

