import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import {Images} from '../../constants';

const Highlight = ({
  borderRadius,
  height,
  width,
  borderColor,
  borderWidth,
  imgWidth,
  imgHeight,
  imgName,
  onPress,
  navigation,
  text,
}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{
          width: width || 61,
          height: height || 61,
          borderRadius: borderRadius || 19,
          borderColor: borderColor || '#3729F2',
          borderWidth: borderWidth || 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: imgName}}
          style={{
            width: imgWidth,
            height: imgHeight,
            borderRadius: 20,
            borderWidth: 1,
          }}
        />
      </TouchableOpacity>
      <Text style={{marginTop: 5, color: '#4B4B4B', fontSize: 14}}>{text}</Text>
    </View>
  );
};

export {Highlight};

const styles = StyleSheet.create({});
