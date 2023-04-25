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
  FlatList,
  statusBarTransition,
} from 'react-native';
import {AppButton, FormInput, Header} from '../../../components';
import {Images} from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import {Avatar, Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {userRequest} from '../../../makeRequest';
import {showToast} from '../../../showToast';

const Addproduct = props => {
  const [img, setimg] = useState([]);
  const user = useSelector(state => state.user.loggedInUser);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    productName: '',
    description: '',
    state: '',
    city: '',
    price: '',
    selectedFiles: [],
  });
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  // console.log('images================', JSON.stringify(img, null, 2));

  const picker = () => {
    ImagePicker.openPicker({multiple: true}).then(images => {
      //   console.log(images[0].path);
      setimg(images[0].path);
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

  console.log('selectedFiles', state.selectedFiles);

  const productPostHandler = async () => {
    try {
      const formData = new FormData();
      formData.append('productName', state.productName);
      formData.append('description', state.description);
      formData.append('state', state.state);
      formData.append('city', state.city);
      formData.append('price', state.price);

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
        `/createProductPost/${user._id}`,
        formData,
      );
      // console.log('response==============', response);
      if (response.status == 200) {
        setIsLoading(false);
        // console.log('response', response.data.message);
        showToast('success', response.data.message);

        props.navigation.replace('MyTabs', {screen: 'home'});
      }
    } catch (err) {
      setIsLoading(false);
      console.log('ygyygcygctyh', err);
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
              text="Add Product"
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
                    marginVertical: 20,
                  }}>
                  <View style={{marginVertical: 5}}>
                    <FormInput
                      value={state.productName}
                      onChangeText={value =>
                        setState({...state, productName: value})
                      }
                      placeHolder="Product name "
                    />
                  </View>
                  <View style={{marginVertical: 5}}>
                    <FormInput
                      value={state.description}
                      onChangeText={description =>
                        setState({...state, description})
                      }
                      multiLine
                      height={124}
                      placeHolder="Product Discription"
                    />
                  </View>
                  <View style={{marginVertical: 5}}>
                    <FormInput
                      keyboardType={'number-pad'}
                      value={state.price}
                      onChangeText={price => setState({...state, price})}
                      placeHolderColor="grey"
                      placeHolder="Price"
                    />
                  </View>

                  <View style={{marginVertical: 5}}>
                    <FormInput
                      value={state.state}
                      onChangeText={value => setState({...state, state: value})}
                      placeHolderColor="grey"
                      placeHolder="State"
                    />
                  </View>
                  <View style={{marginVertical: 5}}>
                    <FormInput
                      value={state.city}
                      onChangeText={value => setState({...state, city: value})}
                      placeHolderColor="grey"
                      placeHolder="City"
                    />
                  </View>
                </View>
                {state.selectedFiles.length > 0 && (
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    data={state?.selectedFiles}
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
                              height: '100%',
                              // marginTop: 10,
                              // backgroundColor: 'yellow',
                              // height: 200,
                              // marginBottom: 20,
                              marginLeft: 1,
                            }}>
                            <Image
                              style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'cover',
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
                    flexDirection: 'row',
                    width: '90%',
                    alignItems: 'center',
                    alignSelf: 'center',
                    paddingBottom: 15,
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
              style={{width: '90%', alignSelf: 'center', marginVertical: 20}}>
              <View
                style={{width: '70%', alignSelf: 'center', marginVertical: 25}}>
                {!state.city ||
                !state.description ||
                !state.price ||
                !state.productName ||
                !state.state ||
                state.selectedFiles.length <= 0 ? (
                  <AppButton
                    disabled={true}
                    LinearColor1={'#5DF7B8'}
                    LinearColor2={'#3109FB'}
                    color={'white'}
                    borderWidth={0.5}
                    borderColor={'#707070'}
                    backgroundColor={'#FFFFFF'}
                    label="Post Now"
                    // onPress={() =>
                    //
                    // }
                    onPress={() => {
                      showToast('error', 'All Fields are required');
                    }}
                  />
                ) : (
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
                    //
                    // }
                    onPress={productPostHandler}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default Addproduct;
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
  cakes: {
    width: '90%',
    // height: 150,
    // backgroundColor: 'red',
  },
  cakeimgview: {
    width: '100%',
    height: 90,
    marginLeft: 10,
    marginBottom: 10,
    // flexDirection: 'row',
  },
  cakeimg: {
    width: '100%',
    height: '100%',
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
    // minHeight: 700,

    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    elevation: 2,
  },

  profilerow: {
    flexDirection: 'row',
  },
});
