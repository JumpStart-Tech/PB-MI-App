import { StyleSheet, View, Text } from "react-native";

// todo: must pull in learner data

const SummaryData = ({controlLevel=null, ria, rpi, eoTime, srTime, time, eoPb, eoSr, lowestPbRate=null, lowestSrRate=null}) => {

    return (
        <View style={styles.summaryDataContainer}> 
            {controlLevel != null && <Text style = {styles.text}>Control Level: {controlLevel}</Text>}
            <Text style = {styles.text}>RIAs: {ria}</Text>
            <Text style = {[styles.text, {marginBottom: 10}]}>RPIs: {rpi}</Text>

            <Text style = {styles.text}>EO Total Time: {eoTime}</Text>
            <Text style = {styles.text}>SR Total Time: {srTime}</Text>
            <Text style = {[styles.text, {marginBottom: 10}]}>Total Time: {time}</Text>

            <Text style = {styles.text}>Total EO PBs: {eoPb}</Text>
            <Text style = {[styles.text, {marginBottom: 10}]}>Total EO SRs: {eoSr}</Text>

            {lowestPbRate != null && <Text style = {styles.text}>Lowest PB Rate: {lowestPbRate}</Text>}
            {lowestSrRate != null && <Text style = {[styles.text, {marginBottom: 10}]}>Lowest SR Rate: {lowestSrRate}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
  summaryDataContainer: {
    width: 200,
  },
  text: {
    color: 'black',
    fontSize: 14,
    lineHeight: 14,
    alignItems: 'left',
    textAlign: 'left',
    padding: 10,
  },
});

export default(SummaryData);