import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

const DropDown = () => { 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Option 1', value: 'One' },
    { label: 'Option 2', value: 'Two' },
    { label: 'Option 3', value: 'Three' },
    { label: 'Option 4', value: 'Four' },
  ]);

  return (
    <View style = {styles.dropDownMenu}>
      <DropDownPicker
        multiple = 'true'
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
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
  );

}

const styles = StyleSheet.create({
   dropDownItems: {
     textAlign: 'left',
     padding: 10,
   },
   dropDownMenu: {
    width: 300,
    borderRadius: 10,
    color: '#eff7ff',
    marginVertical: 100,
   },
});

/*
itemStyle = {styles.dropDownItems}
                    defaultValue = {selectedValue}
                    onChangeItem = {(item) => setSelectedValue(item.value)}
                   dropDownStyle = {styles.dropDownMenu}
                    labelStyle= {{ color: 'blue' }}
                    arrowStyle= {{ marginRight: 10 }}
                    customArrowUp = {() => <Icon name="chevron-up" size={20} />}
                    customArrowDown = {() => <Icon name="chevron-down" size={20} />}
                    */

export default(DropDown);
