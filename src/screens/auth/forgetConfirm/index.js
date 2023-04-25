import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  hidden, statusBarStyle, statusBarTransition
} from 'react-native';
import { Images } from '../../../constants';
import { FormInput, AppButton, Header, Confirmation } from '../../../components';
import { Icon } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgetConfirm = props => {
  return (
    <ImageBackground
      style={styles.imageContainer}
      source={Images.Pictures.appBg}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar
          animated={true}
          backgroundColor="#000"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden} />

        <View style={styles.screenBody}>
          <View style={{ marginTop: 50, width: '100%' }}>
            <Confirmation
              text={'Password Reset Link Sent'}
              image={Images.Logos.done}
              text2={' Kindly Check Your Email @******@gmail.com'}
            />
          </View>

          <View style={{ paddingVertical: 20, width: '100%' }}>
            <AppButton
              LinearColor1={'#5DF7B8'}
              LinearColor2={'#3109FB'}
              color={'white'}
              borderWidth={0.5}
              borderColor={'#707070'}
              backgroundColor={'#FFFFFF'}
              label="Continue"
              onPress={() => props.navigation.replace('login')}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default ForgetConfirm;
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  screenHeader: {
    width: '90%',
    height: 80,
    marginTop: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headingText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  headingTextView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },

  screenBody: {
    width: '80%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
