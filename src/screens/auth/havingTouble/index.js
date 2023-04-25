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

const HavingTouble = props => {
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
        <View style={styles.ScreenBody}>
          <View style={{ marginTop: 50, width: '100%' }}>
            <Confirmation
              text={'Thank You \n For Contacting Us'}
              image={Images.Logos.done}
              text2={'You will receive a reply from us soon'}
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
export default HavingTouble;
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  screenHeader: {
    width: '90%',
    height: 50,
    marginTop: 30,
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
  ScreenBody: {
    marginTop: 100,
    width: '80%',
    height: '100%',
    alignSelf: 'center',
  },
  headerText1: {
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 10
  },
  headerText2: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
    marginVertical: 10
  },


  screenBody: {
    width: '80%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
