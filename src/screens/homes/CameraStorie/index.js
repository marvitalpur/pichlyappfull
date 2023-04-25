import React, {useEffect, useRef, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  statusBarStyle,
  statusBarTransition,
  hidden,
  Modal,
  FlatList,
} from 'react-native';
import {Dimensions} from 'react-native';
import {Images} from '../../../constants';
import {RNCamera} from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevices,
} from 'react-native-vision-camera';
import {Icon} from 'native-base';
import {useState} from 'react';
import {Button} from 'react-native-elements';
import PreviewComponent from '../previewComponent';
import Gallary from './../gallary';

// import Reanimated, {
// import { CameraRoll } from '@react-native-community/cameraroll';
// useAnimatedProps,
//   useSharedValue,
//   withSpring,
// } from 'react-native-reanimated';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const CameraStorie = props => {
  // const [Visible, setVisible] = useState(true);
  const [cameraType, setCameraType] = useState('photo');
  const [videoRecord, setVideoRecord] = useState(false);
  const [torch, setTorch] = useState(false);
  const [cameraPosition, setCameraPosition] = useState(false);
  const [state, setState] = useState({
    caption: '',
    postContent: '',
    selectedFiles: [],
  });
  const [visible, setVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [cameraState, setCameraState] = useState([]);
  const devices = useCameraDevices();
  const [option, setOption] = useState(true);
  // console.log(devices);
  const device = cameraPosition ? devices.front : devices.back;
  // console.log('device', device.position);
  // const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
  // Reanimated.addWhitelistedNativeProps({
  //   zoom: true,
  // });
  const camera = useRef();
  const [image, setimage] = useState('');
  const [hasPermission, setHasPermission] = useState(false);
  // const zoom = useSharedValue(0);

  // const onRandomZoomPress = useCallback(() => {
  //   zoom.value = withSpring(Math.random());
  // }, []);

  // const animatedProps = useAnimatedProps(() => ({zoom: zoom.value}), [zoom]);
  const takePicture = async camera => {
    // const options = {quality: 0.5};
    // const data = await camera.takePictureAsync();
    // console.log('image', data);
    const {uri, codec = 'mp4'} = await camera.current.recordAsync();
    // console.log(uri);
    // setimage(data.uri);
    // props.navigate('Homes', {screen: 'storieCreate'});
  };
  const pickerGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      // setimg(image.path);
      console.log(image);
      setimage(image.path);
      props.navigate('Homes', {screen: 'storieCreate'});
      //   setVisible(true);
    });
  };

  const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Waiting</Text>
    </View>
  );
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);
  // console.log('state camera story', cameraState);
  //capture photo
  const arr = [];
  const capturePhoto = async () => {
    const photo = await camera.current.takePhoto({
      // focus: true,
    });
    setTorch(false);
    // console.log('photo', photo);
    // const arr = [{...photo}];
    arr.push({path: 'file://' + photo.path, type: 'image', caption: ''});
    console.log('photo', arr);
    setCameraState(arr);
    setVisible(!visible);
  };

  //video record
  const handleVideoRecord = async () => {
    setVideoRecord(true);
    const arr = [];
    camera.current.startRecording({
      onRecordingFinished: video => {
        console.log('video', video);
        arr.push({path: 'file://' + video.path, type: 'video', caption: ''});
        console.log('video', arr);
        setCameraState(arr);
        setVisible(!visible);
      },
      onRecordingError: error => console.error(error),
    });
    // console.log('video', photo);
  };
  //video stop
  const handleVideoStop = async () => {
    setVideoRecord(false);
    await camera.current.stopRecording();
  };
  return (
    <View>
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#000"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />

        {device != null && hasPermission && (
          <>
            <Camera
              ref={camera}
              photo={true}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              video={true}
              enableZoomGesture={true}
              supportsFocus={true}
              torch={torch ? 'on' : 'off'}
              // audio={true}
            />
            <View
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                flexDirection: 'column',
                marginTop: 10,

                // backgroundColor: 'gray',
                // borderRadius: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setTorch(!torch);
                }}>
                <Icon
                  name={'flash'}
                  type={'Entypo'}
                  style={{
                    // fontSize: cameraType == 'photo' ? 55 : 32,
                    color: torch ? 'yellow' : 'white',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setCameraPosition(!cameraPosition);
                }}
                style={{marginTop: 15}}>
                <Icon
                  name={'camera-reverse'}
                  type={'Ionicons'}
                  style={{
                    // fontSize: cameraType == 'photo' ? 55 : 32,
                    color: 'white',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                height: '25%',
                backgroundColor: '#39373bbb',
                opacity: 0.5,
                position: 'absolute',
                bottom: 0,
              }}></View>
            <View
              style={{
                // position: 'absolute',
                // alignSelf: 'center',
                bottom: 80,
                // overFlow: 'hidden',
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                // // backgroundColor: 'yellow',
                // width: '100%',
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '80%',
                alignItems: 'center',
                marginLeft: 30,
                position: 'absolute',
              }}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: 'white',
                  width: '15%',
                  height: '60%',
                  marginTop: 30,
                  // borderRadius: 10,
                }}
                // onPress={() =>
                //   props.navigation.navigate('Homes', {screen: 'Picview'})
                // }
                onPress={() => {
                  // props.navigation.navigate('Homes', {
                  //   screen: 'Gallary',
                  //   params: {
                  //     setState: setState,
                  //     state: state,
                  //     setVisible,
                  //     visible,
                  //   },
                  // });
                  setGalleryVisible(!galleryVisible);
                }}>
                <Image
                  source={Images.Pictures.productcackImg1}
                  resizeMode="cover"
                  style={{
                    width: '100%',
                    height: '100%',
                    // borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  cameraType == 'photo'
                    ? capturePhoto
                    : !videoRecord
                    ? handleVideoRecord
                    : handleVideoStop
                }>
                {/* // onPressIn={handleVideoRecord}> */}
                {/* // onPressOut={handleVideoStop} */}
                <Icon
                  name="circle"
                  type="Entypo"
                  color="white"
                  // onPress={capturePhoto}
                  style={{
                    fontSize: 60,
                    color: 'white',
                    // backgroundColor: 'red',
                  }}
                />
                {cameraType == 'video' && (
                  <View
                    style={{
                      position: 'absolute',
                      alignSelf: 'center',
                      bottom: cameraType == 'photo' ? 4 : 15,
                    }}>
                    <Icon
                      name={videoRecord ? 'controller-stop' : 'circle'}
                      type={videoRecord ? 'Entypo' : 'FontAwesome'}
                      color="white"
                      style={{
                        fontSize: cameraType == 'photo' ? 55 : 32,
                        color: 'red',
                      }}
                    />
                  </View>
                )}
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  // onPress={() => takePicture(camera)}
                  onPress={() => {
                    props.navigation.navigate('Homes', {
                      screen: 'createstorie',
                    });
                  }}
                  style={styles.capture}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 30,
                      marginTop: 30,
                      fontWeight: 'bold',
                    }}>
                    Aa
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <Button
                title={'stop'}
                onPress={async () => {
                  await camera.current.stopRecording();
                }}
              /> */}
            </View>
            <View
              style={{
                width: '100%',
                // height: 100,
                position: 'absolute',
                bottom: 25,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              {/* <FlatList
                style={{width: 50, height: 50}}
                horizontal
                ref={ref}
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={scrollnum}
                contentContainerStyle={{justifyContent: 'center'}}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                index={scrollnum}
                onScrollToIndexFailed={info => {
                  const wait = new Promise(resolve => setTimeout(resolve, 500));
                  wait.then(() => {
                    ref.current?.scrollToIndex({
                      index: info.index,
                      animated: true,
                    });
                  });
                }}
                getItemLayout={(data, index) => ({
                  length: 50,
                  offset: 50 * index,
                  index,
                })}
                data={entries}
                renderItem={_renderItem}
              /> */}
              <TouchableOpacity
                style={{bottom: 25, marginRight: 15}}
                onPress={() => {
                  setCameraType('photo');
                  setOption(true);
                }}>
                <Text style={{color: 'white', fontSize: option ? 20 : 14}}>
                  Photo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{bottom: 25}}
                onPress={() => {
                  setCameraType('video');
                  setOption(false);
                }}>
                <Text style={{color: 'white', fontSize: !option ? 20 : 14}}>
                  Video
                </Text>
              </TouchableOpacity>
            </View>

            {/* <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                bottom: 25,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                width: '100%',
                height: 25,
                alignItems: 'center',
              }}>
              {cameraType == 'photo' ? (
                <TouchableOpacity onPress={() => setCameraType('video')}>
                  <Text style={{color: 'white'}}>Video</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setCameraType('photo')}>
                  <Text style={{color: 'white'}}>Photo</Text>
                </TouchableOpacity>
              )}
            </View> */}
          </>
        )}
      </View>
      <Modal
        visible={galleryVisible}
        onRequestClose={() => setGalleryVisible(!galleryVisible)}
        animationType="slide">
        <Gallary
          state={state}
          setState={setState}
          visible={visible}
          setVisible={setVisible}
          setGalleryVisible={setGalleryVisible}
          galleryVisible={galleryVisible}
        />
      </Modal>
      <PreviewComponent
        visible={visible}
        setVisible={setVisible}
        message={props?.route?.params?.message}
        messageCameraData={props?.route?.params?.messageCameraData}
        setMessageCameraData={props?.route?.params?.setMessageCameraData}
        member={props?.route?.params?.member}
        members={props?.route?.params?.members}
        content={
          // cameraState?.length > 0
          // ?
          [{node: {image: {uri: 'file://' + cameraState[0]}}}]
          // : [...state.selectedFiles]
        }
        captureImageData={cameraState}
        state={state}
        setState={setState}
        navigation={props.navigation}
        setCameraState={setCameraState}
      />
    </View>
  );
};
export default CameraStorie;

const styles = StyleSheet.create({
  maincontainer: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#CBCBCB',
  },
  container: {
    width: width * 1,
    // alignSelf: 'center',
    height: height * 1,
  },
  containter1: {
    width: width * 0.9,
    borderWidth: 1,
    alignSelf: 'center',
    height: height * 0.13,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: '2%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    flexDirection: 'row',
  },
  heading: {
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: height * 0.045,
    color: 'black',
  },
  messageText: {
    fontWeight: '700',
    marginLeft: 15,
    marginTop: 10,
    fontSize: height * 0.03,
  },
  input: {
    width: '93%',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    margintop: 14,
  },
  img: {
    height: height * 0.08,
    width: width * 0.15,
    borderRadius: 10,
    marginLeft: 15,
    marginTop: 15,
  },
  preview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
