import React, {useState} from 'react';
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
  text,
  TouchableOpacity,
  onPress,
  borderRadius,
  hiddinText,
  hidden,
  statusBarStyle,
  statusBarTransition,
  FlatList,
} from 'react-native';
import {AppButton, FormInput, Header} from '../../../components';
import {Images} from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar, Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {userRequest} from '../../../makeRequest';
import {useSelector} from 'react-redux';
import {showToast} from '../../../showToast';

const AddServices = props => {
  const [state, setState] = useState({
    serviceName: '',
    description: '',
    state: '',
    city: '',
    price: '',
    pricingNote: '',
    selectedFiles: [],
  });
  const [isEnabled, setIsEnabled] = useState(false);
  const [img, setimg] = useState('');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const user = useSelector(state => state.user.loggedInUser);
  const [isLoading, setIsLoading] = useState(false);

  const picker = () => {
    ImagePicker.openPicker({multiple: true}).then(images => {
      //   console.log(images[0].path);
      setimg(images[0].path);
      // console.log('images==============', images);
      // setState({...state, selectedFiles: images});
      const arr = [...state.selectedFiles];
      if (images.length > 0) {
        images.map(item => {
          arr.push(item);
        });
      }
      setState({...state, selectedFiles: arr});
      // console.log('state>>', state);
    });
  };

  const servicePostHandler = async () => {
    try {
      const formData = new FormData();
      formData.append('serviceName', state.serviceName);
      formData.append('description', state.description);
      formData.append('state', state.state);
      formData.append('city', state.city);
      formData.append('price', state.price);
      formData.append('pricingNote', state.pricingNote);
      if (state.selectedFiles.length > 0) {
        state.selectedFiles.map(item => {
          formData.append('postContent', {
            uri: item?.node?.image?.uri ? item.node.image.uri : item.uri,
            type: item.node.type,
            name: 'image',
          });
        });
      }
      setIsLoading(true);
      const response = await userRequest(
        'post',
        `/createServicePost/${user._id}`,
        formData,
      );
      // console.log('response==============', response);
      if (response.status == 200) {
        setIsLoading(false);
        // console.log('response', response.data);
        showToast('success', response.data.message);
        setState({
          serviceName: '',
          description: '',
          state: '',
          city: '',
          price: '',
          pricingNote: '',
          selectedFiles: [],
        });
        props.navigation.replace('MyTabs', {screen: 'home'});
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err?.response.data.message);
    }
  };

  const removeContent = index => {
    const arr = [...state.selectedFiles];
    arr.splice(index, 1);
    setState({...state, selectedFiles: arr});
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
              text="Add Service"
              onPress={() => {
                props.navigation.goBack();
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
                    marginVertical: 10,
                  }}>
                  <View style={styles.Input}>
                    <FormInput
                      value={state.serviceName}
                      onChangeText={value => {
                        setState({...state, serviceName: value});
                      }}
                      placeHolder="Service Name"
                    />
                  </View>
                  <View style={styles.Input}>
                    <FormInput
                      value={state.description}
                      onChangeText={value => {
                        setState({...state, description: value});
                      }}
                      multiLine
                      height={124}
                      placeHolder="Service Descripton"
                    />
                  </View>

                  <View style={styles.Input}>
                    <FormInput
                      keyboardType={'number-pad'}
                      value={state.price}
                      onChangeText={value => {
                        setState({...state, price: value});
                      }}
                      placeHolder="Service Price"
                    />
                  </View>
                  <View style={styles.Input}>
                    <FormInput
                      value={state.pricingNote}
                      onChangeText={value => {
                        setState({...state, pricingNote: value});
                      }}
                      multiLine
                      height={124}
                      placeHolder="Pricing Note Like Per Hour Or Any Specific Info (Optional)"
                    />
                  </View>
                  <View style={styles.Input}>
                    <FormInput
                      value={state.state}
                      onChangeText={value => {
                        setState({...state, state: value});
                      }}
                      placeHolderColor="#grey"
                      placeHolder="State"
                    />
                  </View>
                  <View style={styles.Input}>
                    <FormInput
                      value={state.city}
                      onChangeText={value => {
                        setState({...state, city: value});
                      }}
                      placeHolderColor="grey"
                      placeHolder="City"
                    />
                  </View>
                </View>

                {/* <Avatar
                    source={Images.Pictures.productcackImg3}
                    style={styles.cakeimg}
                    resizeMode="contain"
                  /> */}
                {state.selectedFiles.length > 0 && (
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
                )}

                <View
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    // marginVertical: 10,
                    flexDirection: 'row',
                    width: '90%',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      props.navigation.navigate('Homes', {
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
                    Upload Photo & Video<Text styl={{color: 'red'}}>*</Text>
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: '80%',
                alignSelf: 'center',
                marginBottom: 100,
                marginVertical: 10,
              }}>
              {!state.city ||
              !state.serviceName ||
              !state.state ||
              !state.price ||
              !state.description ||
              state.selectedFiles.length <= 0 ? (
                <AppButton
                  isLoading={isLoading}
                  LinearColor1={'#5DF7B8'}
                  LinearColor2={'#3109FB'}
                  color={'white'}
                  borderWidth={0.5}
                  borderColor={'#707070'}
                  backgroundColor={'#FFFFFF'}
                  label="Post Now"
                  // onPress={() =>
                  //   props.navigation.replace('MyTabs', {screen: 'home'})
                  // }
                  onPress={() => showToast('error', 'All Fields are required')}
                />
              ) : (
                <AppButton
                  LinearColor1={'#5DF7B8'}
                  LinearColor2={'#3109FB'}
                  color={'white'}
                  borderWidth={0.5}
                  borderColor={'#707070'}
                  backgroundColor={'#FFFFFF'}
                  label="Post Now"
                  // onPress={() =>
                  //   props.navigation.replace('MyTabs', {screen: 'home'})
                  // }
                  onPress={servicePostHandler}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default AddServices;
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
    // alignSelf: 'center'
  },
  whitebox: {
    width: '90%',
    // height: '80%',
    // paddingBottom: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    elevation: 2,
  },
  Input: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 8,
    borderWidth: 0.4,
    borderRadius: 10,
    borderColor: '#aaa',
  },
  profilerow: {
    flexDirection: 'row',
  },
  cack: {
    width: '100%',
    height: '100%',
  },
});
