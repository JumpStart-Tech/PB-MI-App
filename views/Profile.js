import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, SafeAreaView, TextInput, TouchableOpacity} from "react-native";
import Header from "./components/Header";
import RoundButton from "./components/RoundButton";
import ProfileImage from "./components/ProfileImage"; 
import { useTherapist } from "../viewModels/therapistData";
import { profileControls } from '../viewModels/profileLogic';

// TODO: will not be able to add data that does not exist, only change what is already there
const Profile = ({navigation, route}) =>{
  // take id from previous screen
  const userId = route.params?.userId || "0000";
  console.log('id from param:' + userId);

  let name = "Therapist " + userId;

  const {updateError, click} = profileControls(navigation);

  // todo: use therapist data to fill in profile values
  const therapistInfo = useTherapist(userId);
  console.log('therapist info:', therapistInfo);
  
  const [title, setTitle] = React.useState('');
  const [affiliation, setAffiliation] = React.useState('');
  const [confidence, setConfidence] = React.useState('');

  // tracks colors of buttons depending on whether they are selected
  const [color1, setColor1] = useState('#04A69D40'); // color at 25% opacity
  const [color2, setColor2] = useState('#04A69D40');
  const [color3, setColor3] = useState('#04A69D40');
  const [color4, setColor4] = useState('#04A69D40');

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
      }
          // modify button color based on confidence data
          if (therapistInfo.confidence === 4) {
              setColor4('#04A69D');
          } else if (therapistInfo.confidence === 3 ) {
              setColor3('#04A69D');
          } else if (therapistInfo.confidence === 2 ) {
              setColor2('#04A69D');
          } else if (therapistInfo.confidence === 1 ){
              setColor1('#04A69D');
          }
    }
  }, [therapistInfo]);
  
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

      const changeColor = (number, color, setColor) => {
         limitSelection();
         if (color === '#04A69D') {
            setColor('#04A69D40');
         } else {
            setConfidence(parseInt(number));
            setColor('#04A69D');
         }
      }

      return (
        <View style = {{padding: 10}}>
        <TouchableOpacity style={styles.buttonContainer} onPress = {() => changeColor(number, color, setColor)}>
          <View style={[styles.button, {backgroundColor: color}]}>
            <Text style={styles.buttonText}>{number}</Text>
          </View>
        </TouchableOpacity>
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
           <View style = {{flexDirection: 'row', marginHorizontal: '8%'}}>
             <CircularButton number = '1' name = 'Beginner' color = {color1} setColor = {setColor1}></CircularButton>
             <CircularButton number = '2' name = 'Novice' color = {color2} setColor = {setColor2}></CircularButton>
             <CircularButton number = '3' name = 'Skilled' color = {color3} setColor = {setColor3}></CircularButton>
             <CircularButton number = '4' name = 'Expert' color = {color4} setColor = {setColor4}></CircularButton>
           </View>
        </View>
        <View style = {styles.bottom}> 
                  <RoundButton 
                  buttonText="Save"
                  buttonWidth="1"
                  onClick = {() =>  click(userId, {title, affiliation, confidence})}
                  >
                  </RoundButton>
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
  bottom: {
    flexDirection: 'column-reverse',
    alignItems: 'flex-end',
    padding: 20,
  },
 });

export default(Profile);

