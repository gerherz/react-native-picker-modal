import React from "react";
import { Picker, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  stylableTextOverlay: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
})

const PickerModal = props => {
  return (
    <View>
      <View pointerEvents={'none'} style={[styles.stylableTextOverlay, props.style]}>
        <Text style={styles.text}>{props.selectedValue}</Text>
        <Icon name="arrow-drop-down" size={30} color="black" />
      </View>
      <Picker {...props} style={{opacity: 0}}>{props.children}</Picker>
    </View>
  )
};

export default PickerModal;
