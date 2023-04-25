import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  hidden,
  statusBarStyle,
  statusBarTransition,
} from 'react-native';
import {Images} from '../../../constants';
import {FormInput, AppButton, Header} from '../../../components';
import {Icon} from 'native-base';
import {publicRequest} from '../../../makeRequest';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../../showToast';
const ForgetPassword = props => {
  const user = useSelector(state => state.user.loggedInUser);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    Name: '',
    email: '',
    subject: '',
    focus: '',
    yourMessage: '',
  });

  const emailSendHandler = async () => {
    try {
      setIsLoading(true);
      const res = await publicRequest.post('/sendemail', {email: state.email});
      if (res.status == 200) {
        setIsLoading(false);
        props.navigation.replace('forgetConfirm');
      } else {
        setIsLoading(false);
        showToast('error', 'Email not found');
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showToast('error', err.response.data.message);
    }
  };
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
        <View style={styles.screenHeader}>
          <Header
            BAckButton
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        </View>
        <View style={styles.screenBody}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Image
                source={Images.Logos.forgetPassword}
                style={{width: '100%', height: '100%'}}
              />
            </View>
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text
              style={{
                width: 138,
                height: 58,
                fontSize: 26,
                fontWeight: 'bold',
                marginTop: 20,
                color: '#000000',
                textAlign: 'center',
              }}>
              Forget Your Password?
            </Text>
            <Text
              style={{
                height: 41,
                fontSize: 15,
                marginTop: 20,
                color: '#000000',
                textAlign: 'center',
              }}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod
            </Text>
          </View>
          <View style={styles.inputContainer}>
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
                onChangeText={value => setState({...state, email: value})}
                placeHolder="Enter Your Email"
                onFocus={() => setState({...state, focus: 'email'})}
                onBlur={() => setState({...state, focus: ''})}
              />
            </View>
          </View>
          <View style={{paddingVertical: 20, width: '100%'}}>
            <AppButton
              onPress={emailSendHandler}
              isLoading={isLoading}
              LinearColor1={'#5DF7B8'}
              LinearColor2={'#3109FB'}
              color={'white'}
              borderWidth={0.5}
              borderColor={'#707070'}
              backgroundColor={'#FFFFFF'}
              label="Submit"
              // onPress={() => props.navigation.replace('forgetConfirm')}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default ForgetPassword;
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
    width: 135,
    height: 135,
    alignSelf: 'center',
  },

  profileImage: {
    width: 135,
    height: 152,
  },

  inputContainer: {
    width: '100%',
    // height: 300,
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLabelName: {alignSelf: 'flex-start', color: '#000000', fontSize: 14},
});
