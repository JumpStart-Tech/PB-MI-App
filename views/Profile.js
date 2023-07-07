import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, SafeAreaView, TextInput, TouchableOpacity} from "react-native";
import Header from "./components/Header";
import pic from "./components/temporary.png";

const Profile = ({navigation, route}) =>{
  const [affiliation, setAffiliation] = React.useState('');
  const [title, setTitle] = React.useState('');

  // take id from previous screen
  const userId = route.params?.userId || "0000";
  console.log('id from param:' + userId);

  // todo: use therapist data to fill in profile values

  // tracks colors of buttons depending on whether they are selected
  const [color1, setColor1] = useState('#04A69D');
  const [color2, setColor2] = useState('#04A69D40'); // color at 25% opacity
  const [color3, setColor3] = useState('#04A69D40');
  const [color4, setColor4] = useState('#04A69D40');
  
  const CircularButton = ({number, name, color, setColor}) => {
      // prevents more than one option from being selected at the same time
      const limitSelection = () => {
        // allows no option to be selected
        if (!(color1 === '#04A69D40' && color2 === '#04A69D40' && color3 === '#04A69D40' && color4 === '#04A69D40')) {
          // prevents two options from being selected at once
          if (color === '#04A69D40') {
                setColor1('#04A69D40');
                setColor2('#04A69D40');
                setColor3('#04A69D40');
                setColor4('#04A69D40');
          }
        }
      }

      const changeColor = (color, setColor) => {
         limitSelection();
         if (color === '#04A69D') {
            setColor('#04A69D40');
         } else {
            setColor('#04A69D');
         }
      }

      return (
        <View style = {{padding: 10}}>
        <TouchableOpacity style={styles.buttonContainer} onPress = {() => changeColor(color, setColor)}>
          <View style={[styles.button, {backgroundColor: color}]}>
            <Text style={styles.buttonText}>{number}</Text>
          </View>
        </TouchableOpacity>
          <Text style={[styles.text2, {alignSelf: 'center'}]}>{name}</Text>
        </View>
      );
  };
 

  return (
      <SafeAreaView style = {{backgroundColor: '#fff', flex: 1,}}>
        <View styles = {styles.header}>
          <Header userId = {userId} navigation = {navigation}></Header>
        </View>
        <Text style = {styles.title}>Profile</Text>
        <View style = {styles.box}>
          <View style = {{flexDirection: 'row'}}>
            <View style = {styles.logo}>
              <Image style={styles.image} source={pic} />
            </View>
            <View>
              <Text style = {[styles.text, {fontWeight: 'bold'}]}>First Name Last Name</Text>
              <Text style = {[styles.text, {color: '#CBE1FF'}]}>Professional Title</Text>
            </View>
          </View>
          <View style={styles.line}></View>
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
           <Text style = {styles.text2}>Confidence in Scoring</Text>
           <View style = {{flexDirection: 'row', marginHorizontal: '8%', marginBottom: '2%'}}>
             <CircularButton number = '1' name = 'Beginner' color = {color1} setColor = {setColor1}></CircularButton>
             <CircularButton number = '2' name = 'Novice' color = {color2} setColor = {setColor2}></CircularButton>
             <CircularButton number = '3' name = 'Skilled' color = {color3} setColor = {setColor3}></CircularButton>
             <CircularButton number = '4' name = 'Expert' color = {color4} setColor = {setColor4}></CircularButton>
           </View>
          <Text>' '</Text>
        </View>
      </SafeAreaView>
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
    marginTop: '4%',
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
  line: {
    flexDirection: 'row',
    width: '95%',
    height: 1,
    borderRadius: 1,
    backgroundColor: '#ffffff26',
    marginVertical: 10, 
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
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'left',
    padding: 10,
  },
  text2: {
    color: 'black',
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'left',
    marginTop: 10,
    marginHorizontal: '8%',
    padding: 2,
  },
  input: {
    color: 'black',
    fontSize: 16,
    lineHeight: 25,
    height: 35,
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

