import { StyleSheet, View, Text } from "react-native";

// todo: must pull in learner data

const SummaryData = (userId, learnerId) => {

    return (
        <View>
            <Text style = {styles.text}>Control Level: </Text>
            <Text style = {styles.text}>RIAs: </Text>
            <Text style = {[styles.text, {marginBottom: 10}]}>RPIs: </Text>

            <Text style = {styles.text}>EO Total Time: </Text>
            <Text style = {styles.text}>SR Total Time: </Text>
            <Text style = {[styles.text, {marginBottom: 10}]}>Total Time: </Text>

            <Text style = {styles.text}>Total EO PBs: </Text>
            <Text style = {[styles.text, {marginBottom: 10}]}>Total EO SRs: </Text>

            <Text style = {styles.text}>Lowest PB Rate: </Text>
            <Text style = {[styles.text, {marginBottom: 10}]}>Lowest SR Rate: </Text>
        </View>
    );
};

const styles = StyleSheet.create({
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