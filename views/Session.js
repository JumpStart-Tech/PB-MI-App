import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import RoundButton from "./components/RoundButton";
import SummaryData from "./components/SummaryData";
import Chart from "./components/Chart";

// Summary screen that is displayed when session is complete
export default function Session({ navigation, route }) {
  // take id from previous screen
  const userId = route.params?.userId || "0000";
  console.log("id from param:" + userId);
  const learnerId = route.params?.learnerId || "0000";
  console.log("Learner ID from param:" + learnerId);

  return (
    <View style={styles.page}>
      <View>
        <Header userId={userId} navigation={navigation}></Header>
      </View>
      <View style={styles.body}>
        <View style={styles.topItems}>
          <View
            style={{
              width: 800,
              borderColor: "red",
              borderWidth: 2,
              borderStyle: "solid",
            }}
          >
            <Chart propWidth="100%" propHeight={300}></Chart>
          </View>

          <View style={styles.topButtons}>
            <View>
              <RoundButton
                buttonText={"Confirm Control"}
                buttonWidth={2}
              ></RoundButton>
            </View>
            <View style={styles.buttonRow}>
              <RoundButton buttonText={"EO"}></RoundButton>
              <RoundButton buttonText={"SR"}></RoundButton>
              <Text></Text>
            </View>
            <View>
              <RoundButton buttonText={"Calm"}></RoundButton>
              <Text></Text>
            </View>
          </View>
        </View>
        <View style={styles.topItems}>
          <SummaryData></SummaryData>
          <View style={styles.topButtons}>
            <View style={styles.buttonRow}>
              <RoundButton buttonText={"PB"} buttonWidth="1"></RoundButton>
              <RoundButton buttonText={"PB"} buttonWidth="1"></RoundButton>
              <RoundButton buttonText={"PB"} buttonWidth="1"></RoundButton>
            </View>
            <View style={styles.buttonRow}>
              <RoundButton buttonText={"PB"} buttonWidth="1"></RoundButton>
              <RoundButton buttonText={"PB"} buttonWidth="1"></RoundButton>
              <RoundButton buttonText={"PB"} buttonWidth="1"></RoundButton>
            </View>
            <View style={styles.buttonRow}>
              <RoundButton buttonText={"PB"} buttonWidth="1"></RoundButton>
              <RoundButton buttonText={"PB"} buttonWidth="1"></RoundButton>
              <RoundButton buttonText={"PB"} buttonWidth="1"></RoundButton>
            </View>
            <View style={styles.buttonRow}>
              <RoundButton buttonText={"Undo"} buttonWidth="1"></RoundButton>
              <RoundButton buttonText={"Redo"} buttonWidth="1"></RoundButton>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    flex: 1,
    alignItems: "center",
  },
  topItems: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  topButtons: {
    borderColor: "black",
    borderWidth: 2,
    borderStyle: "solid",
    justifyContent: "space-around",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
