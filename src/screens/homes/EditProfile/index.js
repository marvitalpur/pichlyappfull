import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  ScrollView,
  Image,
  Switch,
  statusBarStyle,
  statusBarTransition,
  hidden,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {AppButton, FormInput, Header} from '../../../components';
import {Images} from '../../../constants';
import ImagePicker from 'react-native-image-crop-picker';
import {updateProfile} from '../../../apiCalls';
import {showToast} from '../../../showToast';

const EditProfile = ({onSwitch, navigation}) => {
  const user = useSelector(state => state.user.loggedInUser);
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(user?.hideEmail);
  const [isEnabled1, setIsEnabled1] = useState(user?.hidePhoneNo);
  const [isEnable, setIsEnable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleSwitchEmail = () => setIsEnabled(previousState => !previousState);
  const toggleSwitchContactNo = () =>
    setIsEnabled1(previousState => !previousState);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    userName: user?.userName,
    bio: user?.bio,
    email: user?.email,
    phoneno: user?.phoneno,
    hideEmail: false,
    hidePhoneNo: false,
    state: user?.state,
    city: user?.city,
    location: user?.location,
    profileImg: user?.profileImg,
  });

  useEffect(() => {
    setProfileData({
      firstName: user?.firstName,
      lastName: user?.lastName,
      userName: user?.userName,
      bio: user?.bio,
      email: user?.email,
      phoneno: user?.phoneno,
      hideEmail: user?.hideEmail,
      hidePhoneNo: user?.hidePhoneNo,
      state: user?.state,
      city: user?.city,
      location: user?.location,
      profileImg: user?.profileImg,
    });
  }, [user]);
  const selectImage = async () => {
    try {
      ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
        cropperCircleOverlay: true,
      })
        .then(image => {
          // console.log(image);
          setSelectedImage(image);
          // setState({...state, profileImg: image});
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

  const onUpdateProfileHandler = () => {
    const formData = new FormData();
    formData.append('firstName', profileData?.firstName);
    formData.append('email', profileData?.email);
    formData.append('hideEmail', isEnabled);
    formData.append('hidePhoneNo', isEnabled1);
    formData.append('bio', profileData?.bio ? profileData?.bio : '');
    formData.append(
      'userName',
      profileData?.userName ? profileData?.userName : '',
    );
    formData.append(
      'phoneno',
      profileData?.phoneno ? profileData?.phoneno : '',
    );
    formData.append('state', profileData?.state ? profileData?.state : '');
    formData.append('city', profileData?.city ? profileData?.city : '');
    formData.append(
      'location',
      profileData?.location ? profileData?.location : '',
    );
    if (selectedImage?.path) {
      formData.append('profileImg', {
        uri: selectedImage.path,
        name: selectedImage?.filename ? selectedImage.filename : 'profileImg',
        type: selectedImage.mime,
      });
    }
    updateProfile(
      formData,
      user._id,
      user.token,
      setSelectedImage,
      dispatch,
      setIsLoading,
    );
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
        <View style={{}}>
          <View style={styles.screenHeader}>
            <Header
              BAckButton
              hiddinText
              text="Edit Profile"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
          <View style={styles.screenBody}>
            <View style={styles.whitebox}>
              <View style={styles.Pictures}>
                <View style={styles.profile}>
                  <Image
                    source={
                      selectedImage?.path
                        ? {uri: selectedImage?.path}
                        : profileData?.profileImg
                        ? {uri: profileData?.profileImg}
                        : Images.Pictures.profile1
                    }
                    // source={{uri: selectedImage?.path}}
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 100,
                    }}
                  />
                </View>
                <View style={{alignSelf: 'center'}}>
                  <TouchableOpacity onPress={selectImage}>
                    <Text style={styles.changeProfileText}>
                      Change Profile Picture
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{width: '90%', alignSelf: 'center'}}>
                  <Text style={styles.UserName}>Display Name</Text>
                  <FormInput
                    value={profileData?.firstName}
                    onChangeText={value => {
                      setProfileData({...profileData, firstName: value});
                    }}
                    placeHolder="Display Name"
                  />
                  <Text style={styles.UserName}>User Name</Text>
                  <FormInput
                    value={profileData.userName}
                    onChangeText={value => {
                      setProfileData({...profileData, userName: value});
                    }}
                    placeHolder="User Name"
                  />
                  <Text style={styles.UserName}>Bio</Text>
                  <FormInput
                    bioLength={150}
                    value={profileData?.bio}
                    onChangeText={value => {
                      setProfileData({...profileData, bio: value});
                    }}
                    multiLine
                    height={124}
                    // placeHolder="Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy
                    //                 Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero
                    //                  Eos Et Accusam Et Justo."
                    placeHolder="biography"
                  />

                  <Text style={styles.UserName}>Email</Text>
                  <View style={styles.profilerow}>
                    <View style={{width: '85%'}}>
                      <FormInput
                        value={profileData?.email}
                        onChangeText={value => {
                          setProfileData({...profileData, email: value});
                        }}
                        // secureText={isEnabled === true ? true : false}
                        placeHolder="email"
                      />
                    </View>
                    <View>
                      <Switch
                        disabled={false}
                        value={isEnabled}
                        onValueChange={toggleSwitchEmail}
                        onChange={onSwitch}
                        trackColor={{
                          true: '#3109FB',
                          false: '#C2C2C2',
                        }}
                        thumbColor={'#FFFFFF'}
                        size="lg"
                      />
                      <Text style={{fontSize: 10, textAlign: 'center'}}>
                        {isEnabled === true ? 'Unhide' : 'Hide'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.UserName}>Contact No.</Text>
                  <View style={styles.profilerow}>
                    <View style={{width: '85%'}}>
                      <FormInput
                        value={profileData?.phoneno.toString()}
                        onChangeText={value => {
                          setProfileData({...profileData, phoneno: value});
                        }}
                        // secureText={isEnabled1 === true ? true : false}
                        placeHolder="contact no."
                      />
                    </View>
                    <View>
                      <Switch
                        disabled={false}
                        value={isEnabled1}
                        onValueChange={toggleSwitchContactNo}
                        onChange={onSwitch}
                        trackColor={{
                          true: '#3109FB',
                          false: '#C2C2C2',
                        }}
                        thumbColor={'#FFFFFF'}
                        size="lg"
                      />
                      <Text style={{fontSize: 10, textAlign: 'center'}}>
                        {isEnabled1 === true ? 'Unhide' : 'Hide'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.UserName}>State</Text>
                  <FormInput
                    value={profileData?.state}
                    onChangeText={value => {
                      setProfileData({...profileData, state: value});
                    }}
                    placeHolder="state"
                  />
                  <Text style={styles.UserName}>City</Text>
                  <FormInput
                    value={profileData?.city}
                    onChangeText={value => {
                      setProfileData({...profileData, city: value});
                    }}
                    placeHolder="city"
                  />
                  <Text style={styles.UserName}>
                    Business Location (Optional)
                  </Text>
                  <FormInput
                    value={profileData?.location}
                    onChangeText={value => {
                      setProfileData({...profileData, location: value});
                    }}
                    placeHolder="location"
                  />
                </View>
              </View>
              <View
                style={{
                  width: '80%',
                  alignSelf: 'center',
                  marginVertical: 10,
                  marginTop: 5,
                }}>
                <AppButton
                  isLoading={isLoading}
                  onPress={onUpdateProfileHandler}
                  LinearColor1={'#5DF7B8'}
                  LinearColor2={'#3109FB'}
                  color={'white'}
                  borderWidth={0.5}
                  borderColor={'#707070'}
                  backgroundColor={'#FFFFFF'}
                  label="Update"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default EditProfile;

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
    width: '100%',
    height: '100%',
    // alignSelf: 'center',
  },
  whitebox: {
    width: '90%',
    // height: '80%',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    elevation: 2,
  },
  Pictures: {
    marginVertical: 25,
  },
  profile: {
    width: 103,
    height: 103,
    alignSelf: 'center',
  },

  changeProfileText: {
    textAlign: 'center',
    color: 'blue',
    alignSelf: 'center',
    marginVertical: 5,
  },
  UserName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    marginVertical: 10,
  },
  profilerow: {
    flexDirection: 'row',
  },

  // imageContainer: {
  //     flex: 1,
  //     justifyContent: 'center',
  // },

  // screenHeader: {
  //     width: '90%',
  //     height: 80,
  //     marginTop: 20,
  //     alignSelf: 'center',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  // },

  // headingText: {
  //     fontSize: 24,
  //     color: 'black',
  //     fontWeight: 'bold',
  //     letterSpacing: 0.5,
  // },
  // headingTextView: {
  //     width: '100%',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     marginTop: 40,
  // },
  // screenBody: {
  //     width: '100%',
  //     height: '100%',
  //     // alignSelf: 'center',

  // },
  // whitebox: {
  //     width: '90%',
  //     height: '80%',
  //     borderRadius: 10,
  //     backgroundColor: '#fff',
  //     alignSelf: 'center',
  //     elevation: 2,
  // },
  // Pictures: {

  //     marginVertical: 25

  // },
  // profile: {
  //     width: 103, height: 103,
  //     alignSelf: 'center'
  // },

  // changeProfileText: {
  //     textAlign: 'center',
  //     color: 'blue',
  //     alignSelf: 'center',
  //     marginVertical: 5

  // },
  // UserName: {
  //     fontSize: 16, color: '#000',
  //     fontWeight: '400', marginVertical: 10

  // },
  // profilerow: {
  //     flexDirection: 'row'
  // }
});
