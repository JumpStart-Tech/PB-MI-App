import { StyleSheet, View, Image, Text } from "react-native";
import Header from "./components/Header";
import RoundButton from "./components/RoundButton";
import InputBox from "./components/InputBox";

//size to current window
let w = window.innerWidth;
let h = window.innerHeight;

function Learner(){

    return (
        <View style={styles.container}>
            <Header></Header>
            <Text style = {styles.title}>Learner</Text>
            <InputBox title = {"Participant ID"}></InputBox>
            <InputBox title = {"Session Name"}></InputBox>
            <InputBox title = {"Behavior Analysis Name"}></InputBox>
            <InputBox title = {"HRE Time"}></InputBox>
        </View>
    )
}

const styles = StyleSheet.create({
  container: { // General formatting
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    display: 'flex',
    marginHorizontal: w/25,
    //justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 36,
    //alignItems: 'left',
    //fontWeight: 'bold',
    textAlign: 'left',
    //arithmetic ensures that text is centered in the dark blue portion
    marginVertical: h/9,
   },
  });

export default(Learner);

