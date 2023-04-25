import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity,
  statusBarStyle,
  statusBarTransition,
  StatusBar,
  hidden,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Box, Header, StatusView} from '../../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import {Images} from '../../../constants';
import Swipeable from 'react-native-swipeable';
import {Item} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-gesture-handler';
import socket from '../../../socket';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const ChatScreen1 = ({navigation}) => {
  const user = useSelector(state => state.user.loggedInUser);
  const isFocused = useIsFocused();
  const [deleteState, setDeleteState] = useState(false);
  const [allChats, setAllChats] = useState([]);
  const [kuchBhi, setKuchBhi] = useState([]);
  const [findChat, setFindChat] = useState([]);
  const [chatScreenData, setChatScreenData] = useState([]);
  const [value, setValue] = useState('');
  const [room, setRoom] = useState([]);
  const [room1, setRoom1] = useState(false);

  // const [refreshFlatList, setRefreshFlatList] = useState(false);

  // const [lastMessage, setLastMessage] = useState('');

  // const statusData = [
  //   {
  //     imgName: Images.Pictures.statusImg1,
  //     imgWidth: 59,
  //     imgHeight: 59,
  //     borderRadius: 19,
  //     borderColor: '#3729F2',
  //     borderWidth: 2,
  //     width: 61,
  //     height: 61,
  //     text: 'John',
  //   },
  //   {
  //     imgName: Images.Pictures.statusImg2,
  //     imgWidth: 59,
  //     imgHeight: 59,
  //     borderRadius: 19,
  //     borderColor: '#3729F2',
  //     borderWidth: 2,
  //     width: 61,
  //     height: 61,
  //     text: 'Veni',
  //   },
  //   {
  //     imgName: Images.Pictures.statusImg3,
  //     imgWidth: 59,
  //     imgHeight: 59,
  //     borderRadius: 19,
  //     borderColor: '#3729F2',
  //     borderWidth: 2,
  //     width: 61,
  //     height: 61,
  //     text: 'Bella',
  //   },
  //   {
  //     imgName: Images.Pictures.statusImg4,
  //     imgWidth: 59,
  //     imgHeight: 59,
  //     borderRadius: 19,
  //     borderColor: '#3729F2',
  //     borderWidth: 2,
  //     width: 61,
  //     height: 61,
  //     text: 'Saher',
  //   },
  //   {
  //     imgName: Images.Pictures.statusImg5,
  //     imgWidth: 59,
  //     imgHeight: 59,
  //     borderRadius: 19,
  //     borderColor: '#3729F2',
  //     borderWidth: 2,
  //     width: 61,
  //     height: 61,
  //     text: 'Bella',
  //   },
  //   {
  //     imgName: Images.Pictures.statusImg1,
  //     imgWidth: 59,
  //     imgHeight: 59,
  //     borderRadius: 19,
  //     borderColor: '#3729F2',
  //     borderWidth: 2,
  //     width: 61,
  //     height: 61,
  //     text: 'John',
  //   },
  //   {
  //     imgName: Images.Pictures.statusImg2,
  //     imgWidth: 59,
  //     imgHeight: 59,
  //     borderRadius: 19,
  //     borderColor: '#3729F2',
  //     borderWidth: 2,
  //     width: 61,
  //     height: 61,
  //     text: 'Veni',
  //   },
  //   {
  //     imgName: Images.Pictures.statusImg3,
  //     imgWidth: 59,
  //     imgHeight: 59,
  //     borderRadius: 19,
  //     borderColor: '#3729F2',
  //     borderWidth: 2,
  //     width: 61,
  //     height: 61,
  //     text: 'Bella',
  //   },
  //   {
  //     imgName: Images.Pictures.statusImg4,
  //     imgWidth: 59,
  //     imgHeight: 59,
  //     borderRadius: 19,
  //     borderColor: '#3729F2',
  //     borderWidth: 2,
  //     width: 61,
  //     height: 61,
  //     text: 'Saher',
  //   },
  //   {
  //     imgName: Images.Pictures.statusImg5,
  //     imgWidth: 59,
  //     imgHeight: 59,
  //     borderRadius: 19,
  //     borderColor: '#3729F2',
  //     borderWidth: 2,
  //     width: 61,
  //     height: 61,
  //     text: 'Bella',
  //   },
  // ];

  useEffect(() => {
    try {
      socket.emit('getAllChats', {myId: user._id});
    } catch (err) {
      console.log(err);
    }
  }, [isFocused, deleteState]);
  useEffect(() => {
    // console.log('caleddd>>>>>>>>>>>>');
    socket.off('getAllChats').on('getAllChats', data => {
      setAllChats([...data.data]);
      setFindChat([...data.data]);
      let arr = [];
      data.data.map(item => {
        let obj = {
          chatId: item._id,
          message: item?.messages[item?.messages?.length - 1]?.message,
          unSeen: item?.unSeen,
        };
        arr.push(obj);
      });
      setKuchBhi([...arr]);
      setChatScreenData([...arr]);
      // setKuchBhi([...arr]);
    });
  }, [isFocused, deleteState]);
  // console.log('deleteState', deleteState);
  useEffect(() => {
    // console.log('allChat', allChats[0]?._id);
  }, [allChats]);

  //  filter for search chat
  const filterChat = search => {
    console.log('search', search);

    if (search.trim().length > 0) {
      // regix for filterring by firstName lastName  and  UserName in an array
      const regex = new RegExp(search, 'i');

      const data = allChats?.filter(chat => {
        // console.log('chats', chat);
        if (chat?.members[0]?._id.toString() == user?._id.toString()) {
          return (
            regex.test(chat?.members[1]?.firstName) ||
            regex.test(chat?.members[1]?.lastName)
          );
        } else {
          return (
            regex.test(chat?.members[0]?.firstName) ||
            regex.test(chat?.members[0]?.lastName)
          );
        }
      });
      setFindChat([...data]);
      let arr = [];
      data.map(item => {
        let obj = {
          chatId: item._id,
          message: item?.messages[item?.messages?.length - 1]?.message,
          unSeen: item?.unSeen,
        };
        arr.push(obj);
      });
      setChatScreenData([...arr]);
      // setFindChat(data);
      // console.log(data);
    } else {
      setFindChat([...allChats]);
    }
  };

  useEffect(() => {
    console.log(' ', room);
    return () => {
      if (!room1) {
        console.log('un mount callled', room);
        if (room.length > 0) {
          room.map(item => {
            socket.emit('leaveChat', {room: item});
          });
        }
      }
    };
  }, [room, room1]);

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        animated={true}
        backgroundColor="#000"
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden}
      />
      <ImageBackground
        style={styles.imageContainer}
        source={Images.Pictures.appBg}>
        <View style={styles.Body}>
          <Text style={styles.chat}>Chat</Text>
          <View
            style={{
              width: '95%',
              borderWidth: 1,
              backgroundColor: '#fff',
              height: 45,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <AntDesign color="grey" size={18} name="search1" />
            <TextInput
              value={value}
              onChangeText={text => {
                filterChat(text);
                setValue(text);
              }}
              style={{width: '85%', height: '100%'}}
              placeholder="Search chat here"
            />
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            {/* <View style={{marginBottom: 10}}>
              <Text style={styles.message}>Quick Message</Text>
            </View>
            <View style={styles.statusBoxView}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={statusData}
                keyExtractor={(item, index) => index}
                renderItem={({item}) => {
                  return (
                    <View style={{paddingLeft: 10}}>
                      <StatusView
                        chatRoom={true}
                        imgName={item?.imgName}
                        width={item?.width}
                        height={item?.height}
                        imgWidth={item?.imgWidth}
                        imgHeight={item?.imgHeight}
                        text={item?.text}
                      />
                    </View>
                  );
                }}
              />
            </View> */}
            <View style={{}}>
              <Text style={styles.message}>Message</Text>
            </View>
            <View style={{marginBottom: 120}}>
              {findChat.length > 0 ? (
                findChat.map((item, index) => {
                  return (
                    // <View style={{}} key={item._id}>
                    <Box
                      room={room}
                      setRoom={setRoom}
                      setValue={setValue}
                      data={allChats}
                      kuchBhi={chatScreenData}
                      setKuchBhi={setChatScreenData}
                      SwipeableText
                      Image1={item.members}
                      members={item.members}
                      index={index}
                      member={item.members.filter(
                        i => i._id.toString() != user?._id.toString(),
                      )}
                      key={item._id.toString()}
                      name={item.name}
                      Nowtext={item.Nowtext}
                      setDeleteState={setDeleteState}
                      deleteState={deleteState}
                      messages={item.messages}
                      id={item._id}
                      messagenumber={item.messagenumber}
                      textmessage={item.textmessage}
                      unSeen={item.unSeen}
                      onPress={() => {
                        setRoom1(true);
                        navigation.navigate('Homes', {
                          screen: 'chatscreen',
                          params: {
                            member: item.members.filter(
                              item =>
                                item._id.toString() != user._id.toString(),
                            ),
                            members: item.members,
                            setRoom: setRoom,
                            room: room,
                            room1: room1,
                            setRoom1: setRoom1,
                            // setLastMessage,
                          },
                        });
                      }}
                    />
                    // </View>
                  );
                })
              ) : (
                <View></View>
              )}

              {/* }} */}
              {/* /> */}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default ChatScreen1;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Body: {
    backgroundColorL: 'purple',
    width: '90%',
    // height: '100%',
    alignSelf: 'center',
    paddingBottom: 30,
    marginBottom: 100,
  },
  chat: {
    marginTop: 25,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
  },
  message: {
    fontWeight: '700',
    fontSize: 18,
    color: 'grey',
    marginTop: 10,
  },
  horizental: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  box: {
    margin: 5,
    width: 64,
    height: 70,
    borderRadius: 20,
    borderColor: 'blue',
    borderWidth: 1.25,
    // backgroundColor: 'pink'
  },
  cardbox: {
    width: '100%',
    height: 80,
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    elevation: 4,
  },
  ImgView: {
    justifyContent: 'space-evenly',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'grey',
    marginLeft: 20,
  },
  vani: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  just_now_text: {
    color: 'blue',
    fontSize: 16,
  },
  btn: {
    width: 60,
    // padding: 2,
    // backgroundColor: 'red',
    textAlign: 'center',
  },
});
