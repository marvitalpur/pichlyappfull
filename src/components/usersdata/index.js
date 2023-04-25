import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Appearance,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../constants';
import {Followbtn} from '../Followbtn';
import {Tooltip} from 'react-native-elements';
import {OverlayScreen} from '../overlay';
import {Overlay} from 'react-native-elements';
import {AppButton} from '../appButton';
import socket from '../../socket';
import {updateUser} from '../../redux/userRedux';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {publicRequest} from '../../makeRequest';
const UserData = ({
  navigation,
  Image1,
  BoldText,
  LighterText,
  marginTop,
  marginLeft,
  User,
  Bio,
  UserName,
  UserEmail,
  Post,
  Followers,
  Following,
  Bios,
  Contact,
  Email,
  Location,
  pressme,
  onPress1,
  onPress2,
  threebtn,
  Bios1,
  Contact1,
  Email1,
  Location1,
  editoption,
  premiumicon,
  press1,
  press2,
  hideEmail,
  hidePhoneNo,
  params,
  user,
  setFollowUser,
  followUser,
}) => {
  // console.log('p', params);

  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.user.loggedInUser);
  const [state, setState] = useState('follow');
  const [colorState, setColorsate] = useState(true);
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [buttonHandle, setButtonHandle] = useState(false);
  const [event, setEvent] = useState(false);
  const [messageState, setMessageState] = useState(false);
  const isfocused = useIsFocused();

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const Click = () => {
    setState('Unfollow');
    setColorsate('#000');
  };

  const handleFollowUser = () => {
    socket.emit('follow', {userId: user._id, followId: params?._id});
    setButtonHandle(!buttonHandle);
  };
  useEffect(() => {
    socket.off('follow').on('follow', data => {
      const obj = {...data.data.user, token: user?.token};
      dispatch(updateUser(obj));
      // console.log('ss', {...data.data.follower});
    });
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        let res;
        if (params) {
          res = await publicRequest.get(`getUser/${params?._id}`);
        } else {
          res = await publicRequest.get(`getUser/${loggedUser._id}`);
          // const obj = {...res.data.data, token: loggedUser?.token};
          // dispatch(updateUser(obj));
        }
        setUserData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
    // console.log(buttonHandle);
  }, [buttonHandle]);

  const sendMessage = () => {
    try {
      socket.emit('createChatRoom', {
        myId: loggedUser._id,
        userId: params?._id,
      });
      // setMessageState(!messageState);
      socket.on('createChatRoom', data => {
        // console.log('data', data);
        navigation.navigate('Homes', {
          screen: 'chatscreen',
          params: {
            member: data.data.members.filter(
              item => item._id.toString() != loggedUser._id.toString(),
            ),
            members: data.data.members,
          },
        });
        // console.log('navigation', navigation);
      });
    } catch (err) {
      console.log(err);
    }
  };
  // useEffect(() => {
  //   try {
  //     console.log('called');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [messageState]);

  return (
    <>
      <View>
        {Bio && (
          <View>
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#FFF',
                height:
                  params == undefined || params?._id == user._id ? 350 : 270,
                // minHeight: 50,
                borderRadius: 20,
              }}>
              <View style={styles.profilerow}>
                <View style={{flexDirection: 'row', width: '90%'}}>
                  <View style={{width: 70, height: 70}}>
                    <Image
                      source={Image1}
                      resizeMode="contain"
                      style={{width: '100%', height: '100%', borderRadius: 100}}
                    />
                  </View>
                  <View style={styles.userInfo}>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 10,
                          marginLeft: -10,
                        }}>
                        <View>
                          <Text style={styles.UserName}>{UserName}</Text>
                          <Text style={{fontSize: 12}}>{UserEmail}</Text>
                        </View>
                        {premiumicon && (
                          <View style={{alignSelf: 'flex-end'}}>
                            <Tooltip
                              containerStyle={{
                                width: 120,
                                height: 80,
                                shadowColor: '#000',
                                shadowOffset: {
                                  width: 0,
                                  height: 3,
                                },
                                shadowOpacity: 0.27,
                                shadowRadius: 4.65,

                                elevation: 6,
                                flexDirection: 'row',
                              }}
                              backgroundColor="#fff"
                              withPointer={true}
                              popover={
                                <View
                                  style={{
                                    width: 280,
                                    height: 140,
                                    backgroundColor: '#fff',
                                    elevation: 5,
                                    borderRadius: 10,
                                  }}>
                                  <Text
                                    style={{
                                      marginVertical: 2,
                                      padding: 5,
                                      color: '#000',
                                      fontWeight: 'bold',
                                    }}>
                                    Premium Account
                                  </Text>
                                  <Text
                                    style={{
                                      marginVertical: 2,
                                      padding: 6,
                                      color: '#000',
                                    }}>
                                    Lorem ipsum dolor sit amet, consetetur
                                    sadipscing elitr, sed diam nonumy eirmod
                                    tempor invidunt ut labore et dolore magna
                                    aliquyam erat, sed diam voluptua.
                                  </Text>
                                </View>
                              }>
                              <View activeOpacity={0.8} style={{}}>
                                <View style={styles.premiumicon}>
                                  <Image
                                    source={Images.Icons.premium}
                                    resizeMode="contain"
                                    style={{width: '100%', height: '100%'}}
                                  />
                                </View>
                              </View>
                            </Tooltip>
                          </View>
                        )}
                      </View>
                      <View style={styles.followerText}>
                        <View style={{marginTop: marginTop || -10}}>
                          <Text style={styles.UserPostNumber}>{Post}</Text>
                          <Text style={styles.UserPost}>Post</Text>
                        </View>
                        <TouchableOpacity
                          onPress={onPress1}
                          style={{
                            marginLeft: marginLeft || 12,
                            marginTop: marginTop || -10,
                          }}>
                          <Text style={styles.UserPostNumber}>
                            {/* {followUser
                              ? followUser?.followers?.length >= 0
                                ? followUser?.followers?.length
                                : loggedUser?.followers?.length
                              : loggedUser?.followers?.length} */}
                            {userData?.followers
                              ? userData?.followers?.length
                              : Followers}
                          </Text>
                          <Text style={styles.UserPost}>Followers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={onPress2}
                          activeOpacity={0.1}
                          style={{
                            marginLeft: marginLeft || 12,
                            marginTop: marginTop || -10,
                          }}>
                          <Text style={styles.UserPostNumber}>
                            {/* {followUser
                              ? !followUser?.followings?.length >= 0
                                ? loggedUser?.followings?.length
                                : followUser?.followings?.length
                              : loggedUser?.followings?.length} */}
                            {Following}
                            {/* {loggedUser?.followings?.length} */}
                          </Text>
                          <Text style={styles.UserPost}>Followings</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>

                {editoption && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={pressme}
                    style={{width: '10%'}}>
                    <LinearGradient
                      start={{x: 1, y: 0.0}}
                      end={{x: 1, y: 1.9}}
                      colors={['#5DF7B8', '#3109FB']}
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: 10,
                      }}>
                      <Icon
                        type="FontAwesome"
                        name="edit"
                        color="#fff"
                        size={22}
                        style={{margin: 4}}
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
              <View style={{width: '90%', alignSelf: 'center', height: '40%'}}>
                <View>
                  <Text style={styles.Bios}>Bio</Text>
                  {Bios ? (
                    <Text numberOfLines={5} style={styles.Descriprion}>
                      {Bios}
                    </Text>
                  ) : (
                    <Text style={styles.Descriprion}>{'Add Bio..'}</Text>
                  )}
                </View>
                {params == undefined ? (
                  <>
                    <View>
                      <Text style={styles.Bios}>{Contact1}</Text>
                      {hidePhoneNo ? (
                        <Text style={styles.Descriprion}>{'*********'}</Text>
                      ) : (
                        <Text style={styles.Descriprion}>{Contact}</Text>
                      )}
                    </View>
                    <View>
                      <Text style={styles.Bios}>{Email1}</Text>
                      {hideEmail ? (
                        <Text style={styles.Descriprion}>{'************'}</Text>
                      ) : (
                        <Text style={styles.Descriprion}>{Email}</Text>
                      )}
                    </View>
                    <View>
                      <Text style={styles.Bios}>{Location1}</Text>
                      {Location ? (
                        <Text style={styles.Descriprion}>{Location}</Text>
                      ) : (
                        <Text style={styles.Descriprion}>{'Add Location'}</Text>
                      )}
                    </View>
                  </>
                ) : params?._id == user._id ? (
                  <>
                    <View>
                      <Text style={styles.Bios}>{Contact1}</Text>
                      {hidePhoneNo ? (
                        <Text style={styles.Descriprion}>{'*********'}</Text>
                      ) : (
                        <Text style={styles.Descriprion}>{Contact}</Text>
                      )}
                    </View>
                    <View>
                      <Text style={styles.Bios}>{Email1}</Text>
                      {hideEmail ? (
                        <Text style={styles.Descriprion}>{'************'}</Text>
                      ) : (
                        <Text style={styles.Descriprion}>{Email}</Text>
                      )}
                    </View>
                    <View>
                      <Text style={styles.Bios}>{Location1}</Text>
                      {Location ? (
                        <Text style={styles.Descriprion}>{Location}</Text>
                      ) : (
                        <Text style={styles.Descriprion}>{'Add Location'}</Text>
                      )}
                    </View>
                  </>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <View style={{width: '30%'}}>
                      <AppButton
                        onPress={handleFollowUser}
                        LinearColor2={
                          loggedUser?.followings?.includes(params?._id)
                            ? '#FFFFFF'
                            : '#5DF7B8'
                        }
                        LinearColor1={
                          loggedUser?.followings?.includes(params?._id)
                            ? '#FFFFFF'
                            : '#3109FB'
                        }
                        color={
                          loggedUser?.followings?.includes(params?._id)
                            ? 'black'
                            : 'white'
                        }
                        height={30}
                        borderRadius={5}
                        borderWidth={0.5}
                        borderColor={'#707070'}
                        backgroundColor={'#FFFFFF'}
                        label={
                          loggedUser?.followings?.includes(params._id)
                            ? 'Unfollow'
                            : 'Follow'
                        }
                      />
                    </View>
                    <View style={{width: '30%'}}>
                      <AppButton
                        onPress={() => sendMessage()}
                        color={'black'}
                        height={30}
                        borderRadius={5}
                        borderWidth={0.5}
                        borderColor={'#A9A9A9'}
                        backgroundColor={'#FFFFFF'}
                        label="Message"
                      />
                    </View>
                    <View style={{width: '30%'}}>
                      <AppButton
                        onPress={() => console.log('hey')}
                        color={'black'}
                        height={30}
                        borderRadius={5}
                        borderWidth={0.5}
                        borderColor={'#A9A9A9'}
                        backgroundColor={'#FFFFFF'}
                        label="Contact"
                      />
                    </View>
                  </View>
                )}
              </View>

              {threebtn && (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignSelf: 'center',
                    justifyContent: 'space-around',
                  }}>
                  <View
                    style={{
                      width: '31%',
                      top: -5,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      height: 35,
                      justifyContent: 'center',
                    }}>
                    <Followbtn
                      borderWidth={0.75}
                      width="100%"
                      color1="#eee"
                      color2="#eee"
                      color3="#000"
                      color4="#000"
                      User
                      follow="follow"
                      unfollow="Unfollow"
                    />
                  </View>
                  <TouchableOpacity
                    onPress={press1}
                    style={{
                      borderWidth: 1,
                      width: '31%',
                      height: 30,
                      borderRadius: 5,
                      justifyContent: 'center',
                    }}>
                    <Text style={{textAlign: 'center', color: '#000'}}>
                      Message
                    </Text>
                  </TouchableOpacity>

                  <View></View>
                  <TouchableOpacity
                    onPress={toggleOverlay}
                    style={{
                      borderWidth: 1,
                      width: '31%',
                      height: 30,
                      borderRadius: 5,
                      justifyContent: 'center',
                    }}>
                    <Text style={{textAlign: 'center', color: '#000'}}>
                      Contact
                    </Text>
                    <Overlay
                      isVisible={visible}
                      onBackdropPress={toggleOverlay}>
                      <View style={{width: 280, height: 267, borderRadius: 20}}>
                        <Text style={styles.headertext}>Contact</Text>
                        <View style={styles.contentView}>
                          <Text style={styles.headertext1}>Call</Text>
                          <Text style={styles.lighterText}>+12345697832</Text>
                          <Text style={styles.headertext1}>Email</Text>
                          <Text style={styles.lighterText}>
                            user123@mail.com
                          </Text>
                          <Text style={styles.headertext1}>Location</Text>
                          <Text style={styles.lighterText}>
                            Lorem ipsum dolor sit.
                          </Text>
                        </View>
                      </View>
                    </Overlay>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export {UserData};

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
    alignSelf: 'center',
  },
  whitebox: {
    width: '90%',
    height: '80%',
    // minHeight: 200,
    // maxHeight: 250,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    elevation: 2,
  },

  premiumicon: {
    width: 110,
    height: 65,
    // marginRight: 80
  },
  Image1: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  textbox: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  txt1: {
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  txt2: {
    marginVertical: 5,
    color: '#000',
    fontSize: 12,
  },
  rowstyle: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 5,
    padding: 4,
    paddingVertical: 10,
    // borderBottomWidth: 0.70,
    // borderBottomColor: '#aaa',
    flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  texts: {
    flexDirection: 'row',
    width: '74%',
  },
  btns: {
    width: 91,
    height: 25,
  },
  Pictures: {
    width: 38,
    height: 38,
  },
  textes: {
    justifyContent: 'center',
    marginLeft: 7,
    marginTop: -7,
  },
  profilerow: {
    marginVertical: 15,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Profilepic: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },

  userInfo: {
    marginLeft: 20,
  },
  UserName: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  UserEmail: {},
  followerText: {
    flexDirection: 'row',
    marginTop: -10,
  },
  UserPostNumber: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  UserPost: {
    alignSelf: 'center',
    fontSize: 10,
    letterSpacing: 0.7,
    color: '#000',
    // marginLeft: 20
  },
  Bios: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
  Descriprion: {
    fontSize: 14,
    color: '#000',
    marginVertical: 2,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  btnw: {fontWeight: 'bold', color: 'black'},

  profilerow: {
    marginVertical: 15,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Profilepic: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },

  userInfo: {
    marginLeft: 20,
  },
  UserName: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  UserEmail: {
    marginVertical: 2,
  },
  followerText: {
    flexDirection: 'row',
  },
  UserPostNumber: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  UserPost: {
    alignSelf: 'center',
    fontSize: 10,
    letterSpacing: 0.7,
    color: '#000',
    // marginLeft: 20
  },
  Bios: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  Descriprion: {
    fontSize: 12,
    color: '#000',
    marginVertical: 2,
    letterSpacing: 1,
  },
  overlayStyles: {
    width: '90%',
    height: 267,
    // backgroundColor: '#eae',
    borderRadius: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  headertext: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  contentView: {
    width: '80%',
    alignSelf: 'center',
    // marginVertical: 5
  },
  headertext1: {
    // marginTop: 30,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
    marginTop: 15,
    // marginVertical: 5
  },
  lighterText: {
    // fontWeight: 'bold',
    fontSize: 14,
    // marginVertical: 5
  },
});
