import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  BackHandler,
  hidden,
  statusBarStyle,
  statusBarTransition,
} from 'react-native';
import {Images} from '../../../constants';
import {AppButton, Header} from '../../../components';
import {useRoute} from '@react-navigation/native';
import {publicRequest} from '../../../makeRequest';
import {showToast} from '../../../showToast';
import {useSelector} from 'react-redux';

const height = Dimensions.get('window').height / 2.5;
const width = Dimensions.get('window').width;
const DeactivateAccount = ({navigation, route}) => {
  const user = useSelector(state => state.user.loggedInUser);

  const [state, setState] = useState({
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //     setTimeout(() => {
  //         navigation.replace('mainAuth');
  //     }, 1500);
  // }, []);

  // useEffect(() => {
  //     BackHandler.addEventListener('hardwareBackPress');
  //     return () => {
  //         BackHandler.removeEventListener('hardwareBackPress');
  //     };
  // }, []);

  // const [change, setchange] = useState
  const {changetext, text1} = route.params;
  // console.log(text1);
  // console.log(changetext)

  // const route = useRoute();
  const accountHandler = async () => {
    try {
      let res;
      setIsLoading(true);
      if (text1 == 'Delete Account') {
        res = await publicRequest.delete(
          `/deleteAccount/${user._id}/${state.password}`,
        );
        if (res.status == 200) {
          showToast('success', 'Account Deleted Successfully');
          setIsLoading(false);
          navigation.replace('Auth', {screen: 'login'});
        } else {
          showToast('error', 'Something went wrong');
          setIsLoading(false);
        }
      } else {
        res = await publicRequest.put(`/deactivateUser`, {
          userId: user._id,
          password: state.password,
        });
        if (res.status == 200) {
          setIsLoading(false);
          showToast('success', 'Account DeActivated Successfully');
          navigation.replace('Auth', {screen: 'login'});
        } else {
          showToast('error', 'Something went wrong');
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.log(err.response.data.message);
      showToast('error', err.response.data.message);
      setIsLoading(false);
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
            hiddinText
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={styles.ScreenBody}>
          <View style={{marginTop: 50}}>
            <View style={{width: 144, height: 144, alignSelf: 'center'}}>
              <Image
                source={Images.Icons.Key}
                resizeMode={'contain'}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View style={styles.texts}>
              <Text style={styles.headerText1}>{text1}</Text>
              <Text style={styles.headerText2}>Enter your password</Text>
            </View>

            <View style={styles.authButtonContainer}>
              <View style={{width: '100%'}}>
                <Text style={styles.Text}>Password</Text>
              </View>

              <View style={styles.inputView}>
                <View style={{}}>
                  <TextInput
                    value={state.password}
                    onChangeText={value => {
                      setState({...state, password: value});
                    }}
                    placeholder="***********"
                    secureTextEntry={true}
                    style={{paddingLeft: 20}}
                  />
                </View>
              </View>
              <View style={styles.authButton}>
                <AppButton
                  isLoading={isLoading}
                  LinearColor1={'#5DF7B8'}
                  LinearColor2={'#3109FB'}
                  color={'white'}
                  borderWidth={0.5}
                  borderColor={'#707070'}
                  backgroundColor={'#FFFFFF'}
                  label="Confirm"
                  //   onPress={() => navigation.replace('Auth', {screen: 'login'})}
                  onPress={accountHandler}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default DeactivateAccount;
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  screenHeader: {
    width: '90%',
    height: 50,
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
  ScreenBody: {
    width: '90%',
    height: '100%',
    alignSelf: 'center',
  },
  headerText1: {
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  headerText2: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
    marginVertical: 10,
  },

  texts: {
    fontWeight: '600',
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },

  Text: {
    textAlign: 'left',
    fontWeight: 'bold',
  },

  inputView: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 0.75,
    borderColor: '#707070',
    backgroundColor: '#E9EBEF',
  },
  authButtonContainer: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  authButton: {
    width: '90%',
    marginVertical: 10,
  },
});
