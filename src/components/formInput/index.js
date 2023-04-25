import React, {useState, useRef} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {Icon} from 'native-base';

const FormInput = ({
  value,
  placeHolder,
  placeHolderColor,
  onChangeText,
  onBlur,
  onFocus,
  secureText,
  iconR,
  iconRName,
  iconRType,
  iconL,
  iconLName,
  iconLType,
  borderC,
  styleL,
  styleI,
  styleR,
  iconColor,
  borderW,
  bgColor,
  onPressR,
  keyboardType,
  multiLine,
  backgroundColor,
  PhoneInput,
  Textarea,
  borderWidth,
  bioLength,
  height,
}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
        backgroundColor: bgColor || null,
        borderWidth: borderW,
        borderColor: borderC || null,
        backgroundColor: backgroundColor || '#E9EBEF',
        borderWidth: borderWidth || 0,
      }}>
      {iconL && (
        <View
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={iconLName}
            type={iconLType}
            style={styleL || {fontSize: 17, color: iconColor || '#3109FB'}}
          />
        </View>
      )}
      <TextInput
        maxLength={bioLength ? bioLength : null}
        style={
          styleI || {
            width: iconL && iconR ? '80%' : iconL ? '90%' : '100%',
            height: height || 50,
            paddingLeft: iconL ? 0 : 10,
            // multiLine: multiLine || false,

            textAlignVertical: multiLine ? 'top' : 'center',

            color: 'black',
            // height: '100%',
          }
        }
        value={value}
        placeholder={placeHolder}
        placeholderTextColor={placeHolderColor || 'grey'}
        onChangeText={onChangeText}
        onFocus={onFocus || null}
        onBlur={onBlur || null}
        secureTextEntry={secureText}
        multiline={multiLine}
        keyboardType={keyboardType || 'default'}
      />

      {iconR && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressR}
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={iconRName || 'eye-with-line'}
            type={iconRType || 'Entypo'}
            style={styleR || {fontSize: 17, color: iconColor || '#666666'}}
          />
        </TouchableOpacity>
      )}

      {Textarea && (
        <View style={{}}>
          <TextInput
            style={
              styleI || {
                width: iconL && iconR ? '80%' : iconL ? '90%' : '100%',
                // height: height || 50,
                // paddingLeft: iconL ? 0 : 10,
                multiLine: multiLine || true,

                textAlignVertical: multiLine ? 'top' : 'center',

                color: 'black',
                // height: '100%',
              }
            }
          />
        </View>
      )}
    </View>
  );
};

export {FormInput};
