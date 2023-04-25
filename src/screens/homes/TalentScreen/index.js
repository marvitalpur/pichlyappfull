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
  Image,
  Press,
  singleImg,
  statusBarStyle,
  statusBarTransition,
  hidden,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Icon} from 'native-base';
import Headerchat from '../../../components/Headerchat';
import ImagePicker from 'react-native-image-crop-picker';
import {Comment, PostBox, Post, SharePost} from '../../../components';
import {Images} from '../../../constants';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import PictureSlider from '../PictureSlider';
import socket from '../../../socket';
import {Tip} from '../../../components';
import {publicRequest} from '../../../makeRequest';
import {showToast} from '../../../showToast';
// import { Homes } from '../../../navigation/stack';
const TalentScreen = props => {
  // const location = useSelector(state => state.locationReducer.location);
  // console.log('redux location============', location);
  const user = useSelector(state => state.user.loggedInUser);
  const route = useRoute();
  const profileImg = route.params.profileImg;
  const profileTitle = route.params?.profileTitle
    ? route.params.profileTitle
    : '';
  const postTime = route.params.postTime ? route.params.postTime : '';
  const users = route.params.users ? route.params.users : '';
  const boxTitle = route.params.boxTitle ? route.params.boxTitle : '';
  const boxDetail = route.params.boxDetail ? route.params.boxDetail : '';
  const content = route.params.content ? route.params.content : [];
  const price = route.params.price ? route.params.price : '';
  const priceInfo = route.params.priceInfo ? route.params.priceInfo : '';
  const city = route.params.city ? route.params.city : '';
  const state = route.params.state ? route.params.state : '';
  const postId = route.params?.postId ? route.params?.postId : '';
  const postLikes = route.params?.postLikes ? route.params?.postLikes : '';
  const setPostLikes = route.params?.setPostLikes
    ? route.params?.setPostLikes
    : '';
  const rating = route.params?.rating ? route.params?.rating : '';
  const type = route.params?.type ? route.params?.type : '';
  const totalAvgRating = route.params?.totalAvgRating
    ? route.params?.totalAvgRating
    : 0;
  const setRatingAvg = route.params?.setRatingAvg
    ? route.params?.setRatingAvg
    : '';
  const ratingAvg = route.params?.ratingAvg ? route.params?.ratingAvg : null;
  const starCount = route.params?.starCount ? route.params?.starCount : null;
  const heart = route?.params?.heart && route?.params?.heart;
  const setStarCount = route.params?.setStarCount;
  const navigation = route.params.navigation;
  // console.log('profileImg', profileImg);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [orientation, setOrientation] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [postComments, setPostComments] = useState([]);
  const [buttonState, setButtonState] = useState(false);
  const [replyState, setReplyState] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [ratingAverage, setRatingAverage] = useState(ratingAvg);
  const [starRatingCount, setStarRatingCount] = useState(
    starCount ? starCount : rating.length > 0 ? rating[0].stars : 0,
  );
  const [likePosts, setLikesPost] = useState(postLikes);
  // console.log('type>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',type);
  // const [starCount, setStarCount] = useState(rating?.length);
  // const [ratingAvg, setRatingAvg] = useState(totalAvgRating);
  // console.log('postId', postId);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setOrientation(isPortrait());
    });
  }, [Dimensions]);

  useEffect(() => {
    setStarCount && setStarCount(starRatingCount);
  }, [starRatingCount]);

  useEffect(() => {
    if (setPostLikes) {
      setPostLikes(likePosts);
    }
  }, [likePosts]);
  const createComment = () => {
    // console.log('pressed');
    if (replyState) {
      socket.emit('replyOnPost', {
        postId,
        commentId: commentId,
        reply: newComment,
        userId: user._id,
      });
      setReplyState(false);
      setNewComment('');
    } else {
      socket.emit('commentOnPost', {
        postId,
        comment: newComment,
        userId: user._id,
        type:type,
      });
      setButtonState(!buttonState);
      setNewComment('');
    }
  };
  useEffect(() => {
    if (setRatingAvg) {
      setRatingAvg(ratingAverage);
    }
  }, [ratingAverage]);

  const hanldeLike = async () => {
    try {
      const res = await publicRequest.put(`/likePost/${postId}`, {
        type,
        userId: user._id,
      });

      if (res.status == 200) {
        if (res.data.message == 'like') {
          // setPostLikes(res.data.data.likes);
          setLikesPost(res.data.data.likes);
        } else {
          // setPostLikes(res.data.data.likes);
          setLikesPost(res.data.data.likes);
        }
      }
    } catch (err) {
      showToast('error', 'SomeThing went wrong');
    }
  };

  const handleRating = async stars => {
    try {
      const res = await publicRequest.put(`/ratePost/${postId}`, {
        type,
        userId: user._id,
        stars,
      });
      // console.log(res.data.data);
      // setStarCount(stars);
      setRatingAverage(res.data.data.totalRating);
    } catch (err) {
      console.log(err);
      showToast('error', 'SomeThing went wrong');
    }
  };
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },

      {
        _id: 2,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);
  useEffect(() => {
    socket.emit('getComments', {postId});
  }, []);
  useEffect(() => {
    socket.off('getComments').on('getComments', data => {
      // console.log('data', data.comments[0].commentBy);
      setPostComments(data);
    });
  }, []);
  useEffect(() => {
    socket.off('commentOnPost').on('commentOnPost', data => {
      // console.log('data recieveee>>', data);
      setPostComments(data);
    });
  }, [buttonState, replyState]);

  useEffect(() => {
    if (newComment.length <= 0) {
      setReplyState(false);
    }
  }, [newComment]);

  // console.log('type', heart);

  let [scrollViewRef, setRef] = useState({});
  let colorScheme = Appearance.getColorScheme();
  // console.log('profileTitle', type);
  return (
    <ImageBackground
      style={styles.imageContainer}
      source={Images.Pictures.appBg}>
      <SafeAreaView style={{height: '100%'}}>
        <StatusBar
          animated={true}
          backgroundColor="#000"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            // paddingTop: 20,
            height: '100%',
          }}>
          <View
            style={{
              width: '100%',
              height: orientation ? '93%' : '95%',
              // paddingBottom: 10,
            }}>
            <View>
              <View
                style={{
                  width: '95%',
                  alignSelf: 'center',
                }}>
                <Headerchat
                  image={
                    profileImg ? {uri: profileImg} : Images.Pictures.statusImg2
                  }
                  name={profileTitle}
                  marginTop={20}
                  Press={() => {
                    navigation.goBack();
                  }}
                  imgpress={() => navigation.navigate('profile', {user: users})}
                />
              </View>

              {/* <Header text="Live Chat" navigation={props.navigation} /> */}
            </View>
            <View
              style={{
                width: '100%',
                height: 70,
                borderRadius: 20,
                // marginTop: 10,
              }}>
              <ImageBackground
                source={Images.Pictures.homeMainBg}
                style={{width: '100%', height: '100%'}}
                resizeMode="stretch">
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  }}>
                  <View style={{marginVertical: 30}}>
                    <View
                      style={{
                        width: '90%',
                        // height: '100%',
                        alignSelf: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          // height: '100%',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginLeft: 5,
                            }}>
                            <Image
                              source={Images.Logos.msgColorIcon}
                              style={{width: 19.07, height: 18.74}}
                            />
                            <Text style={{color: 'black', paddingLeft: 5}}>
                              {postComments?.commentCount
                                ? postComments?.commentCount
                                : 0}
                            </Text>
                          </View>
                          <View
                            style={{
                              marginLeft: 10,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                setIsVisible(!isVisible);
                              }}>
                              <Image
                                source={Images.Logos.shareIcon}
                                style={{width: 19.07, height: 18.74}}
                              />
                            </TouchableOpacity>
                            <Text style={{color: 'black', paddingLeft: 5}}>
                              2.4K
                            </Text>
                          </View>
                          <View
                            style={{
                              marginLeft: 10,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            {heart == true ? (
                              <>
                                <TouchableOpacity onPress={hanldeLike}>
                                  {likePosts?.includes(user._id.toString()) ==
                                  true ? (
                                    <Icon
                                      type="AntDesign"
                                      name="heart"
                                      style={{
                                        color: '#4059E4',
                                        fontSize: 20,
                                      }}
                                    />
                                  ) : (
                                    <Icon
                                      type="Feather"
                                      name="heart"
                                      style={{
                                        color: '#4059E4',
                                        fontSize: 20,
                                      }}
                                    />
                                  )}
                                </TouchableOpacity>
                                <Text style={{color: 'black', paddingLeft: 5}}>
                                  {likePosts ? likePosts?.length : 0}
                                </Text>
                              </>
                            ) : (
                              <>
                                <Tip
                                  tooltipdata4={true}
                                  content1={true}
                                  starCount={starRatingCount}
                                  setStarCount={setStarRatingCount}
                                  handleRating={handleRating}
                                />

                                <Text style={{color: 'black', paddingLeft: 5}}>
                                  {ratingAverage
                                    ? ratingAverage
                                    : totalAvgRating
                                    ? totalAvgRating
                                    : 0}
                                </Text>
                              </>
                            )}
                          </View>
                        </View>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Image
                            source={Images.Logos.favoriteIcon}
                            style={{width: 14, height: 17}}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View
              style={{
                width: '100%',
                height: content.length > 0 ? '30%' : '0%',
                // backgroundColor: 'red',
                overflow: 'hidden',
              }}>
              {content.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Homes', {
                      screen: 'pictureslider',
                      params: {
                        contents: content,
                      },
                    });
                  }}>
                  <View
                    style={{
                      width: '90%',
                      height: 202,
                      marginVertical: 10,
                      borderRadius: 20,
                      alignSelf: 'center',
                    }}>
                    <PictureSlider content={content} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.container}>
              <View
                style={{
                  width: '100%',
                  // backgroundColor: 'yellow',
                  height: content.length > 0 ? '57%' : '90%',
                  paddingBottom: content.length > 0 ? 70 : 85,
                  // backgroundColor: 'red',
                  overflow: 'hidden',
                }}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{overflow: 'hidden'}}>
                  {boxTitle || boxDetail || city || state ? (
                    <View
                      style={{
                        width: '90%',
                        alignSelf: 'center',
                        borderBottomWidth: 1,
                        paddingVertical: 10,
                        borderColor: '#aaa',
                      }}>
                      {boxTitle != '' && (
                        <Text style={styles.boldtext}>{boxTitle}</Text>
                      )}
                      {boxDetail != '' && (
                        <>
                          <Text style={styles.boldtext}>Description:</Text>
                          <View style={{width: '100%'}}>
                            <Text style={styles.texts}>{boxDetail}</Text>
                          </View>
                        </>
                      )}
                      {price != '' && (
                        <View>
                          {/* <Text style={styles.boldtext}>Price:</Text> */}
                          <Text style={styles.boldtext}>{price}$</Text>
                        </View>
                      )}
                      {priceInfo != '' && (
                        <>
                          <Text style={styles.boldtext}>Price Info:</Text>
                          <Text style={styles.texts}>{priceInfo}</Text>
                        </>
                      )}
                      {city != '' && (
                        <>
                          <Text style={styles.boldtext}>City:</Text>
                          <Text style={styles.texts}>{city}</Text>
                        </>
                      )}
                      {state != '' && (
                        <View style={{marginBottom: 5}}>
                          <Text style={styles.boldtext}>State:</Text>
                          <Text style={styles.texts}>{state}</Text>
                        </View>
                      )}
                      <Text style={styles.boldtext}>Comments:</Text>
                    </View>
                  ) : (
                    <>
                      <View
                        style={{
                          width: '90%',
                          alignSelf: 'center',
                          borderBottomWidth: 1,
                          // paddingVertical: 10,
                          borderColor: '#aaa',
                        }}>
                        <Text style={styles.boldtext}>Comments</Text>
                      </View>
                    </>
                  )}

                  <View>
                    {postComments?.comments?.length > 0 ? (
                      <Comment
                        postComments={postComments}
                        setReplyState={setReplyState}
                        replyState={replyState}
                        setNewComment={setNewComment}
                        setCommentId={setCommentId}
                        name="vani"
                        typesomething="Write a comment"
                        time="2:00"
                        postId={postId}
                        Radius={2}
                        height={100}
                        image={Images.Icons.post}
                        message={messages}
                        setMessage={setMessages}
                      />
                    ) : (
                      <View
                        style={{
                          alignSelf: 'center',
                          margin: 20,
                        }}>
                        <Text style={{color: 'black'}}>No Comments!</Text>
                      </View>
                    )}
                  </View>
                </ScrollView>
              </View>
            </View>
            {/* </ScrollView> */}
          </View>
          {/* TextInput Section start */}
          <View
            style={{
              position: 'absolute',
              width: '90%',
              height: 60 || 48,
              // zIndex: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              elevation: 1,
              borderRadius: 2 || 50,
              paddingLeft: 5,
              // borderWidth: 1,
              borderColor: '#eee',
              bottom: 0,

              // position: 'absolute',
              // bottom: 0,
              // marginTop: 15,
              alignSelf: 'center',
              backgroundColor: '#DCDCDC',
            }}>
            <View
              style={{
                width: '80%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                height: 60,
                marginLeft: 15,
              }}>
              <TextInput
                placeholderTextColor={(colorScheme = 'dark' ? 'grey' : 'grey')}
                multiline={true}
                placeholder="Write a comment"
                value={newComment}
                onChangeText={text => {
                  // setMessage(text.trimStart());
                  setNewComment(text.trimStart());
                }}
                style={{
                  marginVertical: 5,
                  width: '75%',
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
                // disabled={message?.length <= 0}
                activeOpacity={0.7}
                onPress={createComment}>
                <Icon
                  name="send"
                  type="MaterialIcons"
                  style={{
                    color:
                      // message?.length <= 0 ? 'grey' :
                      '#4059E4',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* TextInput Section end */}
        </View>
        {isVisible && (
          <SharePost
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            navigation={props.navigation}
            postId={postId}
            type={type}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default TalentScreen;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  container: {
    width: '90%',
    height: '100%',
    // borderRadius: 20,
    elevation: 2,
    backgroundColor: 'white',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  boldtext: {
    color: '#000',
    fontWeight: 'bold',
    marginVertical: 2,
  },
  texts: {
    color: '#000',
    fontSize: 14,
    marginLeft: 10,
  },
});
