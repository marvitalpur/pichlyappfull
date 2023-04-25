import {PhoneNumber} from 'google-libphonenumber';
import {Icon} from 'native-base';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  hidden,
  statusBarStyle,
  statusBarTransition,
} from 'react-native';
import {
  FormInput,
  AppButton,
  Header,
  NumInput,
  CheckBox,
} from '../../../components';
import {Images} from '../../../constants';
import {showToast} from '../../../showToast';
import {signUp} from '../../../apiCalls';
import ImagePicker from 'react-native-image-crop-picker';

const SignUp = props => {
  const [state, setState] = useState({
    firsttName: '',
    lastName: '',
    userName: '',
    profileImg: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    focus: '',
    agree: false,
    secureText: true,
    secureText2: true,
  });
  const [singleFile, setSingleFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // console.log(state);

  const selectFile = async () => {
    try {
      ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
        cropperCircleOverlay: true,
      })
        .then(image => {
          setSingleFile(image);
          setState({...state, profileImg: image});
        })
        .catch(err => {
          if (err.code === 'E_PICKER_CANCELLED') {
            showToast('error', 'image selection is cancelled');
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignup = () => {
    const {
      firsttName,
      lastName,
      userName,
      email,
      password,
      confirmPassword,
      profileImg,
      phone,
      agree,
    } = state;
    let img = {};
    if (singleFile) {
      img = {
        uri: profileImg?.path,
        type: profileImg?.mime,
        name: profileImg.name ? profileImg.name : 'profile',
      };
    }
    const formData = new FormData();
    formData.append('firstName', firsttName);
    formData.append('lastName', lastName);
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmpassword', confirmPassword);
    formData.append('phoneno', phone);
    singleFile && formData.append('profileImg', singleFile ? img : profileImg);
    const navigate = props.navigation.navigate;
    if (agree) {
      signUp(formData, navigate, setSingleFile, setIsLoading);
    } else {
      showToast('error', 'Please agree to terms and conditions');
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
            visibleText
            text="Sign Up"
            onPress={() => {
              props.navigation.goBack();
            }}
            // onPress={() => props.navigation.replace('splash')}
          />
        </View>
        <View style={styles.screenBody}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Image
                source={
                  singleFile ? {uri: singleFile.path} : Images.Pictures.profile
                }
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <TouchableOpacity
              onPress={selectFile}
              activeOpacity={0.6}
              style={styles.uploadButton}>
              <Icon name="plus" type="Feather" style={{fontSize: 18}} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabelName}>First Name</Text>
            <View
              style={{
                marginVertical: 8,
                borderColor: state.focus === 'firstName' ? '#707070' : null,
                borderWidth: state.focus === 'firstName' ? 1 : 0,
                borderRadius: 5,
              }}>
              <FormInput
                value={state.firsttName}
                onChangeText={value => setState({...state, firsttName: value})}
                placeHolder="Enter Your First Name"
                onFocus={() => setState({...state, focus: 'firstName'})}
                onBlur={() => setState({...state, focus: ''})}
              />
            </View>
            <Text style={styles.inputLabelName}>Last Name</Text>
            <View
              style={{
                marginVertical: 8,
                borderColor: state.focus === 'lastName' ? '#707070' : null,
                borderWidth: state.focus === 'lastName' ? 1 : 0,
                borderRadius: 5,
              }}>
              <FormInput
                value={state.lastName}
                onChangeText={value => setState({...state, lastName: value})}
                placeHolder="Enter Your Last Name"
                onFocus={() => setState({...state, focus: 'lastName'})}
                onBlur={() => setState({...state, focus: ''})}
              />
            </View>
            <Text style={styles.inputLabelName}>Username</Text>
            <View
              style={{
                marginVertical: 8,
                borderColor: state.focus === 'userName' ? '#707070' : null,
                borderWidth: state.focus === 'userName' ? 1 : 0,
                borderRadius: 5,
              }}>
              <FormInput
                value={state.userName}
                onChangeText={value => setState({...state, userName: value})}
                placeHolder="Enter Your Username"
                onFocus={() => setState({...state, focus: 'userName'})}
                onBlur={() => setState({...state, focus: ''})}
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
                onChangeText={value => setState({...state, email: value})}
                placeHolder="Enter Your Email"
                onFocus={() => setState({...state, focus: 'email'})}
                onBlur={() => setState({...state, focus: ''})}
              />
            </View>
            <Text style={styles.inputLabelName}>Password</Text>
            <View
              style={{
                marginVertical: 8,
                borderColor: state.focus === 'password' ? '#707070' : null,
                borderWidth: state.focus === 'password' ? 1 : 0,
                borderRadius: 5,
              }}>
              <FormInput
                value={state.password}
                onChangeText={value => setState({...state, password: value})}
                icon
                secureText={state.secureText}
                iconRName={state.secureText ? 'eye-with-line' : 'eye'}
                iconRType="Entypo"
                onPressR={() =>
                  setState({...state, secureText: !state.secureText})
                }
                placeHolder="Enter Your Password"
                onFocus={() => setState({...state, focus: 'password'})}
                onBlur={() => setState({...state, focus: ''})}
              />
            </View>

            <Text style={styles.inputLabelName}>Confirm Password</Text>
            <View
              style={{
                marginVertical: 8,
                borderColor:
                  state.focus === 'confirmPassword' ? '#707070' : null,
                borderWidth: state.focus === 'confirmPassword' ? 1 : 0,
                borderRadius: 5,
              }}>
              <FormInput
                value={state.confirmPassword}
                onChangeText={value =>
                  setState({...state, confirmPassword: value})
                }
                secureText={state.secureText}
                onPressR={() =>
                  setState({...state, secureText: !state.secureText})
                }
                placeHolder="Re-Enter Your Password"
                onFocus={() => setState({...state, focus: 'confirmPassword'})}
                onBlur={() => setState({...state, focus: ''})}
              />
            </View>
            <View style={{width: '100%', marginTop: -10}}>
              <CheckBox
                circle
                alignItem={'flex-start'}
                onPress={() => setState({...state, checked: !state.checked})}
                checked={state.checked}
                text={'Phone'}
                fontSize={16}
              />
            </View>
            {state.checked ? (
              <View
                style={{
                  marginTop: -5,
                  width: '100%',
                  height: 51,
                  marginVertical: 8,
                  borderColor: state.focus === 'phone' ? '#707070' : null,
                  borderWidth: state.focus === 'phone' ? 1 : 0,
                  borderRadius: 5,
                }}>
                <NumInput
                  setState={setState}
                  state={state}
                  onFocus={() => setState({...state, focus: 'phone'})}
                />
              </View>
            ) : null}
            <View style={styles.termView}>
              <View>
                <CheckBox
                  square
                  alignItem={'flex-start'}
                  onPress={() => setState({...state, agree: !state.agree})}
                  checked={state.agree}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: 'black'}}>I accept </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    props.navigation.navigate('Homes', {
                      screen: 'termsAndCondition',
                    });
                  }}>
                  <Text style={styles.termsPrivacy}>Terms & Conditions</Text>
                </TouchableOpacity>
                <Text style={{color: 'black'}}> & </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    props.navigation.navigate('Homes', {
                      screen: 'privacyPolicy',
                    });
                  }}>
                  <Text style={styles.termsPrivacy}> Privacy Policy</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{paddingVertical: 40, width: '100%'}}>
              <AppButton
                isLoading={isLoading}
                LinearColor1={'#5DF7B8'}
                LinearColor2={'#3109FB'}
                color={'white'}
                borderWidth={0.5}
                borderColor={'#707070'}
                backgroundColor={'#FFFFFF'}
                label="Sign Up"
                onPress={handleSignup}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            marginTop: -10,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 16}}>
            Already have an account?
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.navigate('login')}>
            <Text
              style={{
                color: '#4059E4',
                fontWeight: 'bold',
                fontSize: 16,
                paddingLeft: 5,
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 40,
            width: '100%',
            paddingBottom: 30,
          }}>
          <View style={styles.footerBtn}>
            <Text style={styles.footerText1}>Having trouble</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => props.navigation.navigate('contactUs')}>
              <Text style={styles.footerText2}>Contact us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  screenHeader: {
    width: '90%',
    height: 120,
    marginTop: 50,
    paddingBottom: 20,
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

  screenBody: {
    width: '90%',
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

  uploadButton: {
    width: 21,
    height: 21,
    position: 'absolute',
    bottom: 6,
    right: 6,
    borderRadius: 100,
    backgroundColor: '#E9EBEF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  inputContainer: {
    width: '100%',
    // height: 300,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLabelName: {alignSelf: 'flex-start', color: '#000000', fontSize: 14},
  termsPrivacy: {color: '#4059E4', fontSize: 15, fontWeight: 'bold'},
  termView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -10,
  },
  footerBtn: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText1: {color: 'black', fontSize: 16, fontWeight: '500'},
  footerText2: {
    fontSize: 16,
    color: '#4059E4',
    paddingLeft: 4,
    fontWeight: '500',
  },
});
