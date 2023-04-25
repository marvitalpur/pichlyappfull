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
  statusBarStyle,
  hidden,
  statusBarTransition,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../../constants';
import {Box, Header, Row, Switch1} from '../../../components';
import FeaturedPost from '../FeaturedPost';
import {logOut} from '../../../redux/userRedux';
import {useDispatch, useSelector} from 'react-redux';
import {publicRequest} from '../../../makeRequest';

const Settings = props => {
  const user = useSelector(state => state.user.loggedInUser);
  const userDeviceToken = useSelector(state => state.user.deviceToken);

  const dispatch = useDispatch();
  const data = [
    {
      Image1: Images.Icons.Star,
      text2: 'Become Premium Member',
      Image2: Images.Icons.arrowforward,
      Press: () => props.navigation.navigate('premium'),
    },
    {
      Image1: Images.Icons.Document,
      text2: 'Your Featured Posts',
      Image2: Images.Icons.arrowforward,
      Press: () => props.navigation.navigate('getfeaturePost'),
    },
    {
      Image1: Images.Icons.Save,
      text2: 'Your Saved Posts',
      Image2: Images.Icons.arrowforward,
      Press: () => props.navigation.navigate('Homes', {screen: 'savedpost'}),
    },
    {
      Image1: Images.Icons.Account,
      text2: 'Account Settings',
      Image2: Images.Icons.arrowforward,
      Press: () => props.navigation.navigate('accountsettings'),
    },
    {
      Image1: Images.Icons.document2,
      text2: 'Privacy Policy',
      Image2: Images.Icons.arrowforward,
      Press: () => props.navigation.navigate('privacyPolicy'),
    },
    {
      Image1: Images.Icons.privacy,
      text2: 'Terms & Conditions',
      Image2: Images.Icons.arrowforward,
      Press: () => props.navigation.navigate('termsAndCondition'),
    },
    {
      Image1: Images.Icons.Logout,
      text2: 'Logout',
      // Image2: Images.Icons.arrowforward,

      Press: async () => {
        try {
          const res = await publicRequest.post('/removeToken', {
            userId: user?._id,
            token: userDeviceToken,
          });
          if (res.status == 200) {
            dispatch(logOut());
            props.navigation.navigate('Auth', {screen: 'login'});
          }
        } catch (err) {
          console.log('err', err.message);
        }
      },
    },
  ];
  return (
    <ImageBackground
      style={styles.imageContainer}
      source={Images.Pictures.appBg}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        ListHeaderComponent={() => (
          <>
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
                  text="Settings"
                  onPress={() => {
                    props.navigation.goBack();
                  }}
                />
              </View>
              <View style={styles.screenBody}>
                <FlatList
                  data={data}
                  renderItem={({item}) => {
                    return (
                      <>
                        <Row
                          Row2
                          Image1={item.Image1}
                          text2={item.text2}
                          Image2={item.Image2}
                          Press={item.Press}
                        />
                      </>
                    );
                  }}
                />
              </View>
            </View>
          </>
        )}
      />
    </ImageBackground>
  );
};
export default Settings;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  screenHeader: {
    width: '90%',
    height: 80,
    // marginTop: 20,
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
    width: '90%',
    height: '100%',
    alignSelf: 'center',
  },
  // whitebox: {
  //     width: '90%',
  //     height: 774, borderRadius: 10,
  //     backgroundColor: '#fff',
  //     alignSelf: 'center',
  //     elevation: 2,
  //     // justifyContent: 'space-around'

  // },
});
