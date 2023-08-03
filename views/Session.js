import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import RoundButton from "./components/RoundButton";
import SummaryData from "./components/SummaryData";
import Chart from "./components/Chart";
import useSessionControls from "../viewModels/sessionLogic";
import { calculateSummaryData } from "../viewModels/calculateSummaryData";

// Summary screen that is displayed when session is complete
export default function Session({ navigation, route }) {
  // take id from previous screen
  const userId = route.params?.userId || "0000";
  const learnerId = route.params?.learnerId || "0000";
  const {
    startSession,
    endSession,
    resetSession,
    dangerousData,
    nonDangerousData,
    interactiveBehaviorData,
    engagementData,
    calmnessData,
    reinforcementData,
    milliseconds,
    undoAvailable,
    redoAvailable,
    isRunning,
    undo,
    redo,
    addDangerous,
    addNonDangerous,
    addInteractive,
    addEngagement,
    addCalmness,
    addReinforcement,
    eoActive, //not state var
  } = useSessionControls();

  const { ria, rpi, eoTime, srTime, time, eoPresses } = calculateSummaryData(
    milliseconds,
    isRunning,
    {
      dangerousData,
      nonDangerousData,
      interactiveBehaviorData,
      engagementData,
      calmnessData,
      reinforcementData,
    }
  );

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
            <Chart
              propWidth="100%"
              propHeight={300}
              milliseconds={milliseconds}
              dangerousData={dangerousData}
              nonDangerousData={nonDangerousData}
              interactiveBehaviorData={interactiveBehaviorData}
              engagementData={engagementData}
              calmnessData={calmnessData}
              reinforcementData={reinforcementData}
            ></Chart>
          </View>

          <View style={styles.topButtons}>
            <View>
              <RoundButton
                buttonText={"Confirm Control"}
                buttonWidth={2}
                disabled={!isRunning}
              ></RoundButton>
            </View>
            <View style={styles.buttonRow}>
              {/* <RoundButton
                buttonText={"EO"}
                onClick={() => addReinforcement("EO")}
                disabled={eoActive}
                style={eoActive ? { backgroundColor: "#3cdfff" } : null}
              ></RoundButton>
              <RoundButton
                buttonText={"SR"}
                onClick={() => addReinforcement("SR")}
                disabled={!eoActive}
                style={!eoActive ? { backgroundColor: "#3cdfff" } : null}
              ></RoundButton> */}
              <View style={styles.eoSwitchContainer}>
                <Text
                  style={[
                    styles.eoSwitchText,
                    { backgroundColor: !eoActive ? "#bebebe" : null },
                  ]}
                >
                  SR
                </Text>
                <Switch
                  style={styles.eoSwitch}
                  value={eoActive}
                  onValueChange={(newEoActiveVal) =>
                    addReinforcement(newEoActiveVal ? "EO" : "SR")
                  }
                  thumbColor="#04A69D"
                  activeThumbColor="#04A69D"
                  trackColor="#bebebe"
                  activeTrackColor="#3cdfff"
                />
                <Text
                  style={[
                    styles.eoSwitchText,
                    { backgroundColor: eoActive ? "#3cdfff" : null },
                  ]}
                >
                  EO
                </Text>
                <Text style={styles.eoPressCountText}>{eoPresses}</Text>
              </View>
            </View>
            <View>
              <RoundButton
                buttonText={calmnessData.length % 2 == 0 ? "Calm" : "End Calm"}
                onClick={addCalmness} //if calm data needs to be ended, end it
                style={
                  calmnessData.length % 2 != 0
                    ? { backgroundColor: "#F21E1E" }
                    : {}
                }
                disabled={!isRunning}
              ></RoundButton>
              <Text>
                {calmnessData.length % 2 == 0 //calm isn't active in this case
                  ? ""
                  : ((milliseconds - calmnessData[calmnessData.length - 1] < 30000)
                  ? `${
                      30 -
                      Math.floor(
                        (milliseconds - calmnessData[calmnessData.length - 1]) /
                          1000
                      )
                    } s`
                  : "0 s")}
              </Text>
              {/* if calm time has been started and less than 30 s have elapsed, show number of seconds remaining. Otherwise, show 0 seconds  */}
            </View>
          </View>
        </View>
        <View style={styles.topItems}>
          <SummaryData
            ria={ria}
            rpi={rpi}
            eoTime={eoTime}
            srTime={srTime}
            time={time}
            eoPb={"-"}
            eoSr={"-"}
          ></SummaryData>
          <View style={styles.topButtons}>
            <View style={styles.buttonRow}>
              <RoundButton
                buttonText={"PB"}
                buttonWidth="1"
                onClick={() => addDangerous("test1")}
                disabled={!isRunning}
              ></RoundButton>
              <RoundButton
                buttonText={"PB"}
                buttonWidth="1"
                onClick={() => addDangerous("test1")}
                disabled={!isRunning}
              ></RoundButton>
              <RoundButton
                buttonText={"PB"}
                buttonWidth="1"
                onClick={() => addDangerous("test1")}
                disabled={!isRunning}
              ></RoundButton>
            </View>
            <View style={styles.buttonRow}>
              <RoundButton
                buttonText={"PB"}
                buttonWidth="1"
                onClick={() => addDangerous("test1")}
                disabled={!isRunning}
              ></RoundButton>
              <RoundButton
                buttonText={"PB"}
                buttonWidth="1"
                onClick={() => addDangerous("test1")}
                disabled={!isRunning}
              ></RoundButton>
              <RoundButton
                buttonText={"PB"}
                buttonWidth="1"
                onClick={() => addNonDangerous("test6")}
                disabled={!isRunning}
              ></RoundButton>
            </View>
            <View style={styles.buttonRow}>
              <RoundButton
                buttonText={"PB"}
                buttonWidth="1"
                onClick={() => addNonDangerous("test6")}
                disabled={!isRunning}
              ></RoundButton>
              <RoundButton
                buttonText={"PB"}
                buttonWidth="1"
                onClick={() => addNonDangerous("test6")}
                disabled={!isRunning}
              ></RoundButton>
              <RoundButton
                buttonText={"PB"}
                buttonWidth="1"
                onClick={() => addNonDangerous("test6")}
                disabled={!isRunning}
              ></RoundButton>
            </View>
            <View style={styles.buttonRow}>
              <RoundButton
                buttonText={"Undo"}
                buttonWidth="1"
                onClick={undo}
                disabled={!undoAvailable}
              ></RoundButton>
              <RoundButton
                buttonText={"Redo"}
                buttonWidth="1"
                onClick={redo}
                disabled={!redoAvailable}
              ></RoundButton>
            </View>
          </View>
        </View>
        <View style={styles.topItems}>
          <RoundButton
            buttonText={!isRunning ? "Start" : "End Session"}
            buttonWidth="2"
            onClick={!isRunning ? startSession : endSession}
            style={isRunning ? { backgroundColor: "#F21E1E" } : null}
          ></RoundButton>
          <RoundButton
            buttonText={"Reset"}
            buttonWidth="2"
            onClick={resetSession}
            disabled={!isRunning}
          ></RoundButton>
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
  eoSwitchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  eoSwitchText: {
    fontSize: 20,
    lineHeight: 22,
    padding: 12,
    borderRadius: 5,
  },
  eoPressCountText: {
    fontSize: 20,
    lineHeight: 22,
    padding: 6,
    borderRadius: 5,
    backgroundColor: "#3cdfff",
    marginLeft: 3,
  },
  eoSwitch: {
    marginHorizontal: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
