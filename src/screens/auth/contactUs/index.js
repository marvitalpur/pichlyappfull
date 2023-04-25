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
import { FormInput, AppButton, Header } from '../../../components';
import {publicRequest} from '../../../makeRequest';
import{showToast} from '../../../showToast';

const ContactUs = props => {
  const [state, setState] = useState({
    Name: '',
    email: '',
    subject: '',
    focus: '',
    yourMessage: '',
  });

  // console.log(state);
  const sendMessageHandler=async()=>{
    try{
      const obj={
        name:state.Name,
        email:state.email,
        subject:state.subject,
        message:state.yourMessage,
      }
      const res= await publicRequest.post('/contactUs',obj)
      showToast('success',res.data.message);
      props.navigation.replace('Auth',{screen:'havingTouble'})
    }
    catch(err){
      showToast('error',err?.response?.data?.message)
    }
  }

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
            onPress={() => props.navigation.navigate('Auth', { screen: 'login' })}
            press={() => props.navigation.goBack()}
          />
        </View>
        <View style={styles.screenBody}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Image
                source={Images.Pictures.profile}
                style={{ width: '100%', height: '100%' }}
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={styles.profileImageText}>Having Trouble?</Text>
            <Text style={styles.profileImageText2}>
              Share your problem with us
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabelName}>Name</Text>
            <View
              style={{
                marginVertical: 8,
                borderColor: state.focus === 'Name' ? '#707070' : null,
                borderWidth: state.focus === 'Name' ? 1 : 0,
                borderRadius: 5,
              }}>
              <FormInput
                value={state.Name}
                onChangeText={value => setState({ ...state, Name: value })}
                placeHolder="Enter Your Name"
                onFocus={() => setState({ ...state, focus: 'Name' })}
                onBlur={() => setState({ ...state, focus: '' })}
              />
            </View>
            <Text style={styles.inputLabelName}>Email</Text>
            <View
              style={{
                marginVertical: 8,
                borderColor: state.focus === 'email' ? '#707070' : null,
                borderWidth: state.focus === 'email' ? 1 : 0,
                borderRadius: 5,
              }}>
              <FormInput
                value={state.email}
                onChangeText={value => setState({ ...state, email: value })}
                placeHolder="Enter Your Email"
                onFocus={() => setState({ ...state, focus: 'email' })}
                onBlur={() => setState({ ...state, focus: '' })}
              />
            </View>
            <Text style={styles.inputLabelName}>Subject</Text>
            <View
              style={{
                marginVertical: 8,
                borderColor: state.focus === 'subject' ? '#707070' : null,
                borderWidth: state.focus === 'subject' ? 1 : 0,
                borderRadius: 5,
              }}>
              <FormInput
                value={state.subject}
                onChangeText={value => setState({ ...state, subject: value })}
                placeHolder="Your Subject"
                onFocus={() => setState({ ...state, focus: 'subject' })}
                onBlur={() => setState({ ...state, focus: '' })}
              />
            </View>

            <Text style={styles.inputLabelName}>Your Message</Text>
            <View
              style={{
                marginVertical: 8,
                borderColor: state.focus === 'yourMessage' ? '#707070' : null,
                borderWidth: state.focus === 'yourMessage' ? 1 : 0,
                borderRadius: 5,
              }}>
              <FormInput
                multiLine={true}
                height={150}
                value={state.yourMessage}
                onChangeText={value => setState({ ...state, yourMessage: value })}
                placeHolder="Explain Your Issue/Problem"
                onFocus={() => setState({ ...state, focus: 'yourMessage' })}
                onBlur={() => setState({ ...state, focus: '' })}
              />
            </View>
          </View>
          <View style={{ paddingVertical: 20, width: '100%' }}>
            <AppButton
              LinearColor1={'#5DF7B8'}
              LinearColor2={'#3109FB'}
              color={'white'}
              borderWidth={0.5}
              borderColor={'#707070'}
              backgroundColor={'#FFFFFF'}
              label="Submit"
              // onPress={() => {
              //   // props.navigation.replace('havingTouble')
              //   sendMessageHandler
              // }}
              onPress={sendMessageHandler}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  screenHeader: {
    width: '90%',
    height: 80,
    marginTop: 20,
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
  },
  profileImageContainer: {
    width: 82,
    height: 82,
    alignSelf: 'center',
  },

  profileImage: {
    width: 82,
    height: 82,
    borderRadius: 100,
    overflow: 'hidden',
  },
  profileImageText: {
    color: 'black',
    fontSize: 20,

    fontWeight: 'bold',
  },
  profileImageText2: {
    fontSize: 15,
    color: 'black',
  },

  inputContainer: {
    width: '100%',
    // height: 300,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLabelName: { alignSelf: 'flex-start', color: '#000000', fontSize: 14 },
});
