import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Appearance,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  statusBarStyle,
  statusBarTransition,
  hidden,
} from 'react-native';

// import {
//   GifSearch,
//   poweredByTenorLogoWhite,
//   poweredByTenorLogoGrey,
//   poweredByTenorLogoBlue,
//   viaTenorLogoWhite,
//   viaTenorLogoGrey,
//   viaTenorLogoBlue,
//   poweredByGiphyLogoGrey,
//   poweredByGiphyLogoWhite,
// } from 'react-native-gif-search';

import React from 'react';
import {Icon} from 'native-base';
import {Images} from '../../../constants';
import {useState, useEffect} from 'react';
import Headerchat from '../../../components/Headerchat';
// import {Tip, TrackPlayerComponent} from '../../../components';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import socket from '../../../socket';
import {useSelector} from 'react-redux';
import {showToast} from '../../../showToast';
import {useIsFocused} from '@react-navigation/native';
import {Modal} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import {MessagesScreen} from '../../../components';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {publicRequest, userRequest} from '../../../makeRequest';
import {BackHandler} from 'react-native';
// import {FlatList} from 'react-native';
import {FlatList} from 'react-native-bidirectional-infinite-scroll';

const audioRecorderPlayer = new AudioRecorderPlayer();

const ChatScreen = props => {
  const user = useSelector(state => state.user.loggedInUser);
  const member = props?.route?.params?.member;
  const members = props?.route?.params?.members;
  const setRoom = props?.route.params?.setRoom;
  const room = props?.route.params?.room;
  const setRoom1 = props?.route.params?.setRoom1;

  const [messageCameraData, setMessageCameraData] = useState('');
  const [message, setMessage] = useState('');
  const [orientation, setOrientation] = useState(true);
  let [scrollViewRef, setRef] = useState({});
  let colorScheme = Appearance.getColorScheme();
  const [start, setStart] = useState(-20);
  const [end, setend] = useState(-10);

  const [Visible, setVisible] = useState(true);
  const [chat, setChat] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [buttonHandle, setButtonHandle] = useState(false);
  const [modalData, setModalData] = useState('');
  const [state, setState] = useState({
    recordSecs: 0,
    recordTime: '00:00',
    milliSecs: 0,
  });

  const backPressed = () => {
    if (props?.navigation?.isFocused()) {
      console.log('navigation go back');
      let arr = members[0]._id + members[1]._id;
      socket.emit('leaveChat', {room: arr, user: user._id});
      props?.navigation.goBack();
      return true;
    } else {
      return false;
    }
  };
  let backHandler;
  props?.navigation?.addListener('focus', () => {
    backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backPressed,
    );
  });
  const pickerGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
      // cropping: true,
    }).then(async image => {
      // setimg(image.path);
      console.log(image);
      const formData = new FormData();
      image.map(item => {
        formData.append('content', {
          uri: item.path,
          type: item.mime,
          name: 'content',
        });
      });
      console.log(formData);
      try {
        const res = await userRequest('post', '/saveFiles', formData);

        // console.log('res', res.data.data);
        setMessageCameraData([...res.data.data]);
      } catch (err) {
        console.log(err.message);
      }
      setVisible(true);
    });
  };
  const pickerCamera = () => {
    // ImagePicker.openCamera({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then(image => {
    //   // setimg(image.path);
    //   console.log('image', image);
    //   setCameraData(image);
    props?.navigation.navigate('Homes', {
      screen: 'camerastorie',
      params: {
        message: 'true',
        messageCameraData: messageCameraData,
        setMessageCameraData: setMessageCameraData,
        member: props?.route?.params?.member,
        members: props?.route?.params?.members,
      },
    });
    //   setVisible(true);
    // });
  };

  const onStartRecord = async () => {
    // console.log('onStartRecord');
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      // setState({
      //   ...state,
      //   recordSecs: e.currentPosition,
      //   recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      //   milliSec: Math.floor(e.currentPosition),
      // });
      console.log('Recording . . . ', e.currentPosition);
      return;
    });
  };

  const onStopRecord = async () => {
    console.log('onStopRecord');
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    // setState({
    //   ...state,
    //   recordSecs: 0,
    //   recordTime: '00:00',
    // });
    console.log('Recording stopped', result);

    const form = new FormData();
    form.append('content', {
      uri: result,
      type: 'audio/mp3',
      name: 'audio',
    });
    form.append('type', 'audio');
    if (form) {
      try {
        const res = await userRequest('post', '/saveFile', form);
        console.log('audio', res.data.data);
        setMessageCameraData(res.data.data);
      } catch (error) {
        showToast('error', error.message);
      }
    }
  };

  const deleteRecord = async () => {
    // console.log('deleteRecord');
    setSendIcon(false);
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setState({
      ...state,
      recordSecs: 0,
      recordTime: '00:00',
    });
    // console.log('delete record');
  };

  useEffect(() => {
    console.log('message camera data', messageCameraData);
    if (messageCameraData.length > 0) {
      messageCameraData.map(item => {
        onSend(item?.type, item?.message);
      });
    } else if (messageCameraData) {
      onSend(messageCameraData?.type, messageCameraData?.message);
    }
  }, [messageCameraData]);

  const Gif = () => {
    // <GifSearch
    //   // tenorApiKey={YOUR_TENOR_API_KEY}
    //   gifsToLoad={10}
    //   maxGifsToLoad={25}
    //   style={{backgroundColor: 'white', borderWidth: 3, borderRadius: 10}}
    //   textInputStyle={{fontWeight: 'bold', color: 'black'}}
    //   gifListStyle={{height: 320}}
    //   gifStyle={{height: 160}}
    //   loadingSpinnerColor={'black'}
    //   placeholderTextColor={'grey'}
    //   placeholderText={'Search'}
    //   onGifSelected={(gif_url, gif_object) => {
    //     console.log(gif_url);
    //     console.log(gif_object);
    //   }}
    //   onGifLongPress={(gif_url, gif_object) => {
    //     console.log(gif_url);
    //     console.log(gif_object);
    //   }}
    //   visible={this.state.visible}
    //   onBackPressed={() => {
    //     this.setState({visible: false});
    //   }}
    //   horizontal={false}
    //   showScrollBar={false}
    //   noGifsFoundText={'No Gifs found :('}
    //   noGifsFoundTextStyle={{fontWeight: 'bold'}}
    //   provider={'tenor'}
    //   providerLogo={poweredByTenorLogoGrey}
    //   textInputProps={{autoFocus: true}}
    //   onError={error => {
    //     console.log(error);
    //   }}
    // />;
  };
  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setOrientation(isPortrait());
    });
  }, [Dimensions]);

  const onSend = (type = 'text', fileData = '') => {
    try {
      // console.log('type', type, fileData);
      socket.emit('createMessage', {
        myId: user._id,
        userId: member[0]._id,
        message: fileData ? fileData : message,
        type: type,
        room: members[0]._id + members[1]._id,
      });
      // setLastMessage && setLastMessage(message);
      setButtonHandle(!buttonHandle);
      setMessage('');
    } catch (err) {
      showToast('error', err);
    }
  };

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  useEffect(() => {
    setRoom1 && setRoom1(prev => !prev);
    try {
      socket.emit('getChat', {
        myId: user._id,
        userId: member[0]._id,
        room: members[0]._id + members[1]._id,
      });
      // if (setRoom) {
      //   let arr = members[0]._id + members[1]._id;
      //   setRoom(...arr);
      // }
    } catch (err) {
      console.log(err);
    }
    // };
    // getChat();
  }, []);
  useEffect(() => {
    socket.off('getChat').on('getChat', data => {
      // console.log('chat>>>>>>>>', props.navigation.isFocused(), user._id);
      if (props.navigation.isFocused()) {
        socket.emit('readMessages', {
          myId: user._id,
          userId: member[0]._id,
        });
      }
      // console.log('chattttt', data.data);
      let arr = [];
      data.data.messages.map(item => {
        const check = item.viewBy.filter(i => i.toString() == user._id);
        if (check.length > 0) {
          arr.push(item);
        }
      });
      data.data.messages = arr;

      setChat(data.data);
    });
  }, [buttonHandle]);

  // useEffect(()=>{
  //   console.log('focuesd>>>>>>>>>>>>>>>>>>>>>>>>>',focus)
  //   // if(props.navigation.isFocused() == false ){
  //   //  socket.emit("leaveChat",{room: members[0]._id + members[1]._id})
  //   // }
  //  },[focus])

  //  test
  // const [messages, setMessages] = useState();

  // useEffect(() => {
  //   // When app is opened, we are going to render 50 messages on screen.
  //   // Generally this is where you connect to chat server and query first batch of messages.
  //   const initChat = async () => {
  //     const initialMessages = await publicRequest.post('/getNMessages',{
  //       userId:"6329539a501fe367a909e91e",
  //           start:-20,
  //           end:-10,
  //           myId:"632995fe5f872972135207c9"
  //   });

  //     setMessages(initialMessages);
  //   };

  //   initChat();
  // }, []);

  // Add 10 more messages to end of the list.
  // In real chat application, this is where you have your pagination logic.
  // const loadMoreOlderMessages = async () => {
  //   console.log('calling >>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  //   const newMessages = await publicRequest.post('/getNMessages', {
  //     userId: '6329539a501fe367a909e91e',
  //     start: start,
  //     end: end,
  //     myId: '632995fe5f872972135207c9',
  //   });
  //   let arr = [];
  //   newMessages.data.data.messages.map(item => {
  //     const check = item.viewBy.filter(i => i.toString() == user._id);
  //     if (check.length > 0) {
  //       arr.push(item);
  //     }
  //   });
  //   newMessages.data.data.messages = arr;

  //   setChat(newMessages.data.data);
  //   start = start - 10;
  //   end = end - 10;
  // };

  // Add 10 more messages to beginning of the list.
  // In real chat application, this is where you have your pagination logic.
  const loadMoreRecentMessages = async () => {
    console.log('calling recent >>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

    console.log('start', start, 'end', end);
    const newMessages = await publicRequest.post('/getMessages', {
      userId: '63295275501fe367a909e8cd',
      start: start,
      end: end,
      myId: '6368994ba51c337061e80220',
    });
    let arr = [];

    // console.log('newMessages', newMessages.data.data.messages);
    let obj = chat;
    obj.messages = [...newMessages.data.data.messages, ...chat.messages];

    setChat({...obj});
    setStart(start => start + -10);
    setend(end => end + -10);
    // start = start + -10;
    // end = end + -10;
    return obj;
    // newMessages.data.data.messages.map(item => {
    //   const check = item.viewBy.filter(i => i.toString() == user._id);
    //     arr.push(item);
    //   }
    // });
    // newMessages.data.data.messages = arr;

    // setChat(newMessages.data.data);
  };

  console.log('chat length', chat?.messages?.length);

  // if (!messages) {
  //   // If the messages are not ready, lets not show anything.
  //   // Generally you can render some kind of loading indicator in this case.
  //   return null;
  // }

  /**
   * NOTE:
   *
   * - You can also control the scroll offset, at which `onEndReached` and `onStartReached`
   *   should be called, using props - onEndReachedThreshold and onStartReachedThrehols
   * - We are using `inverted` FlatList, since thats a common UX for Chat applications.
   */
  return (
    <ImageBackground
      style={styles.imageContainer}
      source={Images.Pictures.appBg}>
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          animated={true}
          backgroundColor="#000"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            // paddingTop: 20,
            // marginTop: 20,
            height: '100%',
          }}>
          <View
            style={{
              width: '100%',
              height: orientation ? '90%' : '85%',
              paddingBottom: 10,
            }}>
            <View>
              <View style={{width: '95%', alignSelf: 'center'}}>
                <Headerchat
                  image={
                    member ? member[0].profileImg : Images.Pictures.statusImg2
                  }
                  name={
                    member ? member[0].firstName + ' ' + member[0].lastName : ''
                  }
                  time={'offline 45 min ago'}
                  Press={() => {
                    props.navigation.goBack();
                  }}
                  icon={true}
                  onPress={() => {
                    props.navigation.navigate('chatdetails');
                  }}
                />
              </View>

              {/* <Header text="Live Chat" navigation={props.navigation} /> */}
            </View>
            {chat?.messages?.length > 0 ? (
              <FlatList
                style={{width: '90%', alignSelf: 'center', paddingBottom: 20}}
                data={chat.messages}
                // extraData={chat.messages}
                // inverted
                // onEndReached={null}
                onStartReached={loadMoreRecentMessages}
                renderItem={({item, index}) => {
                  return (
                    <MessagesScreen
                      message={item}
                      i={index}
                      user={user}
                      modalData
                      setModalData
                      navigation={props.navigation}
                    />
                  );
                }}
              />
            ) : (
              // <View
              //   style={{
              //     width: '90%',
              //     alignSelf: 'center',
              //     paddingBottom: 20,
              //   }}>
              //   {chat?.messages?.map((message, i) => {
              //     return (
              //       <MessagesScreen
              //         message={message}
              //         i={i}
              //         user={user}
              //         modalData
              //         setModalData
              //         navigation={props.navigation}
              //       />
              //     );
              //   })}
              // </View>
              <View></View>
            )}
          </View>

          <View
            style={{
              width: '90%',
              height: 48,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              elevation: 2,
              borderRadius: 50,
              paddingLeft: 5,
              borderWidth: 1,
              borderColor: '#F36C29',
              backgroundColor: '#fff',
              position: 'absolute',
              bottom: 10,
              alignSelf: 'center',
            }}>
            <View
              style={{
                width: '70%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                height: 60,
                marginLeft: 15,
              }}>
              {Visible === true ? (
                <TouchableOpacity
                  // disabled={message.length <= 0}
                  // activeOpacity={0.7}
                  // onPress={onSend}
                  onPress={() => setVisible(false)}>
                  <Icon
                    name="pluscircle"
                    type="AntDesign"
                    style={{
                      color: '#4059E4',
                      marginRight: 10,
                      marginLeft: 10,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <LinearGradient
                    start={{x: 1, y: 0.0}}
                    end={{x: 1, y: 1.9}}
                    colors={['#5DF7B8', '#3109FB']}
                    style={{
                      // width: '100%',
                      height: 35,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      // disabled={message.length <= 0}
                      // activeOpacity={0.7}
                      // onPress={onSend}
                      onPress={() => pickerCamera()}>
                      <Icon
                        name="camerao"
                        type="AntDesign"
                        style={{color: '#4059E4', marginLeft: 10}}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      // disabled={message.length <= 0}
                      // activeOpacity={0.7}
                      // onPress={onSend}
                      onPress={() => pickerGallery()}>
                      <Icon
                        name="picture-o"
                        type="FontAwesome"
                        style={{color: '#4059E4', marginLeft: 10}}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      // disabled={message.length <= 0}
                      // activeOpacity={0.7}
                      // onPress={onSend}
                      onPress={() => Gif()}>
                      <Icon
                        name="gif"
                        type="MaterialIcons"
                        style={{
                          color: '#4059E4',
                          marginLeft: 5,
                          marginRight: 10,
                        }}
                      />
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              )}

              <TextInput
                onTouchStart={() => {
                  setVisible(true);
                }}
                placeholderTextColor={(colorScheme = 'dark' ? 'grey' : 'grey')}
                multiline={true}
                placeholder="Type Message"
                value={message}
                onChangeText={text => {
                  setMessage(text.trimStart());
                }}
                style={{
                  width: '65%',
                  color: '#000',
                }}
              />
            </View>

            <View
              style={{
                // width: '8%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}>
              <TouchableOpacity
                // disabled={message.length <= 0}
                // activeOpacity={0.7}
                // onPress={onSend}
                onPressIn={onStartRecord}
                onPressOut={onStopRecord}>
                <Icon
                  name="keyboard-voice"
                  type="MaterialIcons"
                  style={{color: '#4059E4', marginRight: 10}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                disabled={message.length <= 0}
                activeOpacity={0.7}
                onPress={() => onSend('text', '')}>
                <Icon
                  name="send"
                  type="Feather"
                  style={{color: '#4059E4', marginRight: 10}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}>
        <View
          style={{
            // flex: 1,
            // backgroundColor: 'yellow',
            width: '100%',
            height: '100%',
          }}>
          {modalData && modalData.type == 'image' ? (
            <Image
              source={{uri: modalData.message}}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          ) : (
            modalData &&
            modalData.type == 'video' && (
              <VideoPlayer
                source={{uri: modalData.message}}
                disableFullscreen
                disableVolume
                disableBack
              />
            )
          )}
        </View>
      </Modal>
    </ImageBackground>
    // <SafeAreaView style={styles.safeArea}>
    //   <View style={styles.header}>
    //     <Text style={styles.headerTitle}>Chat between two users</Text>
    //   </View>
    //   <FlatList
    //     data={chat.messages}
    //     inverted
    //     onEndReached={loadMoreOlderMessages}
    //     onStartReached={loadMoreRecentMessages}
    //     renderItem={MessageBubble}
    //   />
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  screenContainer: {
    flex: 1,
  },

  topComponent: {
    width: '100%',
    backgroundColor: '#e7e',
    height: 90,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    zIndex: 99,
  },
});

export default ChatScreen;

// <View style={{ width: '95%', alignSelf: 'center' }}>
// <Headerchat
//   image={Images.Pictures.statusImg2}
//   name={'Veni'}
//   time={'offline 45 min ago'}
//   Press={() => { props.navigation.goBack() }}
//   icon={true}
//   onPress={() => {
//     props.navigation.navigate("chatdetails");
//   }}
// />
// </View>

// <View style={{ width: '95%', alignSelf: 'center' }}>
// <Headerchat
//   image={Images.Pictures.statusImg2}
//   name={'Veni'}
//   time={'offline 45 min ago'}
//   Press={() => { props.navigation.goBack() }}
//   icon={true}
//   onPress={() => {
//     props.navigation.navigate("chatdetails");
//   }}
// />
// </View>
