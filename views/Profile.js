import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, SafeAreaView, TextInput, TouchableOpacity} from "react-native";
import Header from "./components/Header";
import ProfileImage from "./components/ProfileImage"; 

// import view models to interface with server
import { useTherapist } from "../viewModels/therapistData";
import { profileControls } from '../viewModels/profileLogic';

// TODO: will not be able to add data that does not exist, only change what is already there
// TODO: must save profile picture

// Screen can be accessed through the header once you are logged in
const Profile = ({navigation, route}) =>{
  // take id from previous screen
  const userId = route.params?.userId || "0000";
  console.log('id from param:' + userId);

  let name = "Therapist " + userId;

  // store data from profileLogic file
  const {updateError, click} = profileControls(navigation);

  // obtain therapistInfo ysing therapistData file
  const therapistInfo = useTherapist(userId);
  console.log('therapist info:', therapistInfo);
  
  // store state of each value
  const [title, setTitle] = React.useState('');
  const [affiliation, setAffiliation] = React.useState('');
  const [confidence, setConfidence] = React.useState('');

  // tracks colors of buttons depending on whether they are selected
  const [color1, setColor1] = useState('#04A69D40'); // color at 25% opacity
  const [color2, setColor2] = useState('#04A69D40');
  const [color3, setColor3] = useState('#04A69D40');
  const [color4, setColor4] = useState('#04A69D40');

  // Wrap in use effect to prevent infinite loop of re-renders as state changes
  React.useEffect(() => { // check if therapistInfo changes
    if (therapistInfo) { // therapist info is non-null
      if (therapistInfo.title) {
        setTitle(therapistInfo.title);
      }
      if (therapistInfo.affiliation) {
        setAffiliation(therapistInfo.affiliation);
      }
      if (therapistInfo.confidence) {
        setConfidence(therapistInfo.confidence);
        setButtonColor(therapistInfo.confidence); // mark confidence button selected 
      }
    }
  }, [therapistInfo]);

  // modify button color based on confidence data
  const setButtonColor = (confidence) => {
    setColor1(confidence === 1 ? '#04A69D' : '#04A69D40');
    setColor2(confidence === 2 ? '#04A69D' : '#04A69D40');
    setColor3(confidence === 3 ? '#04A69D' : '#04A69D40');
    setColor4(confidence === 4 ? '#04A69D' : '#04A69D40');
  };
  
  // CircularButton component which takes the number and label it will display and its current coloring
  const CircularButton = ({number, name, color, setColor}) => {
      // prevents more than one option from being selected at the same time
      const limitSelection = () => {
        // allows no option to be selected
        if (!(color1 === '#04A69D40' && color2 === '#04A69D40' && color3 === '#04A69D40' && color4 === '#04A69D40')) {
          // prevents two options from being selected at once
          if (color === '#04A69D40') { // light color
              setColor1('#04A69D40');
              setColor2('#04A69D40');
              setColor3('#04A69D40');
              setColor4('#04A69D40');
          }
        }
      }

      // if button is selected, unselect (change color from dark to light). If not selected, select it (change color from light to dark).
      const changeColor = (number, color, setColor) => {
         limitSelection();
         if (color === '#04A69D') { // unselected button
            setColor('#04A69D40'); // light color
         } else { // selected new button
            setConfidence(parseInt(number));
            setColor('#04A69D'); // dark color
         }
      }

      return (
        <View style = {{padding: 10}}>
        <TouchableOpacity style={styles.buttonContainer} onPress = {() => changeColor(number, color, setColor)}>
          <View style={[styles.button, {backgroundColor: color}]}>
            {/* display 1, 2, 3, or 4 */}
            <Text style={styles.buttonText}>{number}</Text>
          </View>
        </TouchableOpacity>
          {/* display beginner, novice, skilled, or expert */}
          <Text style={[styles.text2, {alignSelf: 'center'}]}>{name}</Text> 
        </View>
      );
  };
 

  return (
      <SafeAreaView style = {{backgroundColor: '#fff', flex: 1, height: '100%'}}>
        <View styles = {styles.header}>
          <Header userId = {userId} navigation = {navigation}></Header>
        </View>
        <Text style = {styles.title}>Profile</Text>
        <View style = {styles.box}>
          {/* display picture, name, and title */}
          <View style = {{flexDirection: 'row'}}>
            <View style = {styles.logo}>
              <ProfileImage></ProfileImage>
            </View>
            <View>
              <Text style = {[styles.text, {fontWeight: 'bold'}]}>{name}</Text>
              <Text style = {[styles.text, {color: '#CBE1FF'}]}>{title}</Text>
            </View>
          </View>
          <View style={styles.line}></View>
        </View>
        <View>
          {/* display title, affiliation, and confidence */}
          <Text style = {styles.text2}>Affiliation</Text>
          <TextInput style={styles.input}
            placeholder=""
            value={affiliation}
           />
          <Text style = {styles.text2}>Title</Text>
          <TextInput style={styles.input}
            placeholder=""
            value={title}
           />
           {/* display confidence button selection */}
           <Text style = {styles.text2}>Confidence in Scoring</Text>
           <View style = {{flexDirection: 'row', marginHorizontal: '8%'}}>
             <CircularButton number = '1' name = 'Beginner' color = {color1} setColor = {setColor1}></CircularButton>
             <CircularButton number = '2' name = 'Novice' color = {color2} setColor = {setColor2}></CircularButton>
             <CircularButton number = '3' name = 'Skilled' color = {color3} setColor = {setColor3}></CircularButton>
             <CircularButton number = '4' name = 'Expert' color = {color4} setColor = {setColor4}></CircularButton>
           </View>
        </View>
        {/* display save button */}
        <View style = {styles.bottom}> 
             <TouchableOpacity style={[styles.saveButton]}
               onPress = {() =>  click(userId, {title, affiliation, confidence})}>
               <Text style={styles.saveButtonText}>Save</Text>
             </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
  },
  title: { // Profile text formatting
    color: 'black',
    fontSize: 36,
    justifyContent: 'top',
    textAlign: 'left',
    marginTop: '4%',
    marginBottom: '2%',
    marginHorizontal: '4%',
   },
  box: { // box holding picture, name, and title
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
  line: { // white line formatting
    flexDirection: 'row',
    width: '95%',
    height: 1,
    borderRadius: 1,
    backgroundColor: '#ffffff26',
    marginVertical: 10, 
  },
  image: { // profile image formatting
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
  text2: { // generic text formatting for title, affiliation, and confidence
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
  buttonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  bottom: {
    flexDirection: 'column-reverse',
    alignItems: 'flex-end',
    padding: 20,
  },
  saveButtonText: {
    fontSize: 20,
    lineHeight: 22,
    color: '#FFFFFF',
    paddingVertical: 12,
  },
  saveButton: {
    borderRadius: 100,
    width: '10%',
    alignItems: 'center',  
    backgroundColor: '#04A69D',
    marginVertical: 5,
  },
 });

export default(Profile);

