import React, {useState} from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import {Images} from '../../constants';

const Confirmation = ({text, text2, image}) => {
  return (
    <>
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImage}>
          <Image
            source={image}
            resizeMode={'contain'}
            style={{width: '100%', height: '100%'}}
          />
        </View>
      </View>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text
          style={{
            width: '80%',
            height: 70,
            fontSize: 26,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 20,
            color: '#000000',
          }}>
          {text}
        </Text>
        <Text
          style={{
            width: '80%',
            textAlign: 'center',
            height: 41,
            fontSize: 16,
            marginTop: 20,
            color: '#000000',
          }}>
          {text2}
        </Text>
      </View>
    </>
  );
};

export {Confirmation};

const styles = StyleSheet.create({
  profileImageContainer: {
    width: 135,
    height: 135,
    alignSelf: 'center',
  },

  profileImage: {
    width: 135,
    height: 135,
  },
});
