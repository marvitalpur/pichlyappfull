import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
  FlatList,
  statusBarStyle,
  statusBarTransition,
  hidden,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../../constants';
import {
  Box,
  Header,
  Row,
  Switch1,
  AppButton,
  FormInput,
} from '../../../components';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import {Icon} from 'react-native-elements';
import Post from '../../../components/post';
import {useSelector} from 'react-redux';
import {showToast} from '../../../showToast';
import {userRequest} from '../../../makeRequest';
const AddTelent = ({onPress, borderRadius, navigation}) => {
  const [img, setimg] = useState('');
  const user = useSelector(state => state.user.loggedInUser);
  const [state, setState] = useState({
    talentName: '',
    description: '',
    state: '',
    city: '',
    postContent: '',
    selectedFiles: [],
  });
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const picker = () => {
    ImagePicker.openPicker({
      multiple: true,
    })
      .then(async images => {
        const result = [];
        for await (const image of images) {
          result.push(image);
        }
        // setImages([...state.selectedFiles, ...result]);
        const resultedArray = [...state.selectedFiles, ...result];
        setState({
          ...state,
          selectedFiles: resultedArray,
        });
      })
      .catch(err => {
        if (err.code === 'E_PICKER_CANCELLED') {
          showToast('error', 'image selection is cancelled');
        }
      });
  };

  const removeContent = index => {
    console.log('i', index);
    const arr = [...state.selectedFiles];
    arr.splice(index, 1);
    setState({...state, selectedFiles: arr});
    // setImages(arr);
  };

  const handleCreateTalentPost = async () => {
    try {
      if (state.selectedFiles.length > 0) {
        const formData = new FormData();
        formData.append('talentName', state.talentName);
        formData.append('description', state.description);
        formData.append('state', state.state);
        formData.append('city', state.city);
        state.selectedFiles.map(item => {
          // newarr.push(img);
          formData.append('postContent', {
            uri: item?.node?.image?.uri ? item.node.image.uri : item.uri,
            type: item.node.type,
            name: 'image',
          });
        });
        setIsLoading(true);
        const res = await userRequest(
          'post',
          `/createTalentPost/${user._id}`,
          formData,
        );
        if (res.status == 200) {
          // console.log(res.data);
          setIsLoading(false);
          showToast('success', res?.data.message);
          navigation.replace('MyTabs', {screen: 'home'});
          setState({
            ...state,
            talentName: '',
            description: '',
            state: '',
            city: '',
            postContent: '',
            selectedFiles: [],
          });
          setImages([]);
        }
      } else {
        setIsLoading(false);
        showToast('error', 'Please select Image/Video');
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      showToast('error', err?.response?.data?.message);
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
        <View style={{}}>
          <View style={styles.screenHeader}>
            <Header
              BAckButton
              hiddinText
              text="Add Talent"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
          <View style={styles.screenBody}>
            <View style={styles.whitebox}>
              <View style={styles.Pictures}>
                <View
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    marginVertical: 20,
                  }}>
                  <View style={{marginVertical: 5}}>
                    <FormInput
                      multiLine
                      height={45}
                      placeHolder="Talent"
                      onChangeText={text =>
                        setState({
                          ...state,
                          talentName: text,
                        })
                      }
                    />
                  </View>

                  <View style={{marginVertical: 5}}>
                    <FormInput
                      multiLine
                      height={160}
                      placeHolder="Talent Discription"
                      onChangeText={text =>
                        setState({
                          ...state,
                          description: text,
                        })
                      }
                    />
                  </View>

                  <View style={{marginVertical: 5}}>
                    <FormInput
                      multiLine
                      height={45}
                      placeHolder="State"
                      onChangeText={text =>
                        setState({
                          ...state,
                          state: text,
                        })
                      }
                    />
                  </View>
                  <View style={{marginVertical: 5}}>
                    <FormInput
                      multiLine
                      height={45}
                      placeHolder="City"
                      onChangeText={text =>
                        setState({
                          ...state,
                          city: text,
                        })
                      }
                    />
                  </View>
                </View>
                {state.selectedFiles.length > 0 && (
                  <View style={{marginLeft: 15, marginTop: 10}}>
                    <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={true}
                      data={state.selectedFiles}
                      style={{width: '90%', marginLeft: 15}}
                      contentContainerStyle={{
                        height: 100,
                        width: 'auto',
                        marginBottom: 10,
                      }}
                      renderItem={({item, index}) => {
                        return (
                          <View
                            style={{
                              // height: 200,
                              paddingTop: 5,
                              paddingBottom: 5,
                              paddingLeft: 5,
                            }}>
                            <View
                              style={{
                                // backgroundColor: 'green',
                                width: 80,
                                // marginTop: 10,
                                height: '100%',
                                // marginBottom: 20,
                                marginLeft: 1,
                              }}>
                              <Image
                                style={{
                                  width: '100%',
                                  height: '100%',
                                }}
                                source={
                                  item === ''
                                    ? Images.Pictures.productcackImg3
                                    : {
                                        uri: item.node.image.uri,
                                      }
                                }
                                resizeMode="contain"
                              />
                            </View>
                            <TouchableOpacity
                              style={{
                                zIndex: 5,
                                position: 'absolute',
                                left: -4,
                                top: -4,
                              }}
                              onPress={() => {
                                removeContent(index);
                              }}>
                              <Icon name="cancel" type="fa fa" color="black" />
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                  </View>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 4,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      navigation.navigate('Homes', {
                        screen: 'Gallary',
                        params: {
                          setState: setState,
                          state: state,
                        },
                      });
                    }}>
                    <LinearGradient
                      start={{x: 1, y: 0.0}}
                      end={{x: 1, y: 1.9}}
                      colors={['#5DF7B8', '#3109FB']}
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: borderRadius || 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image source={Images.Icons.PhotoVideo} />
                    </LinearGradient>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 14,
                      // fontWeight: 'bold',
                      color: 'black',
                      marginLeft: 10,
                    }}>
                    Upload Photo & Video
                  </Text>
                </View>
              </View>
            </View>
            <View style={{width: '60%', alignSelf: 'center'}}>
              <View style={{marginVertical: 25}}>
                <AppButton
                  isLoading={isLoading}
                  LinearColor1={'#5DF7B8'}
                  LinearColor2={'#3109FB'}
                  color={'white'}
                  borderWidth={0.5}
                  borderColor={'#707070'}
                  backgroundColor={'#FFFFFF'}
                  label="Post Now"
                  onPress={handleCreateTalentPost}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default AddTelent;

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
    // height: 450,
    // minHeight: 450,
    // overflow: 'hidden',
    paddingTop: 5,
    paddingBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    elevation: 2,
  },
  Input: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 8,
    borderWidth: 0.4,
    borderRadius: 10,
    borderColor: '#aaa',
  },
});
