import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Appearance,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Icon} from 'native-base';

import React, {useState, useEffect} from 'react';
import {Avatar} from 'react-native-elements';
import moment from 'moment';
import socket from '../../socket';
import {useSelector} from 'react-redux';
import {Images} from '../../constants';
const Comment = ({
  postComments,
  image,
  name,
  time,
  Radius,
  height,
  typesomething,
  message,
  setMessage,
  postId,
  setReplyState,
  replyState,
  setCommentId,
  setNewComment,
}) => {
  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setOrientation(isPortrait());
    });
  }, [Dimensions]);

  let colorScheme = Appearance.getColorScheme();
  const user = useSelector(state => state.user.loggedInUser);
  const [like, setLike] = useState(false);
  const handleReply = (name, id) => {
    // socket.emit('replyOnPost', {postId, commentId, userId: user._id});
    setCommentId(id);
    setReplyState(true);
    setNewComment(name);
  };
  // useEffect(() => {
  //   socket.on('likeComment', data => {
  //     console.log('data>>>>', data);
  //   });
  // }, [like]);
  const handlelikeComment = commentId => {
    try {
      socket.emit('likeComment', {postId, commentId, userId: user._id});
      setLike(!like);
    } catch (err) {
      console.log(err);
    }
  };
  const handleLikeReply = (commentId, replyId) => {
    try {
      socket.emit('likeReply', {postId, commentId, replyId, userId: user._id});
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.imageContainer}>
      <View style={{width: '100%'}}>
        <View style={{width: '90%', marginBottom: 5}}>
          {postComments?.comments.map((message, i) => {
            return (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    // alignItems: 'center',
                    marginTop: 10,
                    width: '95%',
                    alignSelf: 'center',
                  }}>
                  <Avatar
                    rounded
                    size={40}
                    source={{
                      uri: message?.commentBy?.profileImg
                        ? message?.commentBy?.profileImg
                        : 'https://img.icons8.com/glyph-neue/64/000000/user.png',
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 15,
                        marginLeft: 10,
                        fontWeight: 'bold',
                      }}>
                      {message?.commentBy?.firstName
                        ? message?.commentBy?.firstName +
                          message?.commentBy?.lastName
                        : 'Pitchly User'}
                    </Text>
                    <Text style={{color: '#000', marginLeft: 10}}>
                      {' '}
                      {message?.comment}{' '}
                    </Text>
                    <View style={{marginLeft: 10, flexDirection: 'row'}}>
                      <Text>{moment(message?.commentDate).toNow(true)}</Text>
                      <TouchableOpacity
                        onPress={() => handlelikeComment(message._id)}>
                        {message.likes.filter(item => item.likeBy == user._id)
                          .length == 0 ? (
                          <Text style={{marginLeft: 15}}>like</Text>
                        ) : (
                          <Text style={{marginLeft: 15, color: 'blue'}}>
                            like
                          </Text>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          const name =
                            '@' +
                            message?.commentBy?.firstName +
                            message?.commentBy?.lastName;
                          handleReply(name, message._id);
                        }}>
                        <Text style={{marginLeft: 15}}>Reply</Text>
                      </TouchableOpacity>
                    </View>
                    {message.replies.length > 0 &&
                      message.replies.map(item => (
                        <View
                          style={{
                            flexDirection: 'row',
                            // alignItems: 'center',
                            marginTop: 10,
                            width: '95%',
                            alignSelf: 'center',
                          }}>
                          <Avatar
                            rounded
                            size={30}
                            source={{uri: item?.replyBy?.profileImg}}
                          />
                          <View>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 15,
                                marginLeft: 10,
                                fontWeight: 'bold',
                              }}>
                              {item?.replyBy?.firstName +
                                item?.replyBy?.lastName}
                            </Text>
                            <Text style={{color: '#000', marginLeft: 10}}>
                              {' '}
                              {item?.reply}{' '}
                            </Text>
                            <View
                              style={{marginLeft: 10, flexDirection: 'row'}}>
                              <Text>{moment(item?.replyDate).toNow(true)}</Text>
                              <TouchableOpacity
                                onPress={() =>
                                  handleLikeReply(message._id, item._id)
                                }>
                                {item.likes.filter(
                                  data => data.likeBy == user._id,
                                ).length == 0 ? (
                                  <Text style={{marginLeft: 15}}>Like</Text>
                                ) : (
                                  <Text style={{marginLeft: 15, color: 'blue'}}>
                                    Like
                                  </Text>
                                )}
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  const name =
                                    '@' +
                                    item?.replyBy?.firstName +
                                    item?.replyBy?.lastName;
                                  handleReply(name, message._id);
                                }}>
                                <Text style={{marginLeft: 15}}>Reply</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      ))}
                  </View>
                </View>
              </>
            );
          })}
        </View>
      </View>
    </View>
  );
};
export {Comment};
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    // justifyContent: 'center',
  },
  screenContainer: {
    flex: 1,
  },

  topComponent: {
    width: '100%',
    backgroundColor: '#e7e',
    height: 90,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    zIndex: 99,
  },
});
