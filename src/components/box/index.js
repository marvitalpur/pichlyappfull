import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Avatar} from 'react-native-elements';
import {Icon} from 'native-base';
import {userRequest} from '../../makeRequest';
import {useSelector} from 'react-redux';
import socket from '../../socket';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {useEvent} from 'react-native-reanimated';
const Box = ({
  name,
  textmessage,
  Nowtext,
  messagenumber,
  Image1,
  Press,
  navigation,
  onPress,
  Time,
  member,
  members,
  id,
  setDeleteState,
  deleteState,
  unSeen,
  kuchBhi,
  index,
  setKuchBhi,
  setValue,
  setRoom,
  room,
}) => {
  const isFocused = useIsFocused();
  const user = useSelector(state => state.user.loggedInUser);
  const [listData] = useState(
    Array(1)
      .fill('')
      .map((_, i) => ({key: `${i}`, text: `item #${i}`})),
  );
  const openRowRef = useRef(null);

  const onRowDidOpen = (rowKey, rowMap) => {
    openRowRef.current = rowMap[rowKey];
  };

  const closeOpenRow = () => {
    if (openRowRef.current && openRowRef.current.closeRow) {
      openRowRef.current.closeRow();
    }
  };

  useEffect(() => {
    setValue('');
  }, []);

  useEffect(() => {
    socket.off('getLastMessage').on('getLastMessage', data => {
      let arr = [...kuchBhi];

      arr.map((item, i) => {
        if (item.chatId.toString() == data.data.chatId.toString()) {
          arr[i] = data.data;
        }
      });
    });
  }, [socket]);

  const handleDelete = async () => {
    try {
      socket.emit('deleteChat', {
        myId: user?._id,
        userId: member[0]._id,
        room: user?._id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    let mount = true;
    socket.off('deleteChat').on('deleteChat', data => {
      if (mount) {
        console.log('delete data', data.data);
        setDeleteState(prev => !prev);
      }
      return () => {
        mount = false;
      };
    });
  }, []);
  // get last message using id
  useEffect(() => {
    if (setRoom) {
      // if(room)
      // console.log("roooooommmm",members[0]._id + members[1]._id)
      let obj = members[0]._id + members[1]._id;
      let arr = room;

      if (!room.includes(obj)) {
        arr?.push(obj);
        setRoom([...arr]);
      }
    }
    socket.emit('getLastMessage', {
      myId: user?._id,
      userId: member[0]._id,
      room: members[0]._id + members[1]._id,
    });
  }, [isFocused]);

  // get last message using id
  useEffect(() => {
    try {
      socket.off('getLastMessage').on('getLastMessage', data => {
        let arr = kuchBhi;
        arr.map((item, i) => {
          if (item.chatId.toString() == data.data.chatId.toString()) {
            arr[i] = {...data.data};
          }
        });
        if (arr.length > 0) {
          setKuchBhi([...arr]);
        }
      });
    } catch (err) {
      console.log(err, 'err');
    }
  }, [kuchBhi]);

  const RenderItem = ({data1, iid}) => {
    const filter = data1.filter(item => {
      return item.chatId == iid;
    });
    // console.log('fileter array', filter);
    const unseen = filter[0]?.unSeen.filter(item => item.user == user?._id);
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{}}>
        <View style={styles.rowFront}>
          <View style={{marginLeft: 10, marginTop: 5}}>
            <Avatar
              rounded
              size={'medium'}
              source={{uri: member[0].profileImg}}
            />
          </View>

          <View style={{width: '55%', marginLeft: 15, marginTop: 10}}>
            <Text style={styles.vani}>
              {member[0].firstName + ' ' + member[0]?.lastName}
            </Text>
            <Text style={styles.othertxt}>
              {filter[0]?.message?.type == 'text'
                ? filter[0]?.message?.message
                : filter[0]?.message?.type == 'audio'
                ? 'audio'
                : filter[0]?.message?.type == 'image'
                ? 'image'
                : filter[0]?.message?.type == 'url'
                ? 'url'
                : 'video'}
            </Text>
          </View>

          <View
            style={{
              width: '30%',
              marginLeft: -20,
            }}>
            <Text style={{fontSize: 10}}>
              {moment(filter[0]?.message?.createdAt).fromNow()}
            </Text>
            {unseen?.length != 0 && (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20,
                  backgroundColor: Time ? null : 'blue',
                  marginVertical: 4,
                  marginLeft: 12,
                }}>
                <Text style={{color: '#ffff', textAlign: 'center'}}>
                  {unseen?.length}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderHiddenItem = () => (
    <View
      style={{
        backgroundColor: 'red',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 80,
        borderRadius: 16,

        // borderWidth: 1,
        backgroundColor: 'red',
        width: '24%',
        flex: 1,
        elevation: 1,
        height: 90,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignSelf: 'flex-end',

        marginTop: 10,
      }}>
      <TouchableOpacity onPress={handleDelete}>
        <Icon
          name="trash"
          type="FontAwesome5"
          style={{
            color: 'white',

            marginRight: 20,
            // alignself: 'center',
            marginTop: 20,
            flex: 1,
            marginRight: 24,
            marginLeft: 34,
            // alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <TouchableOpacity onPress={Press}>
        <SwipeListView
          disableRightSwipe={true}
          data={listData}
          renderItem={() => <RenderItem iid={id} data1={kuchBhi} />}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          // extraData={refresh}
          rightOpenValue={-60}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={1000}
          onRowDidOpen={onRowDidOpen}
        />
      </TouchableOpacity>
    </>
  );
};
export {Box};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backTextWhite: {
    color: 'white',
  },
  rowFront: {
    activeOpacity: 0.95,
    alignItems: 'center',
    backgroundColor: '#ffff',
    elevation: 5,
    marginTop: 5,
    height: 82,
    borderRadius: 10,
    flexDirection: 'row',
  },
  rowBack: {
    alignItems: 'center',

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingLeft: 15,
  },
  backRightBtn: {
    position: 'absolute',
    top: 5,
    width: 97,
    height: 82,
  },

  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    width: 97,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  closeButton: {
    backgroundColor: 'white',
    bottom: 30,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'black',
    padding: 15,
    position: 'absolute',
    right: 30,
  },
  vani: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },
  othertxt: {
    color: 'grey',
    fontSize: 13,
    fontWeight: '700',
  },
});
