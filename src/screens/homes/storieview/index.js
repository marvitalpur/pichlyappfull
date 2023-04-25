import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'native-base';
import {Images} from '../../../constants';
import {Avatar} from 'react-native-elements';
import * as Progress from 'react-native-progress';
import {FlatList} from 'react-native';
import {Modal} from 'react-native';
const StorieView = props => {
  const data = props?.route?.params?.data || [];
  const [view, setView] = useState(false);

  console.log('inside story data', data, view);
  const statusData = [
    {
      imgName: Images.Pictures.highlight,
      imgWidth: 59,
      imgHeight: 59,
      borderRadius: 19,
      borderColor: '#3729F2',
      borderWidth: 2,
      width: 61,
      height: 61,
      text: 'Highlight',
      onPress: () =>
        props.navigation.navigate('Homes', {
          screen: 'storyreplay',
          params: {
            state: state,
            setState: setState,
          },
        }),
    },
    {
      imgName: Images.Pictures.Friendship,
      imgWidth: 59,
      imgHeight: 59,
      borderRadius: 19,
      borderColor: '#3729F2',
      borderWidth: 2,
      width: 61,
      height: 61,
      text: ' Friendship',
      onPress: () =>
        props.navigation.navigate('Homes', {
          screen: 'storyreplay',
          params: {
            state: state,
            setState: setState,
          },
        }),
    },
    {
      imgName: Images.Pictures.statusImg3,
      imgWidth: 59,
      imgHeight: 59,
      borderRadius: 19,
      borderColor: '#3729F2',
      borderWidth: 2,
      width: 61,
      height: 61,
      text: 'Food',
      onPress: () =>
        props.navigation.navigate('Homes', {
          screen: 'storyreplay',
          params: {
            state: state,
            setState: setState,
          },
        }),
    },
    {},
    {},
    {},
    {},
  ];
  return (
    <ImageBackground
      style={styles.imageContainer}
      source={{uri: 'https://wallpaperaccess.com/full/840746.jpg'}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Progress.Bar
          style={{marginTop: 10}}
          animated={true}
          indeterminate={true}
          color="white"
          width={300}
        />
        <View style={styles.screenHeader}>
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
          <Avatar size={'small'} source={Images.Pictures.statusImg1} />
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 15, color: '#fff'}}>Jon moxley</Text>
            <Text style={{fontSize: 15, color: '#fff'}}>45 Min</Text>
          </View>
        </View>
        <View style={styles.Body}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: '600',
            }}></Text>
          {/* <View>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
              Jon
            </Text>
          </View> */}
        </View>

        {/* view stories */}
        {!view && (
          <TouchableOpacity
            onPress={() => {
              setView(!view);
            }}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
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

            <Text style={{color: '#fff', fontSize: 15, fontWeight: '300'}}>
              40 View
            </Text>
          </TouchableOpacity>
        )}

        <View></View>
        {/* <View style={styles.inputcontainer}>
          <TextInput
            placeholder="Reply on status"
            onChangeText={text => setstatus(text)}
            style={{width: '75%'}}
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '20%',
              marginLeft: 25,
            }}>
            <TouchableOpacity>
              <Icon
                type="Feather"
                name="send"
                style={{
                  color: '#4059E4',
                  fontSize: 24,
                }}
              />
            </TouchableOpacity>
          </View>
        </View> */}
      </ScrollView>
      {view && (
        <Modal
          presentationStyle="overFullScreen"
          visible={view}
          transparent
          onRequestClose={() => setView(!view)}
          // onDismiss={() => setView(!view)}
          animationType="slide">
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

              <Text style={{color: '#fff', fontSize: 15, fontWeight: '300'}}>
                40 View
              </Text>
            </View>
            <FlatList
              data={statusData}
              style={{height: 300}}
              showsVerticalScrollIndicator={false}
              renderItem={item => {
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
                      source={Images.Pictures.statusImg1}
                    />
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 15, color: '#fff'}}>
                        Jon moxley
                      </Text>
                      <Text style={{fontSize: 15, color: '#fff'}}>45 Min</Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </Modal>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Body: {
    backgroundColorL: 'purple',
    width: '90%',
    height: '80%',
    alignSelf: 'center',
    // alignItems: 'flex-end',
    justifyContent: 'center',
  },
  inputcontainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',

    // alignItems: 'flex-end',
  },
  screenHeader: {
    width: '100%',
    height: 30,
    marginTop: 20,
    // alignSelf: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    // alignItems: 'center',
  },
});
export default StorieView;
