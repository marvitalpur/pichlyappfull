import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView,
  Modal,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Icon} from 'native-base';
import {Images} from '../../../constants/images';
import {Avatar} from 'react-native-elements';
import moment from 'moment';
import VideoPlayer from 'react-native-video-controls';
import ProgressBarComponent from '../../../components/progress';
import {Keyboard} from 'react-native';
import {useSelector} from 'react-redux';
const HighlightView = props => {
  const {width, height} = Dimensions.get('window');
  const statusDataa = props?.route?.params?.statusDataa || {};
  const highlightIndex1 = props?.route?.params?.highlightIndex || 0;
  const getUserStatusData = props?.route?.params?.getUserStatusData;

  const user = useSelector(state => state.user.loggedInUser);

  const [view, setView] = useState(false);
  const [reply, setReply] = useState('');
  const [stopProgress, setStopProgress] = useState(false);
  const [statusData, setStatusData] = useState(statusDataa ? statusDataa : []);

  const [storyIndex, setStoryIndex] = useState(0);
  const [highlightIndex, sethighlightIndex] = useState(highlightIndex1);

  const ref = useRef();

  const onViewRef = useRef(viewableItems => {
    sethighlightIndex(viewableItems.changed[0].index);
    setStoryIndex(0);
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  const keyboardDidHide = () => {
    // console.log('keyboardDidHide', stopProgress);
    if (stopProgress) {
      stopProgressHandler();
      Keyboard.dismiss();
    }
  };

  const onSwipe = index => {
    ref.current.scrollToIndex({index: index, animated: true, viewPosition: 0});
    sethighlightIndex(index);
    setStoryIndex(0);
    console.log('on swipe');
  };

  const setModalVisible = () => {
    setView(!view);
  };

  const stopProgressHandler = () => {
    setStopProgress(prevState => !prevState);
  };

  //   const onSendHandler = async id => {
  //     try {
  //       // console.log('pressed>>>>>>>>>>>>>>>>>', type);
  //       socket.emit('createChatRoom', {
  //         myId: user._id,
  //         userId: id,
  //       });
  //       socket.off('createChatRoom').on('createChatRoom', data => {
  //         // console.log('data', data);
  //         socket.emit('createMessage', {
  //           myId: user._id,
  //           userId: id,
  //           message: reply,
  //           type: 'text',
  //           room: data.data.members[0]._id + data.data.members[1]._id,
  //         });
  //       });
  //       setReply('');
  //     } catch (err) {
  //       console.log('err>>>>>>>>>>>>>', err);
  //     }
  //   };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          data={statusData}
          initialScrollIndex={highlightIndex}
          ref={ref}
          keyboardShouldPersistTaps="always"
          pagingEnabled={true}
          horizontal={true}
          maxToRenderPerBatch={1}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 700));
            wait.then(() => {
              ref.current?.scrollToIndex({
                index: info.index,
                animated: true / false,
              });
            });
          }}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          style={{width: width, height: height}}
          renderItem={({item, index}) => {
            // console.log('item', item?.status[storyIndex]?.id?.createdAt);
            return (
              <>
                {highlightIndex == index && (
                  <ProgressBarComponent
                    key={index}
                    item={item}
                    statusLength={statusData.length - 1}
                    storyIndex={storyIndex}
                    statusData={statusData}
                    statusIndex={highlightIndex}
                    setStoryIndex={setStoryIndex}
                    navigation={props.navigation}
                    onSwipe={onSwipe}
                    view={view}
                    stopProgress={stopProgress}
                    highlight={true}
                  />
                )}
                {/* chevron-left icon section  */}
                <View
                  style={{
                    marginTop: 40,

                    position: 'absolute',
                    flexDirection: 'row',
                    zIndex: 100,

                    width: width,
                    height: height,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.goBack();
                    }}>
                    <Icon
                      type="Feather"
                      name="chevron-left"
                      style={{
                        color: '#fff',
                        fontSize: 40,
                        marginLeft: 0,
                      }}
                    />
                  </TouchableOpacity>

                  <Avatar
                    rounded
                    size={'small'}
                    source={{uri: item?.highlightBy?.profileImg}}
                  />

                  <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 15, color: '#fff'}}>
                      {item?.highlightBy?.firstName +
                        ' ' +
                        item?.highlightBy?.lastName}
                    </Text>
                    <Text style={{fontSize: 15, color: '#fff'}}>
                      {moment(
                        item?.highlights[storyIndex]?.id?.createdAt,
                      ).fromNow()}
                    </Text>
                  </View>
                </View>
                {view == false && item.highlightBy._id == user._id && (
                  <TouchableOpacity
                    onPress={() => {
                      setView(!view);
                    }}
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      position: 'absolute',
                      zIndex: 100,
                      bottom: 10,
                      left: '40%',
                      marginBottom: 10,
                    }}>
                    <Icon
                      type="Feather"
                      name="eye"
                      style={{
                        color: '#fff',
                        fontSize: 25,
                        marginRight: 5,
                      }}
                    />

                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 15,
                        fontWeight: '300',
                      }}>
                      {item?.highlights[storyIndex]?.id?.viewedBy.length} View
                    </Text>
                  </TouchableOpacity>
                )}
                {/* View Section */}
                {view && (
                  <>
                    <Modal
                      presentationStyle="overFullScreen"
                      visible={view}
                      transparent
                      onRequestClose={() => setView(!view)}
                      // onDismiss={() => setView(!view)}
                      animationType="slide">
                      <TouchableOpacity
                        style={{
                          backgroundColor: 'transparent',
                          width: '100%',
                          height: '60%',
                          // top: 0,
                          position: 'absolute',
                          zIndex: 102,
                        }}
                        onPressOut={() => {
                          // console.log('hello');
                          setModalVisible();
                        }}></TouchableOpacity>
                      <View
                        style={{
                          backgroundColor: '#444444',
                          width: '100%',
                          height: 300,
                          bottom: 0,
                          position: 'absolute',
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginBottom: 10,
                            marginTop: 10,
                          }}>
                          <Icon
                            type="Feather"
                            name="eye"
                            style={{
                              color: '#fff',
                              fontSize: 25,
                              marginRight: 5,
                            }}
                          />

                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 15,
                              fontWeight: '300',
                            }}>
                            {item?.highlights[storyIndex]?.id?.viewedBy.length}{' '}
                            View
                          </Text>
                        </View>
                        <FlatList
                          data={item?.highlights[storyIndex]?.id?.viewedBy}
                          style={{height: 300}}
                          showsVerticalScrollIndicator={false}
                          renderItem={({item}) => {
                            return (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  // marginLeft: 20,
                                  marginTop: 10,
                                  marginBottom: 10,
                                }}>
                                <Avatar
                                  size={'medium'}
                                  source={
                                    item?.viewedId?.profileImg
                                      ? {uri: item?.viewedId?.profileImg}
                                      : Images.Pictures.statusImg1
                                  }
                                />
                                <View style={{marginLeft: 10}}>
                                  <Text style={{fontSize: 15, color: '#fff'}}>
                                    {item?.viewedId?.firstName +
                                      ' ' +
                                      item?.viewedId?.lastName}
                                  </Text>
                                  <Text style={{fontSize: 15, color: '#fff'}}>
                                    {moment(item.viewedDate).fromNow()}
                                  </Text>
                                </View>
                              </View>
                            );
                          }}
                        />
                      </View>
                    </Modal>
                  </>
                  // {/* <TouchableOpacity
                  // onPress={() => {
                  //   setView(!view);
                  // }} */}
                  // {/* style={{
                  //   backgroundColor: 'rgba(52, 52, 53, 0.8)',
                  //   width: '100%',
                  //   position: 'absolute',
                  //   bottom: 10,
                  // }}
                  // > */}

                  // {/* </TouchableOpacity> */}
                )}
                {stopProgress && (
                  <TouchableOpacity
                    onPress={() => {
                      keyboardDidHide();
                      console.log('hello');
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      zIndex: 103,
                      backgroundColor: 'transparent',
                    }}></TouchableOpacity>
                )}
                {/* Reply Section */}
                {item.highlightBy._id != props.route.params.userId && (
                  <View style={styles.inputcontainer}>
                    <TextInput
                      onPressIn={() => {
                        if (!stopProgress) {
                          stopProgressHandler();
                          // setStopProgress(true);
                        }
                      }}
                      // onSubmitEditing={nativeEvent => {
                      //   console.log(nativeEvent);
                      // }}
                      placeholder="Reply on status"
                      onChangeText={text => setReply(text)}
                      value={reply}
                      style={{width: '75%'}}
                    />
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '20%',
                        marginLeft: 25,
                      }}>
                      {/* <TouchableOpacity disabled={!reply}> */}
                      <Icon
                        disabled={!reply}
                        onPress={() => {
                          if (reply) {
                            // console.log('first');
                            // onSendHandler(item.statusBy._id);
                            setStopProgress(false);
                            keyboardDidHide();
                            // stopProgressHandler();
                          }
                        }}
                        type="Feather"
                        name="send"
                        style={{
                          color: reply ? '#4059E4' : '#656868',
                          fontSize: 24,
                        }}
                      />
                      {/* </TouchableOpacity> */}
                    </View>
                  </View>
                )}
                {/* on left Press */}
                <TouchableOpacity
                  onPress={() => {
                    if (storyIndex > 0) {
                      setStoryIndex(storyIndex - 1);
                    }
                  }}
                  onLongPress={() => {
                    stopProgressHandler();
                  }}
                  delayLongPress={200}
                  onPressOut={() => {
                    if (stopProgress) {
                      stopProgressHandler();
                    }
                  }}
                  style={{
                    position: 'absolute',
                    width: '50%',
                    height: '90%',
                    top: 0,
                    zIndex: 101,
                  }}>
                  <View></View>
                </TouchableOpacity>
                {/* on right press */}
                <TouchableOpacity
                  onLongPress={() => {
                    stopProgressHandler();
                  }}
                  delayLongPress={200}
                  onPressOut={() => {
                    if (stopProgress) {
                      stopProgressHandler();
                    }
                  }}
                  onPress={() => {
                    if (storyIndex < item.highlights.length - 1) {
                      setStoryIndex(storyIndex + 1);
                    } else if (storyIndex == item.highlights.length - 1) {
                      if (highlightIndex < statusData.length - 1) {
                      } else {
                        console.log('band krdo');
                        setStoryIndex(item.highlights.length - 1);
                      }
                    }
                  }}
                  style={{
                    position: 'absolute',
                    width: '50%',
                    height: '90%',
                    top: 0,
                    left: '50%',

                    zIndex: 101,
                  }}>
                  <View></View>
                </TouchableOpacity>
                {/* content section */}
                {highlightIndex == index ? (
                  <View>
                    {item?.highlights[storyIndex]?.id?.type == 'image' ? (
                      <Image
                        source={{
                          uri: item?.highlights[storyIndex]?.id.content,
                        }}
                        style={styles.imgView}
                      />
                    ) : item?.highlights[storyIndex]?.id?.type == 'video' ? (
                      <VideoPlayer
                        disableFullscreen
                        disableVolume
                        disableBack
                        disableSeekbar
                        disablePlayPause
                        style={{width: width, height: height}}
                        source={{
                          uri: item?.highlights[storyIndex]?.id.content,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          backgroundColor: 'red',
                          width: width,
                          height: height,

                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={{color: 'white', fontSize: 25}}>
                          {item?.highlights[storyIndex]?.id?.caption}
                        </Text>
                      </View>
                    )}
                    {item?.highlights[storyIndex]?.id?.type == 'video' ||
                      (item?.highlights[storyIndex]?.id?.type == 'image' && (
                        <View
                          style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 100,
                            bottom: 100,
                          }}>
                          <Text style={{color: 'white', fontSize: 15}}>
                            {item?.highlights[storyIndex]?.id?.caption}
                          </Text>
                        </View>
                      ))}
                  </View>
                ) : (
                  <View>
                    {item?.highlights[0]?.id?.type == 'image' ? (
                      <Image
                        source={{
                          uri: item?.highlights[0]?.id.content,
                        }}
                        style={styles.imgView}
                      />
                    ) : item?.highlights[0]?.id?.type == 'video' ? (
                      <VideoPlayer
                        disableFullscreen
                        disableVolume
                        disableBack
                        disableSeekbar
                        disablePlayPause
                        style={{width: width, height: height}}
                        source={{
                          uri: item?.highlights[0]?.id.content,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          backgroundColor: 'red',
                          width: width,
                          height: height,

                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={{color: 'white', fontSize: 25}}>
                          {item?.highlights[0]?.id?.caption}
                        </Text>
                      </View>
                    )}
                    {item?.highlights[0]?.id?.type == 'video' ||
                      (item?.highlights[0]?.id?.type == 'image' && (
                        <View
                          style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 100,
                            bottom: 100,
                          }}>
                          <Text style={{color: 'white', fontSize: 15}}>
                            {item?.highlights[0]?.id?.caption}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}
              </>
            );
          }}
        />
      </SafeAreaView>
    </>
  );
};
export default HighlightView;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  Body: {
    backgroundColorL: 'purple',
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    // alignItems: 'flex-end',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 100,
  },
  inputcontainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 10,
    zIndex: 104,
    // zIndex: 50,

    // alignItems: 'flex-end',
  },
  screenHeader: {
    // width: '100%',
    // height: 30,
    marginTop: 40,
    // alignSelf: 'center',
    // justifyContent: 'center',
    position: 'absolute',
    flexDirection: 'row',
    zIndex: 100,
    backgroundColor: 'red',

    // alignItems: 'center',
  },
  row: {
    // width: "90%",
    height: '100%',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },

  overlayStyle: {
    backgroundColor: '#aaa',
    position: 'absolute',
    opacity: 0.85,
    bottom: 0,
    width: '100%',
    height: 280,
  },
  statusAddBox: {
    width: 65,
    height: 65,
    borderRadius: 19,
    borderColor: '#3729F2',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Views: {
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
  },
  imgView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  text1: {
    fontSize: 12,
    color: '#fff',
  },
});
