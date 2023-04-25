import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Images} from '../../../constants';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {Icon} from 'native-base';
import {useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {publicRequest, userRequest} from '../../../makeRequest';
import {useSelector} from 'react-redux';
import VideoPlayer from 'react-native-video-controls';

const PreviewComponent = ({
  visible,
  setVisible,
  content,
  state,
  setState,
  navigation,
  setCameraState,
  captureImageData,
  message,
  messageCameraData,
  setMessageCameraData,
  member,
  members,
}) => {
  const user = useSelector(state => state.user.loggedInUser);
  const [previewContent, setPreviewContent] = useState(content[0]);
  const [capitonContent, setCapitonContent] = useState([]);
  const [captionIndex, setCaptionIndex] = useState(0);
  const ref = useRef();

  const removeContent = index => {
    const arr = [...state?.selectedFiles];
    arr.splice(index, 1);
    setState({...state, selectedFiles: arr});
    if (index > 0) {
      setCaptionIndex(index - 1);
      setPreviewContent(state?.selectedFiles[index - 1]);
      // onChangeIndex(index - 1);
    } else if (index == 0) {
      setCaptionIndex(0);
      setPreviewContent(arr[0]);
      // onChangeIndex(0);
    }
  };
  useEffect(() => {
    setPreviewContent(state?.selectedFiles[0]);
  }, []);

  //handle create story photo or video
  const createStoryHandler = async () => {
    try {
      if (captureImageData.length > 0) {
        let type = '';
        for (let i = captureImageData[0].path.length - 1; i > 0; i--) {
          if (captureImageData[0].path[i] == '.') {
            break;
          } else {
            type = captureImageData[0].path[i] + type;
          }
        }
        const img = {
          uri: captureImageData[0].path,
          type:
            captureImageData[0].type == 'image'
              ? `image/${type}`
              : `video/${type}`,
          name: 'CameraData',
        };
        const formData = new FormData();
        formData.append('caption', captureImageData[0].caption);
        formData.append('content', img);
        formData.append('type', captureImageData[0].type);
        console.log('pressssss', formData);
        console.log('message', message);
        if (message) {
          const res = await userRequest('post', '/saveFile', formData);
          setMessageCameraData && setMessageCameraData(res.data.data);
          console.log('message response', res.data);
          navigation.replace('Homes', {
            screen: 'chatscreen',
            params: {member: member, members: members},
          });
        } else {
          const res = await userRequest(
            'post',
            `/crateStory/${user._id}`,
            formData,
          );
          console.log('response', res.data);
          setVisible(!visible);
          navigation.replace('MyTabs', {screen: 'Home'});
        }
      } else {
        for (const [i, item] of state?.selectedFiles.entries()) {
          // state.selectedFiles.map(async (item, i) => {
          const formData = new FormData();
          const img = {
            uri: item.node.image.uri,
            type: item.type,
            name: 'CameraData',
          };
          formData.append('caption', item.caption);
          formData.append('content', img);
          formData.append('type', item.type.split('/')[0]);
          const res = await userRequest(
            'post',
            `/crateStory/${user._id}`,
            formData,
          );
          if (i == state?.selectedFiles.length - 1) {
            setVisible(!visible);
            navigation.replace('MyTabs', {screen: 'Home'});
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        if (setCameraState) {
          setCameraState([]);
        }
        setVisible(!visible);
        setState({caption: '', postContent: '', selectedFiles: []});
      }}>
      <View style={{height: '100%', width: '100%', backgroundColor: '#DBEFF9'}}>
        <View style={{position: 'absolute', right: 15, top: 15, zIndex: 100}}>
          <TouchableOpacity activeOpacity={0.8} onPress={createStoryHandler}>
            <LinearGradient
              start={{x: 1, y: 0.0}}
              end={{x: 1, y: 1.9}}
              colors={['#5DF7B8', '#3109FB']}
              style={{
                width: 35,
                height: 35,
                alignItems: 'center',
                justifyContent: 'flex-end',
                flex: 1,
              }}>
              <Icon
                type="Ionicons"
                name="ios-checkmark-done-sharp"
                style={{
                  fontSize: 28,
                  color: '#ffff',
                }}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {captureImageData.length > 0 ? (
          captureImageData[0].type == 'image' ? (
            <Image
              style={{
                height: '100%',
                width: '100%',
              }}
              source={{
                uri: captureImageData[0].path,
              }}
            />
          ) : (
            <View style={{height: '90%', width: '100%'}}>
              <VideoPlayer
                // muted
                disableFullscreen
                disableVolume
                disableBack
                // disablePlayPause
                // disableTimer
                // disableSeekbar
                // resizeMode="contain"
                source={{uri: captureImageData[0].path}}
                // style={{}}
                // navigator={this.props.navigator}
              />
            </View>
          )
        ) : state?.selectedFiles[captionIndex]?.type?.split('/')[0] ==
          'video' ? (
          <View
            style={{
              height: state?.selectedFiles?.length == 1 ? '90%' : '75%',
              width: '100%',
            }}>
            <VideoPlayer
              // muted
              disableFullscreen
              disableVolume
              disableBack
              // disablePlayPause
              // disableTimer
              // disableSeekbar
              // resizeMode="contain"
              source={{uri: state?.selectedFiles[captionIndex]?.node.image.uri}}
              // style={{}}
              // navigator={this.props.navigator}
            />
          </View>
        ) : (
          <Image
            style={{
              height: state?.selectedFiles.length <= 1 ? '100%' : '75%',
              width: '100%',
            }}
            source={{
              uri: state?.selectedFiles[captionIndex]?.node?.image?.uri,
            }}
          />
        )}
        {state?.selectedFiles?.length > 1 && (
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            data={state?.selectedFiles}
            contentContainerStyle={{
              height: 100,
              width: 'auto',
              paddingTop: 5,
              // backgroundColor: 'yellow',
            }}
            extraData={state?.selectedFiles}
            // ref={ref}
            initialScrollIndex={captionIndex}
            // onViewableItemsChanged={onViewRef.current}
            // viewabilityConfig={viewConfigRef.current}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 5,
                  }}>
                  <View
                    style={{
                      width: 80,
                      height: '100%',

                      marginLeft: 1,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setPreviewContent(item);
                        setCaptionIndex(index);
                      }}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'cover',
                        }}
                        source={
                          item.length <= 0
                            ? Images.Pictures.productcackImg3
                            : {
                                uri: item.node.image.uri,
                              }
                        }
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={{
                      zIndex: 5,
                      position: 'absolute',
                      left: 5,
                      top: -6,
                    }}
                    onPress={() => {
                      removeContent(index);
                    }}>
                    <Icon
                      name="circle-with-cross"
                      type="Entypo"
                      color="black"
                      style={{fontSize: 20}}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}

        <View
          style={{
            position: 'absolute',
            width: '90%',
            height: 60 || 48,
            // zIndex: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            elevation: 1,
            borderRadius: 2 || 50,
            paddingLeft: 5,
            // borderWidth: 1,
            borderColor: '#eee',
            bottom: 0,

            // position: 'absolute',
            // bottom: 0,
            // marginTop: 15,
            alignSelf: 'center',
            backgroundColor: '#DCDCDC',
            borderRadius: 15,
            marginBottom: 5,
          }}>
          <View
            style={{
              width: '80%',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              height: 60,
              marginLeft: 15,
              //   borderRadius: 15,
              //   backgroundColor: 'blue',
            }}>
            <TextInput
              placeholderTextColor={'grey'}
              multiline={true}
              placeholder="Add Caption"
              value={
                state?.selectedFiles?.length > 0
                  ? state?.selectedFiles[captionIndex]?.caption
                  : captureImageData[0]?.caption
              }
              onChangeText={text => {
                // setMessage(text.trimStart());
                if (state?.selectedFiles?.length > 0) {
                  const arr = [...state?.selectedFiles];
                  if (
                    arr[captionIndex]?.caption ||
                    state?.selectedFiles?.length > 0
                  ) {
                    arr.map((item, i) => {
                      if (i == captionIndex) {
                        item.caption = text;
                      }
                    });
                    // setCapitonContent(arr);
                    setState({
                      ...state,
                      selectedFiles: arr,
                    });
                    // arr[captionIndex].caption = text;
                  }
                } else {
                  const arr = [...captureImageData];
                  arr.map(item => {
                    item.caption = text;
                  });
                  setCameraState(arr);
                }
              }}
              style={{
                marginVertical: 5,
                width: '75%',
                color: '#000',
                // borderRadius: 80,
                // backgroundColor: 'yellow',
              }}
            />
          </View>
          {/* <View
            style={{
              // width: '8%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: 10,
            }}>
                <TouchableOpacity
              //   disabled={message?.length <= 0}
              activeOpacity={0.7}
              //   onPress={onSend}
                >
              <Icon
                name="send"
                type="MaterialIcons"
                style={{
                  //   color: message?.length <= 0 ? 'grey' : '#4059E4',
                  color: 'grey',
                }}
              />
                </TouchableOpacity>
          </View> */}
        </View>
      </View>
      {/* </View> */}
    </Modal>
  );
};

export default PreviewComponent;

const styles = StyleSheet.create({});
