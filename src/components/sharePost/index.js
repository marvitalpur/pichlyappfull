import {StyleSheet, Text, View, Appearance} from 'react-native';
import React from 'react';
import {Modal} from 'react-native';
import {useEffect} from 'react';
import {BASE_URL, userRequest} from '../../makeRequest';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {Avatar, Overlay} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {AppButton} from '../appButton';
import socket from '../../socket';

const SharePost = ({isVisible, setIsVisible, navigation, postId, type}) => {
  const user = useSelector(state => state.user.loggedInUser);
  const [searchKey, setSearchkey] = useState('');
  const [data, setData] = useState([]);
  let colorScheme = Appearance.getColorScheme();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await userRequest('post', `/searchUser/${user._id}`, {
          search: searchKey ? searchKey : ' ',
        });
        // console.log('response >', res.data.data);
        setData(res.data.data);
      } catch (err) {
        console.log('error', err.message);
      }
    };
    fetch();
  }, []);
  const toggleOverlay = () => {
    setIsVisible(!isVisible);
  };
  const handleSharePost = async id => {
    try {
      console.log('pressed>>>>>>>>>>>>>>>>>', type);
      let url = BASE_URL.split('/api');
      socket.emit('createChatRoom', {
        myId: user._id,
        userId: id,
      });
      socket.off('createChatRoom').on('createChatRoom', data => {
        // console.log('data', data);
        socket.emit('createMessage', {
          myId: user._id,
          userId: id,
          message: `${url}/postId=${postId}${type.charAt(0)}`,
          type: 'url',
          room: data.data.members[0]._id + data.data.members[1]._id,
        });
        navigation.navigate('Homes', {
          screen: 'chatscreen',
          params: {
            member: data.data.members.filter(
              item => item._id.toString() != user._id.toString(),
            ),
            members: data.data.members,
          },
        });
        // console.log('navigation', navigation);
      });
    } catch (err) {
      console.log('err>>>>>>>>>>>>>', err);
    }
  };
  return (
    <View>
      {/* <Modal
        visible={isVisible}
        onRequestClose={() => setIsVisible(!isVisible)}>
        <View style={{width: '90%', height: '70%', backgroundColor: 'yellow'}}>
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
              top: 10,
              alignSelf: 'center',
            }}>
            <View
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                height: 60,
                marginLeft: 15,
              }}>
              <TextInput
                placeholderTextColor={(colorScheme = 'dark' ? 'grey' : 'grey')}
                multiline={true}
                placeholder="Search Friend"
                value={searchKey}
                onChangeText={text => {
                  setSearchkey(text.trimStart());
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
                activeOpacity={0.7}
                onPress={() => console.log('hello')}>
                <Icon
                  name="send"
                  type="Feather"
                  style={{color: '#4059E4', marginRight: 10}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}
      <Overlay
        isVisible={isVisible}
        overlayStyle={styles.overlayStyles}
        onBackdropPress={toggleOverlay}>
        <View>
          <Text style={{fontSize: 20, alignSelf: 'center', color: 'black'}}>
            Send To{' '}
          </Text>
          <ScrollView>
            {data.map((item, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    margin: 5,
                    // backgroundColor: 'yellow',
                    width: '90%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}>
                  <View style={{marginLeft: 15}}>
                    <Avatar
                      rounded
                      size={'medium'}
                      resizeMode="contain"
                      source={{
                        uri: item.profileImg
                          ? item.profileImg
                          : 'https://img.icons8.com/emoji/48/000000/man-with-mustache-medium-light-skin-tone.png',
                      }}
                    />
                  </View>
                  <Text
                    style={{fontSize: 20, alignSelf: 'center', color: 'black'}}>
                    {item.firstName + ' ' + item.lastName}
                  </Text>
                  <View style={{width: '25%'}}>
                    <AppButton
                      onPress={() => {
                        handleSharePost(item._id);
                      }}
                      LinearColor2={'#5DF7B8'}
                      LinearColor1={'#3109FB'}
                      color={'white'}
                      height={30}
                      borderRadius={5}
                      borderWidth={0.5}
                      borderColor={'#707070'}
                      backgroundColor={'#FFFFFF'}
                      label={'Send'}
                    />
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Overlay>
    </View>
  );
};

export {SharePost};

const styles = StyleSheet.create({
  overlayStyles: {
    width: '90%',
    height: 500,
    // backgroundColor: '#eae',
    borderRadius: 10,
    overflow: 'hidden',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
