import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

const DropDown = ({title}) => { 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    //TODO: can't get select all button to work
    { label: 'Select All', value: ['one', 'two', 'three', 'four'] },
    { label: 'Option 1', value: 'one' },
    { label: 'Option 2', value: 'two' },
    { label: 'Option 3', value: 'three' },
    { label: 'Option 4', value: 'four' },
  ]);


  return (
    <View>
      <Text style = {styles.text}>{title}</Text>
      <View style = {styles.dropDownMenu}>
        <DropDownPicker
          multiple = 'true'
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          //setValue={(itemValue) => handleChange(itemValue)}
          setItems={setItems}
          placeholder="Select an option"
          placeholderStyle={ { color: 'gray' }}
          searchable={true}
          addCustomItem={true}
          searchPlaceholder="Search:"
          dropDownDirection="BOTTOM"
          mode="BADGE"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
   text: {
     color: 'black',
     fontSize: 14,
     lineHeight: 16,
     alignItems: 'left',
     textAlign: 'left',
     padding: 10,
   },
   dropDownItems: {
     textAlign: 'left',
     padding: 10,
   },
   dropDownMenu: {
     width: 300,
     borderRadius: 10,
   },
});

export default(DropDown);
