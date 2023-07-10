import { StyleSheet, View, Text, ScrollView, FlatList, Pressable, SafeAreaView } from "react-native";
import RoundButton from "./RoundButton";
import { useState } from "react";

// function takes large data and displays 10 items at a time. It returns a view that will display the buttons as well as the current sliced data
const Pagination = ({navigation, array}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    let slicedArray = array.slice(startIndex, endIndex);

    {/* adjusts the current data to be displayed */}
    const nextPage = () => {
        if (currentPage < Math.ceil(array.length / itemsPerPage)) {
          setCurrentPage(currentPage + 1);
        }
    };
    const previousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
    };

    {/* returns both the button view and the sliced data for use in the table */}
    return [
        <View key = "view" style={styles.pagination}>
            <RoundButton onClick={previousPage}
                buttonText = {"Previous Page"}>
            </RoundButton>
            <Text style={styles.paginationText}>
                Page {currentPage} of {Math.ceil(array.length / itemsPerPage)}
            </Text>
            <RoundButton onClick={nextPage}
                buttonText = {"Next Page"}>
            </RoundButton>
        </View>,
        slicedArray,
    ];
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationText: {
    fontSize: 16,
    padding: 20,
  },
});

export {Pagination}