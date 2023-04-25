import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  StatusBar,
  Switch,
  FlatList,
  TouchableOpacity,
  hidden,
  statusBarStyle,
  statusBarTransition,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../../constants';
import {Box, Header, Switch1} from '../../../components';
import {Textarea} from 'native-base';

const AccountDeactivation = props => {
  const data = [
    {text: 'Posts'},
    {text: 'Stories'},

    {text: 'Comments & Mention'},

    {text: 'Following'},

    {text: 'Messages'},

    {text: 'Posts'},
  ];

  return (
    <ImageBackground
      style={styles.imageContainer}
      source={Images.Pictures.appBg}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <StatusBar
          animated={true}
          backgroundColor="#000"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <View style={{}}>
          <View style={styles.screenHeader}>
            <Header
              BAckButton
              hiddinText
              text="Account Deactivation"
              onPress={() => {
                props.navigation.goBack();
              }}
            />
          </View>
          <View style={styles.screenBody}>
            <View style={styles.whitebox}>
              <View>
                <View
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    paddingTop: 10,
                    marginVertical: 10,
                  }}>
                  <View style={{marginVertical: 5}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        color: '#000',
                        fontSize: 18,
                      }}>
                      Temporary Deactivation
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('deleteaccount', {
                          text1: 'Deactivate Account',
                          text2: `Are you sure to Deactivate your \n  your account`,
                        });
                      }}>
                      <Text
                        style={{
                          fontWeight: '500',
                          color: 'red',
                          marginVertical: 5,
                          fontSize: 18,
                        }}>
                        Deactivation
                      </Text>
                    </TouchableOpacity>

                    <Text
                      style={{
                        fontWeight: '400',
                        color: '#000',
                        marginVertical: 5,
                        fontSize: 16,
                      }}>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod.
                    </Text>
                  </View>
                  <View style={{marginVertical: 5, marginTop: 20}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        color: '#000',
                        fontSize: 18,
                      }}>
                      Permanent Delete Account
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('deleteaccount', {
                          text1: 'Delete Account',
                          text2: `Are you sure to Permamently Deleted your \n account`,
                          // Changetext: 'Delete Account'
                        });
                      }}>
                      <Text
                        style={{
                          fontWeight: '500',
                          color: 'red',
                          marginVertical: 5,
                          fontSize: 18,
                        }}>
                        Delete Account
                      </Text>
                    </TouchableOpacity>

                    <Text
                      style={{
                        fontWeight: '400',
                        color: '#000',
                        marginVertical: 5,
                        fontSize: 16,
                      }}>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default AccountDeactivation;
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 10,
  },

  screenHeader: {
    width: '90%',
    height: 80,
    // marginTop: 10,
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
    width: '100%',
    height: '100%',
    // alignSelf: 'center',
  },
  whitebox: {
    width: '90%',
    height: '80%',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    elevation: 2,
  },
});
