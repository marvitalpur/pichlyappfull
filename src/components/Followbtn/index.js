import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Appearance,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import socket from '../../socket';
import {updateUser} from '../../redux/userRedux';
import {publicRequest} from '../../makeRequest';

const Followbtn = ({
  Image1,
  BoldText,
  LighterText,
  User,
  followbutton,
  follow,
  unfollow,
  Location,
  borderWidth,
  color,
  color1,
  color2,
  color3,
  color4,
  width,
  height,
  userprofile,
  item,
  userName,
  navigation,
  block,
  blockUserId,
  setBlockButton,
  blockButton,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.loggedInUser);
  const [state, setState] = useState(true);
  const [colorState, setColorsate] = useState(true);
  const [buttonHandle, setButtonHandle] = useState(false);
  const Click = () => {
    setState(unfollow);
    setColorsate(color);
  };
  const handleFollowUser = () => {
    socket.emit('follow', {userId: user._id, followId: item?._id});
    setButtonHandle(!buttonHandle);
  };
  const handleUnblockUser = async () => {
    try {
      const res = await publicRequest.put(`/blockUser/${user._id}`, {
        blockUserId,
      });
      if (res.status == 200) {
        const obj = {
          ...res.data.data,
          token: user.token,
        };
        // console.log(res.data);
        dispatch(updateUser(obj));
        setBlockButton(!blockButton);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    socket.off('follow').on('follow', data => {
      console.log('response', data);
      const obj = {...data.data.user, token: user?.token};

      dispatch(updateUser(obj));
      // console.log('ss', {...data.data.follower});
    });
  }, [buttonHandle]);
  return (
    <View>
      {User && (
        <View style={styles.rowstyle}>
          {userprofile && (
            <TouchableOpacity
              style={styles.texts}
              onPress={() => navigation?.navigate('profile', {user: item})}>
              {/* <View > */}
              <View style={styles.Pictures}>
                <Image
                  source={Image1}
                  resizeMode="contain"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 100,
                  }}
                />
              </View>
              <View style={styles.textes}>
                <Text style={styles.txt1}>{BoldText}</Text>

                <Text style={{marginLeft: 10}}>{'@' + userName}</Text>
                {/* <Text style={{fontSize: 12, marginTop: -4}}>{LighterText}</Text> */}
              </View>
              {/* </View> */}
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={block ? handleUnblockUser : handleFollowUser}
            disabled={user?._id == item?._id ? true : false}
            style={{
              borderWidth: borderWidth || 1,
              borderColor: 'grey',
              width: width || '28%',
              height: height || 32,
              alignSelf: 'center',
              backgroundColor: colorState === true ? color2 : color1,
              borderRadius: 10,
              // borderColor: 'black',
              justifyContent: 'center',
            }}>
            <LinearGradient
              color1={{x: 1, y: 0.0}}
              color2={{x: 1, y: 1.9}}
              colors={[
                // state === true ? '#5DF7B8' : 'white',
                user?.followings?.includes(item?._id) ? '#FFFFFF' : '#3109FB',
                user?.followings?.includes(item?._id) ? '#FFFFFF' : '#5DF7B8',
                // state === true ? '#3109FB' : 'white',
              ]}
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: colorState === true ? color3 : color4,
                  textAlign: 'center',
                }}>
                {user._id == item?._id
                  ? 'You'
                  : block
                  ? 'UnBlock'
                  : user?.followings?.includes(item?._id)
                  ? 'Unfollow'
                  : 'Follow'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export {Followbtn};
const styles = StyleSheet.create({
  textbox: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  txt1: {
    marginVertical: 3,
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  txt2: {
    marginVertical: 5,
    color: '#000',
    fontSize: 12,
  },
  rowstyle: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 5,
    padding: 4,
    paddingVertical: 10,
    // borderBottomWidth: 0.70,
    // borderBottomColor: '#aaa',
    flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  texts: {
    flexDirection: 'row',
    width: '74%',
  },
  btns: {
    width: 91,
    height: 25,
  },
  Pictures: {
    width: 38,
    height: 38,
  },
  textes: {
    justifyContent: 'center',
    marginLeft: 7,
    marginTop: -7,
  },
});
