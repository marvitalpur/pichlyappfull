import React, {useState, useRef, useEffect} from 'react';
import {CheckBox as CheckBoxButton} from 'react-native-elements';
import {View, Text} from 'react-native';
const CheckBox = ({
  checked,
  checked1,
  onPress,
  text,
  alignItem,
  left,
  checkedColor,
  circle,
  square,
  fontSize,
}) => {
  return (
    <View
      style={{
        width: '100%',
        justifyContent: alignItem,
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: left ? -20 : -10,
      }}>
      {square && (
        <CheckBoxButton
          checkedColor={checkedColor || 'black'}
          size={20}
          checked={checked1 || checked}
          onPress={onPress}
        />
      )}
      {circle && (
        <CheckBoxButton
          checkedColor={checkedColor || '#3936EE'}
          size={20}
          checked={checked}
          onPress={onPress}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          uncheckedColor="#3936EE"
        />
      )}
      <Text
        style={{
          color: 'black',
          marginLeft: -18,
          fontSize: fontSize || 14,
          color: '#272626',
        }}>
        {text}
      </Text>
    </View>
  );
};
export {CheckBox};
