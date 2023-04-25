import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
} from 'react-native';
import { Images } from '../../../constants';
import {
  FormInput,
  AppButton,
  Header,
  CheckBox,
  Policies,
  hidden, statusBarStyle, statusBarTransition
} from '../../../components';

const TermsAndCondition = props => {
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
        <View style={styles.screenHeader}>
          <Header
            BAckButton
            hiddinText
            text="Terms & Conditions"
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        </View>
        <View style={styles.screenBody}>
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <Policies
              termAndCondition
              fontSize={16}
              fontWeight={'400'}
              color={'#000000'}
              marginTop={10}
              text={
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. \n \nconsetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,\n \n sed diam nonumy eirmod tempo gubergren, no sea takimata sanctus est Lorem Lorem ipsum dolor sit amet,\n \n consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusa.'
              }
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default TermsAndCondition;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  screenHeader: {
    width: '90%',
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
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
    width: '90%',
    height: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    elevation: 4,
    borderRadius: 10
  },
});
