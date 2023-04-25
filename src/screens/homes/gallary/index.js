import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  hidden,
  StatusBar,
  statusBarTransition,
  statusBarStyle,
  FlatList,
  Image,
  Platform,
  PermissionsAndroid,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../../constants';
import DocumentPicker from 'react-native-document-picker';
import {Header} from '../../../components';
import {Icon} from 'react-native-elements';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import SelectDropdown from 'react-native-select-dropdown';

const Gallary = props => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [multiSelect, setMultiSelect] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const setState = props?.route?.params?.setState
    ? props?.route?.params?.setState
    : props?.setState;
  const state = props?.route?.params?.state
    ? props?.route?.params?.state
    : props?.state;
  const setVisible = props?.route?.params?.setVisible
    ? props?.route?.params?.setVisible
    : props?.setVisible;
  const visible = props?.route?.params?.visible
    ? props?.route?.params?.visible
    : props?.visible;
  const setGalleryVisible = props?.setGalleryVisible;
  const galleryVisible = props?.galleryVisible;
  const [selectedData, setSelectedData] = useState(state.selectedFiles);
  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }
  async function getVideosFromGallary() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.getPhotos({first: 21, assetType: 'Videos'}).then(album => {
      const newArr = album.edges.map(item => {
        const newObj = {
          node: item.node,
          isSelect: false,
        };
        return newObj;
      });
    });
  }
  async function getPhotosFromGallary() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    const album = await CameraRoll.getAlbums();
    setAlbums(album);
  }

  useEffect(() => {
    // if(statusImage.length === 0){
    // console.log(Platform.OS)
    getPhotosFromGallary();
    // getVideosFromGallary();
    // }
  }, []);

  const fetchAlbums = async index => {
    // console.log('index of album', index);
    const count = albums[index]?.count;
    CameraRoll.getPhotos({
      first: count,
      groupTypes: 'Album',
      groupName: albums[index]?.title,
      assetType: 'All',
    }).then(albums => {
      // console.log('albums>>>>>>>',albums)
      const newArr = albums.edges.map(item => {
        // console.log('item>>>>>>>>>>>>>>>>>>>>>>', item.node.type);
        const newObj = {
          node: item.node,
          isSelect: false,
          caption: '',
          type: item.node.type,
        };
        return newObj;
      });
      // console.log(newArr);
      setData1(newArr);
      setData(newArr);
    });
    const arr = [];
    albums.map(item => {
      arr.push(item.title);
    });
    setDropdownData([...arr]);
  };
  useEffect(() => {
    // console.log('state.selectedFiles', state.selectedFiles);
    if (albums?.length > 0) {
      if (state.selectedFiles.length > 0) {
        let indexx = 0;
        albums.map((item, index) => {
          if (state.selectedFiles[0].node.group_name == item.title) {
            indexx = index;
          }
        });
        fetchAlbums(indexx);
      } else {
        fetchAlbums(0);
      }
    }
  }, [albums]);

  const checkIsSelectFile = () => {
    if (selectedData?.length >= 1 && selectedData[0]?.isSelect == true) {
      const arr = [];
      data?.map((item, index) => {
        const ddd = selectedData.find(
          items => item.node.image.uri == items.node.image.uri,
        );
        if (ddd) {
          data[index].isSelect = true;
          setData1([...data]);
          setMultiSelect(true);
        }
      });
    } else if (
      selectedData?.length == 1 &&
      selectedData[0]?.isSelect == false
    ) {
      const arr = [];
      data?.map((item, index) => {
        const ddd = selectedData.find(
          items => item.node.image.uri == items.node.image.uri,
        );
        if (ddd) {
          // if (!items.isSelect)
          // if()
          data[index].isSelect = true;
          arr.push(data[index]);
          setData1([...data]);
          setSelectedData([...arr]);
          setMultiSelect(true);
        }
      });
    }
  };
  useEffect(() => {
    checkIsSelectFile();
  }, [data]);
  // const contentPicker = async index => {
  //   try {
  //     const results = await DocumentPicker.pickMultiple({
  //       type: [DocumentPicker.types.video],
  //       //There can me more options as well find above
  //     });
  //     const result = [];
  //     for (const res of results) {
  //       result.push({
  //         type: res.type,
  //         uri: res.uri,
  //         fileName: 'video',
  //       });
  //     }
  //   } catch (err) {
  //     //Handling any exception (If any)
  //     if (DocumentPicker.isCancel(err)) {
  //       //If user canceled the document selection
  //       // alert('Canceled from multiple doc picker');
  //     } else {
  //       //For Unknown Error
  //       alert('Unknown Error: ' + JSON.stringify(err));
  //       throw err;
  //     }
  //   }
  // };

  const selectImage = index => {
    const arr = [...data];

    arr[index].isSelect = true;
    const arr1 = [...selectedData];
    arr1.push(arr[index]);

    setData(arr);
    setSelectedData(arr1);
  };
  const unSelectImage = indexx => {
    const arr = [...data];
    arr[indexx].isSelect = false;
    const arr1 = [...selectedData];

    setData(arr);
    let saveIndex;
    const dd = arr1.find((item, index) => {
      if (item.node.image.uri == arr[indexx].node.image.uri) {
        saveIndex = index;
        return item;
      }
    });
    if (dd) {
      arr1.splice(saveIndex, 1);
      setSelectedData(arr1);

      setState && setState({...state, selectedFiles: arr1});
      if (arr1.length == 0) {
        setMultiSelect(false);
      }
    }
  };
  const selectSingleFile = index => {
    const file = [];

    file.push(data[index]);
    if (setState) {
      // setContent([...file]);
      setState({...state, selectedFiles: file});
      if (setVisible) {
        setVisible(!visible);
      }
      props?.route?.params?.setState
        ? props?.navigation.goBack()
        : setGalleryVisible(!galleryVisible);
    }
  };

  const resetData = () => {
    setSelectedData([]);
    const arr = [];

    data.map(item => {
      item.isSelect = false;
      arr.push(item);
    });

    setData([...arr]);
    setData1([...arr]);
    setState({...state, selectedFiles: []});
  };
  return (
    <ImageBackground
      style={styles.imageContainer}
      source={Images.Pictures.appBg}>
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#000"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <View style={styles.screenHeader}>
          <Header
            BAckButton
            textCenter
            // rightText
            multiSelect={
              selectedData.length > 0 && multiSelect ? multiSelect : false
            }
            text="Gallary"
            onPress={() => {
              props?.route?.params?.setState
                ? props?.navigation?.goBack()
                : setGalleryVisible(!galleryVisible);
            }}
            onSelectFile={() => {
              setState({...state, selectedFiles: selectedData});
              if (setVisible) {
                setVisible(!visible);
              }
              props?.route?.params?.setState
                ? props?.navigation?.goBack()
                : setGalleryVisible(!galleryVisible);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '95%',
          }}>
          <View style={{marginLeft: 10, flexDirection: 'row'}}>
            <TouchableOpacity>
              {/* <Text>{albums[0]?.title}</Text> */}
              <SelectDropdown
                data={dropdownData}
                defaultButtonText={
                  selectedData[0]?.node?.group_name
                    ? selectedData[0]?.node?.group_name
                    : albums[0]?.title
                }
                statusBarTranslucent
                renderDropdownIcon={isOpened => {
                  return isOpened ? (
                    <Icon name="angle-up" type="font-awesome" color="black" />
                  ) : (
                    <Icon name="angle-down" type="font-awesome" color="black" />
                  );
                }}
                dropdownStyle={styles.dropdown4DropdownStyle}
                dropdownIconPosition="right"
                buttonStyle={styles.dropdown1BtnStyle}
                onSelect={(selectedItem, index) => {
                  // console.log(selectedItem, index);
                  fetchAlbums(index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // console.log(item);
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Button
              onPress={() => {
                if (multiSelect == true) {
                  setMultiSelect(!multiSelect);
                  resetData();
                } else {
                  setMultiSelect(!multiSelect);
                }
              }}
              title="Select Multiple"
              color={multiSelect ? '#841584' : 'silver'}
              // accessibilityLabel="Learn more about this purple button"
            />
            {/* <Button na></Button> */}
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
            flexWrap: 'wrap',
            width: '100%',
            marginLeft: 10,
          }}>
          <FlatList
            numColumns={3}
            showsVerticalScrollIndicator={false}
            data={data1}
            // extraData={multiSelect}
            renderItem={({item, index}) => {
              // console.log('tem', item);
              return (
                <View style={styles.imgview}>
                  {!data1[index].isSelect ? (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        if (!multiSelect) {
                          selectSingleFile(index);
                        } else {
                          selectImage(index);
                        }
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}>
                      <View
                        style={{
                          width: '90%',
                          height: '100%',
                        }}>
                        <Image
                          source={{uri: item.node.image.uri}}
                          resizeMode="contain"
                          style={{
                            width: '100%',
                            height: '100%',
                            // borderRadius: 10,
                            borderWidth: 1,
                          }}
                        />
                        {item.node.type.split('/')[0] == 'video' && (
                          <View
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 10,
                              borderWidth: 35,
                              marginTop: 30,
                              backgroundColor: '#eee',
                              justifyContent: 'center',
                              alignSelf: 'center',
                              opacity: 0.45,
                              zIndex: 10,
                              position: 'absolute',
                            }}>
                            <Image
                              source={Images.Icons.play}
                              resizeMode="contain"
                              style={{
                                alignSelf: 'center',
                                width: '90%',
                                height: '100%',
                              }}
                            />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        unSelectImage(index);
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}>
                      <View
                        style={{
                          width: '90%',
                          height: '100%',
                        }}>
                        <Image
                          source={{uri: item.node.image.uri}}
                          resizeMode="contain"
                          style={{
                            width: '100%',
                            height: '100%',
                            // borderRadius: 10,
                            borderColor: 'red',

                            borderWidth: 2,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Gallary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    // backgroundColor: '#ffff',
  },
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
  dropdown1BtnStyle: {
    width: 150,
    height: 40,
    backgroundColor: '#FFF',
    // borderRadius: 8,
    // borderWidth: 1,
    borderBottomWidth: 1,
    // borderColor: '#444',
  },
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF', marginTop: 25},
  imgview: {
    width: '33%',
    height: 130,
    marginBottom: 15,
    // borderRadius: 15,
  },
  whitebox: {
    width: '90%',
    // height: '80%',
    paddingTop: 5,
    paddingBottom: 20,
    // borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    elevation: 2,
  },
});
