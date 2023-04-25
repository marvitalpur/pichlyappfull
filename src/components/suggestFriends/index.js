import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import { Images, Themes } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';

const SuggestFriends = ({
  borderRadius,
  height,
  width,
  borderColor,
  borderWidth,
  imgWidth,
  imgHeight,
  imgName,
  text,
}) => {
  const [check, setcheck] = useState(true);
  return (
    <View
      style={{
        elevation: 3,
        width: 97,
        height: 127,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
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
            source={imgName}
            style={{ width: imgWidth, height: imgHeight }}
          />
        </TouchableOpacity>
        <Text style={{ marginTop: 5, color: '#4B4B4B', fontSize: 14 }}>
          {text}
        </Text>
      </View>
      <TouchableOpacity
        // onPress={() => //check ke condition lagani haaaa
        //   }
        onPress={() => setcheck(!check)}
        activeOpacity={0.7}
        style={{ width: '100%' }}>
        <LinearGradient
          start={{ x: 1.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.5 }}
          colors={
            check == true
              ? ['#4059E4', '#4059E4', '#4059E4', '#5DF7B8']
              : ['white', 'white']
          }
          style={{
            width: '80%',
            alignSelf: 'center',
            height: 20,
            justifyContent: 'center',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: check == true ? 'white' : 'black',
              borderWidth: check == true ? null : 1,
              textAlign: 'center',
              width: '100%',
              borderRadius: check == false ? 5 : 0,
              fontSize: check == true ? 14 : 13,
            }}>
            {check == true ? 'Follow' : 'UnFollow'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export { SuggestFriends };

const styles = StyleSheet.create({});
