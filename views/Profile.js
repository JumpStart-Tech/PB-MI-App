import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, FlatList, Pressable, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import Header from "./components/Header";
import pic from "./components/temporary.png";

const Profile = ({navigation}) =>{
  const [affiliation, setAffiliation] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [color1, setColor1] = useState('white');
  /*
  const [isSelected2, setIsSelected2] = useState(false);
  const [isSelected3, setIsSelected3] = useState(false);
  const [isSelected4, setIsSelected4] = useState(false);
  */

  
  /*
  const darkColor = () => {
        setColor1('#04A69D');
  };

  const lightColor = () => {
    setColor1('white');
  };
  */
  
  const CircularButton = ({number, name}) => {
      return (
        <View style = {{padding: 10}}>
        <TouchableOpacity style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{number}</Text>
          </View>
        </TouchableOpacity>
          <Text style={[styles.text2, {alignSelf: 'center'}]}>{name}</Text>
        </View>
      );
  };
  
  
  /*
            <View style={{flexDirection: 'row', marginHorizontal: '8%',}}>
            <View style = {{padding: 10}}>
            <button style={[styles.buttonContainer, {color: color1}]} onClick={darkColor}>
              <View style={[styles.button, {color: color1}]}>
                <Text style={styles.buttonText}>1</Text>
              </View>
            </button>
              <Text style={[styles.text2, {alignSelf: 'center'}]}>Beginner</Text>
            </View>
            <CircularButton number = '1' name = 'Beginner'></CircularButton>
            <CircularButton number = '2' name = 'Novice'></CircularButton>
            <CircularButton number = '3' name = 'Skilled'></CircularButton>
            <CircularButton number = '4' name = 'Expert'></CircularButton>
*/

  return (
      <View style = {{backgroundColor: '#fff', flex: 1,}}>
        <View styles = {styles.header}>
          <Header></Header>
        </View>
        <Text style = {styles.title}>Profile</Text>
        <View style = {styles.box}>
          <View style = {{flexDirection: 'row'}}>
          <View style = {styles.logo}>
            <Image style={styles.image} source={pic} />
          </View>
          <View>
            <Text style = {[styles.text, {fontWeight: 'bold'}]}>First Name Last Name</Text>
            <Text style = {styles.text}>Professional Title</Text>
          </View>
          </View>
        </View>
        <View>
          <Text style = {styles.text2}>Affiliation</Text>
          <TextInput style={styles.input}
            placeholder=""
            onChangeText={setAffiliation}
            value={affiliation}
           />
          <Text style = {styles.text2}>Title</Text>
          <TextInput style={styles.input}
            placeholder=""
            onChangeText={setTitle}
            value={title}
           />
           <View style = {{flexDirection: 'row', marginHorizontal: '8%'}}>
             <CircularButton number = '1' name = 'Beginner'></CircularButton>
             <CircularButton number = '2' name = 'Novice'></CircularButton>
             <CircularButton number = '3' name = 'Skilled'></CircularButton>
             <CircularButton number = '4' name = 'Expert'></CircularButton>
           </View>
          <Text>' '</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
  },
  title: {
    color: 'black',
    fontSize: 36,
    justifyContent: 'top',
    textAlign: 'left',
    marginTop: '6%',
    marginBottom: '2%',
    marginHorizontal: '4%',
   },
  box: {
    flex: 1,
    backgroundColor: '#04A69D',
    color: '#04A69D',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    borderRadius: 50,
    padding: 20,
  },
  logo: {
  
  },
  image: {
    flex: 1,
    height: 43,
    width: undefined,
    aspectRatio: 512 / 297,
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'left',
    padding: 10,
  },
  text2: {
    color: 'black',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'left',
    marginTop: 10,
    marginHorizontal: '8%',
    padding: 2,
  },
  input: {
    color: 'black',
    fontSize: 16,
    lineHeight: 30,
    height: 40,
    width: '25%',
    marginHorizontal: '8%',
    backgroundColor: '#eff7ff',  
    marginVertical: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    marginHorizontal: '8%',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#04A69D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: 'darkblue',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
 });

export default(Profile);

