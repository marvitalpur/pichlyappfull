import React, {useState} from 'react';
import {useEffect} from 'react';
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
} from 'react-native';
import {Images} from '../../../constants';
import {AppButton} from '../../../components';
import {useSelector} from 'react-redux';
import {publicRequest} from '../../../makeRequest';

const height = Dimensions.get('window').height / 2.5;
const width = Dimensions.get('window').width;
const Splash = ({navigation}) => {
  const user = useSelector(state => state.user.loggedInUser);
  const [isPortrait, setIsPortrait] = React.useState(true);
  const [state, setState] = useState(false);

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setIsPortrait(
        Dimensions.get('window').height > Dimensions.get('window').width,
      );
    });
  }, []);
  // useEffect(() => {
  //   // setTimeout(()=>{
  //   const checkUser = async () => {
  //     if (user) {
  //       let token = user?.token;

  //       try {
  //         console.log(res);
  //         console.log('hhhhhhhhhhhhhhhhhhhhhhh>>>>');
  //         let data = {token};
  //         const res = await publicRequest.post('/checkuser', data);
  //         if (res.status === 200) {
  //           setState(true);
  //           navigation.replace('MyTabs', {screen: 'Home'});
  //         } else {
  //           // navigation.replace('login');
  //           setState(false);
  //         }
  //       } catch (err) {
  //         // navigation.replace('login');
  //         setState(false);
  //       }
  //     }
  //   };
    
  //   checkUser();
  //   // },1000);
  // }, [navigation.isFocused()]);

  return (
    <ImageBackground
      style={styles.imageContainer}
      source={Images.Pictures.appBg}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />

        <View style={styles.screenBody}>
          <View style={styles.screenHeader}>
            <Text style={styles.headerText1}>
              BEST APP FOR SOCIAL & PRODUCTS BUY & SALE
            </Text>
            <Text style={styles.headerText2}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            </Text>
          </View>
          <View style={[styles.connect]}>
            <ImageBackground
              resizeMode="contain"
              style={styles.connectImg}
              source={Images.Logos.connect}>
              <Image
                source={Images.Logos.appLogo}
                resizeMode={'contain'}
                style={{width: '50%'}}
              />
            </ImageBackground>
          </View>
          {/* {!state && ( */}
            <View style={styles.authButtonContainer}>
              <View style={styles.authButton}>
                <AppButton
                  LinearColor1={'#FFFFFF'}
                  LinearColor2={'#FFFFFF'}
                  color={'black'}
                  backgroundColor={'#FFFFFF'}
                  borderColor={'#707070'}
                  borderWidth={0.5}
                  label="Log In"
                  onPress={() => navigation.navigate('login')}
                />
              </View>
              <View style={styles.authButton}>
                <AppButton
                  LinearColor1={'#5DF7B8'}
                  LinearColor2={'#3109FB'}
                  color={'white'}
                  borderWidth={0.5}
                  borderColor={'#707070'}
                  backgroundColor={'#FFFFFF'}
                  label="Sign Up"
                  onPress={() => navigation.navigate('signup')}
                />
              </View>
            </View>
          {/* )} */}
          <View style={styles.footerBtn}>
            <Text style={styles.footerText1}>Having trouble</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('contactUs')}>
              <Text style={styles.footerText2}>Contact us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  screenBody: {
    width: '85%',
    height: '100%',
    alignSelf: 'center',
    paddingBottom: 20,
  },
  connect: {
    width: 300,
    aspectRatio: 1,

    alignSelf: 'center',
    marginTop: 30,
  },
  connectImg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenHeader: {
    width: '100%',
    marginTop: 80,
  },
  headerText1: {fontSize: 22, fontWeight: 'bold', color: '#000000'},
  headerText2: {
    marginTop: 10,
    fontSize: 15,
    color: '#000000',
  },
  authButtonContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },

  authButton: {
    marginTop: 20,
    width: '100%',
    borderRadius: 10,
  },
  footerBtn: {
    height: 40,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  footerText1: {color: 'black', fontWeight: 'bold', fontSize: 16},
  footerText2: {
    fontSize: 16,
    color: '#4059E4',
    paddingLeft: 4,
    fontWeight: 'bold',
  },
});
