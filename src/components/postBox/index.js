import React, {useState, useCallback, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {Images} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {Tooltip} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {AppButton, Tip} from '../../components';
import {Icon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {GridList} from '../gridList';
import {useIsFocused} from '@react-navigation/native';

// import {addlocation} from '../../../Redux/Actions';
import moment from 'moment';
import socket from '../../socket';
import {publicRequest} from '../../makeRequest';
import {showToast} from '../../showToast';

const PostBox = ({
  profileImg,
  profileTitle,
  postTime,
  boxTitle,
  boxDetail,
  staricon,
  heart,
  Video,
  price,
  checksingle,
  ImgPress,
  feture,
  GetFeture,
  press,
  Press1,
  profileonpress,
  ImgPress1,
  star,
  images,
  city,
  state,
  navigation,
  priceInfo,
  user,
  postId,
  type,
  likes,
  rating,
  totalAvgRating,
  reload,
  setReload,
  home,
  post,
}) => {
  const [Grid, setGrid] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [seeLess, setSeeLess] = useState(true);
  const [noOfLines, setNoOfLines] = useState(2);
  const [postComments, setPostComments] = useState(0);
  const [postLikes, setPostLikes] = useState(likes);
  const [starCount, setStarCount] = useState(
    rating?.length > 0 ? rating[0]?.stars : 0,
  );
  const [ratingAvg, setRatingAvg] = useState(totalAvgRating);
  let commentsCount = 0;
  const Dispatch = useDispatch();
  const isfocused = useIsFocused();

  const [icon, setIcon] = useState(
    star === true ? Images.Icons.heart : Images.Icons.Star,
  );
  const loggedInUser = useSelector(state => state.user.loggedInUser);

  const onTextLayout = useCallback(e => {
    setShowMore(e.nativeEvent.lines.length > noOfLines);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetch = async () => {
      try {
        const res = await publicRequest.get(`/getAllComments/${postId}`);
        if (isMounted) {
          if (res) {
            setPostComments(res.data.comments.length);
          }
        }
      } catch (err) {
        console.log('error', err);
      }
    };

    fetch();
    return () => {
      isMounted = false;
    };
  }, [postId]);

  const hanldeLike = async () => {
    try {
      const res = await publicRequest.put(`/likePost/${postId}`, {
        type,
        userId: loggedInUser?._id,
      });

      if (res.status == 200) {
        if (res.data.message == 'like') {
          setPostLikes(res.data.data.likes);
        } else {
          setPostLikes(res.data.data.likes);
        }
      }
    } catch (err) {
      showToast('error', 'SomeThing went wrong', err.message);
    }
  };

  const handleRating = async stars => {
    try {
      // console.log('stars', stars);

      const res = await publicRequest.put(`/ratePost/${postId}`, {
        type,
        userId: loggedInUser?._id,
        stars,
      });
      // console.log(res.data.data);
      // setStarCount(stars);
      setRatingAvg(res.data.data.totalRating);
    } catch (err) {
      showToast('error', 'SomeThing went wrong', err.message);
    }
  };
  const handleSavedPost = async () => {
    try {
      const res = await publicRequest.post('/savePost', {
        type,
        userId: loggedInUser?._id,
        postId,
      });
      if (res.status == 200) {
        showToast('success', 'Post Saved');
        if (setReload) {
          setReload(!reload);
        }
      } else {
        showToast('success', 'Post UnSaved');
        if (setReload) {
          setReload(!reload);
        }
      }
    } catch (err) {
      console.log(err);
      showToast('error', 'SomeThing Went Wrong!!', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          minHeight: 50,
          paddingBottom: 50,
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            marginTop: 15,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              // onPress={() => navigation?.navigate('Homes', {screen: 'account'})}
              onPress={() => navigation.navigate('profile', {user: user})}
              style={{
                width: 40,
                height: 40,
              }}>
              <Image
                source={
                  profileImg ? {uri: profileImg} : Images.Pictures.profile
                }
                style={{width: 40, height: 40, borderRadius: 50}}
              />
            </TouchableOpacity>
            <View style={{marginLeft: 5}}>
              <Text style={{color: '#4B4B4B', fontSize: 16, fontWeight: '400'}}>
                {profileTitle}
              </Text>
              {/* {moment(posts.createdAt).fromNow()}/ */}
              <Text style={{color: '#4B4B4B', fontSize: 10}}>
                {moment(postTime).fromNow()}
              </Text>
            </View>
          </View>
        </View>
        {user?._id != loggedInUser?._id && home && (
          <View style={{alignSelf: 'flex-end', marginTop: -35, marginRight: 5}}>
            <Tip
              tooltipdata3={true}
              content1={true}
              blockUserId={user?._id}
              setReload={setReload}
              reload={reload}
            />
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation?.navigate('Homes', {
              screen: 'talentscreen',
              params: {
                users: user,
                postId,
                profileImg: profileImg,
                profileTitle: profileTitle,
                postTime: postTime,
                boxTitle: boxTitle,
                boxDetail: boxDetail,
                price: price,
                city: city,
                state: state,
                content: images,
                navigation: navigation,
                priceInfo: priceInfo,
                rating: rating,
                totalAvgRating: ratingAvg
                  ? ratingAvg
                  : totalAvgRating
                  ? totalAvgRating
                  : 0,
                postLikes: postLikes,
                setPostLikes: setPostLikes,
                type: type,
                setRatingAvg: setRatingAvg,
                ratingAvg,
                starCount,
                setStarCount: setStarCount,
                heart: heart,
              },
            });
          }}>
          {/* captions section */}
          <View
            style={{
              width: '100%',
              marginTop: 20,
              marginBottom: 10,
              marginLeft: 10,
            }}>
            {boxTitle != '' && (
              <View>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>
                  {boxTitle}
                </Text>
              </View>
            )}

            {/* detail text */}
            {/* <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontWeight: '600',
              }}>
              Description
            </Text> */}
            {seeLess ? (
              <View
                style={{
                  width: '90%',
                  // flexDirection: 'row',
                  // alignItems: 'center',
                  // marginTop: boxTitle == true ? 10 : 10,
                }}>
                <Text
                  numberOfLines={noOfLines}
                  onTextLayout={onTextLayout}
                  style={{
                    fontSize: 13,
                    color: 'black',
                  }}>
                  {boxDetail}
                </Text>
                {showMore && (
                  <TouchableOpacity
                    onPress={() => {
                      setShowMore(false);
                      // setNoOfLines(-1);
                      setSeeLess(false);
                    }}>
                    <Text style={{color: '#4A91D5'}}> see more</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View
                style={{
                  width: '100%',
                  // flexDirection: 'row',
                  // alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'black',
                  }}>
                  {boxDetail}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowMore(true);
                    // setNoOfLines(2);
                    setSeeLess(true);
                  }}>
                  <Text style={{color: '#4A91D5'}}> see less</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {images?.length > 0 && (
            <>
              <View
                style={{
                  width: '100%',
                  height: 170,
                  borderRadius: 20,
                  // marginTop: 10,
                }}>
                <GridList navigation={navigation} images={images} />
              </View>
              {price != '' && (
                <Text
                  style={{
                    color: 'black',
                    marginTop: 3,
                    fontSize: 10,
                    marginLeft: 10,
                    marginTop: 10,
                    fontSize: 13,
                    fontWeight: '600',
                  }}>
                  ${price}
                </Text>
              )}
            </>
          )}
          <View
            style={{
              height: 25,
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              // bottom: -15,
              marginBottom: 20,
            }}>
            <View
              style={{
                width: '0%',
                height: '70%',
                marginTop: 0,
                alignSelf: 'flex-end',
                flex: 1,
                marginTop: 10,
                borderradius: 20,
              }}>
              {feture === true && (
                <View
                  style={{
                    width: '50%',
                    height: '100%',
                    alignSelf: 'flex-end',
                    borderRadius: 5,
                    marginBottom: 15,
                    marginRight: 10,
                  }}>
                  {feture === true && type != 'general' && (
                    <View
                      style={{
                        width: '50%',
                        height: '100%',
                        alignSelf: 'flex-end',
                        borderRadius: 5,
                        marginBottom: 15,
                        marginRight: 10,
                      }}>
                      <AppButton
                        LinearColor1={GetFeture === false ? '#5DF7B8' : 'white'}
                        LinearColor2={GetFeture === false ? '#3109FB' : 'white'}
                        color={GetFeture === false ? 'white' : 'black'}
                        height={'130%'}
                        borderWidth={GetFeture === false ? 0.5 : 0.8}
                        borderRadius={GetFeture === false ? 0 : 12}
                        borderColor={GetFeture === false ? '#707070' : 'black'}
                        backgroundColor={'#FFFFFF'}
                        label={
                          GetFeture === false ? 'Get it Featured' : 'Featured'
                        }
                        onPress={
                          () =>
                            GetFeture === false
                              ? navigation?.replace('Homes', {
                                  screen: 'getfeatured',
                                  params: {
                                    type: type,
                                    postId: postId,
                                  },
                                })
                              : navigation?.replace('Homes', {
                                  screen: 'productdetails',
                                  params: {
                                    post: post,
                                  },
                                })
                          // navigation.replace('MyTabs', { screen: 'profile' })
                        }
                      />
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
        <LinearGradient
          start={{x: 1.5, y: 1.0}}
          end={{x: 1.5, y: 2.5}}
          colors={['#28A9F61A', '#4C9BD2']}
          style={{
            width: '105%',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            alignSelf: 'center',
            elevation: 0.3,
            height: 50,
            position: 'absolute',
            bottom: 0,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('Homes', {
                screen: 'talentscreen',

                params: {
                  users: user,
                  postId,
                  profileImg: profileImg,
                  profileTitle: profileTitle,
                  postTime: postTime,
                  boxTitle: boxTitle,
                  boxDetail: boxDetail,
                  price: price,
                  city: city,
                  state: state,
                  content: images,
                  navigation: navigation,
                  priceInfo: priceInfo,
                  totalAvgRating: ratingAvg
                    ? ratingAvg
                    : totalAvgRating
                    ? totalAvgRating
                    : 0,
                  setRatingAvg: setRatingAvg,
                  ratingAvg,
                  postLikes: postLikes,
                  setPostLikes: setPostLikes,
                  type: type,
                  heart: heart,
                  rating: rating,
                  starCount,
                  setStarCount: setStarCount,
                },
              });
            }}>
            <View
              style={{
                width: '90%',
                height: '100%',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  height: '100%',
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
                      {postComments}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={Images.Logos.shareIcon}
                      style={{width: 19.07, height: 18.74}}
                    />
                    <Text style={{color: 'black', paddingLeft: 5}}>2.4K</Text>
                  </View>
                  {staricon && (
                    <View
                      style={{
                        marginLeft: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={Images.Icons.Star}
                        style={{width: 19.07, height: 18.74}}
                      />
                      <Text style={{color: 'black', paddingLeft: 5}}>4.2K</Text>
                    </View>
                  )}

                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {heart === true ? (
                      <>
                        <TouchableOpacity onPress={hanldeLike}>
                          {postLikes?.includes(loggedInUser?._id.toString()) ==
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
                          {postLikes ? postLikes?.length : 0}
                        </Text>
                      </>
                    ) : (
                      <>
                        {/* <Icon
                          type="AntDesign"
                          name="star"
                          style={{
                            color: '#4059E4',
                            fontSize: 20,
                          }}
                        /> */}
                        <Tip
                          tooltipdata4={true}
                          content1={true}
                          starCount={starCount}
                          setStarCount={setStarCount}
                          handleRating={handleRating}
                        />

                        <Text style={{color: 'black', paddingLeft: 5}}>
                          {ratingAvg
                            ? ratingAvg
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
                  <TouchableOpacity onPress={handleSavedPost}>
                    <Image
                      source={Images.Logos.favoriteIcon}
                      style={{width: 14, height: 17}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export {PostBox};

const styles = StyleSheet.create({
  postToolDrop: {
    minWidth: 100,
    zIndex: 1000,
    minHeight: 50,
    position: 'absolute',
    backgroundColor: '#EFF2F7',
    top: 40,
    borderRadius: 14,
    right: '5%',
    padding: 10,
  },

  container: {
    width: '100%',
    // height: 406,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: 'white',
    // minHeight: 50,
    overflow: 'hidden',
  },
  mainContainer: {
    width: '90%',
    height: '100%',
    alignSelf: 'center',
    paddingBottom: 50,
  },
  header: {
    width: '100%',
    height: 100,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBox: {
    marginLeft: 5,
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#F54F84',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusBtn: {
    width: 24,
    height: 24,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#F54F84',
    position: 'absolute',
    bottom: -3,
    right: -8,
    backgroundColor: 'white',
  },
  newFeed: {
    fontSize: 20,
    color: '#191919B8',
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  PostVIew: {
    width: '100%',
    height: 442.03,
    zIndex: 1000,
    marginTop: 15,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    shadowOffset: 40,
  },
  postHeader: {width: '90%', height: '100%', alignSelf: 'center'},
  postHeaderContentLeft: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postHeaderImg: {
    width: 29.89,
    height: 29.89,
    borderWidth: 2,
    borderColor: '#F54F84',
    borderRadius: 29,
  },
  postHeaderContentRight: {
    fontSize: 13,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: '#19295C',
  },
  postIcon: {
    height: 22.64,
    width: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  dotLine: {
    width: 22.64,
    height: 22.64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF2F7',
    borderRadius: 20,
  },
  savedImage: {
    width: 12.68,
    height: 3.62,
  },

  icons: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeBtn: {
    width: 30.8,
    height: 30.8,
    alignItem: 'center',
    justifyContent: 'center',
  },
  iconBtn: {
    width: 30.8,
    height: 30.8,
    alignItem: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  rightIconBtn: {
    width: 19.93,
    height: 19.93,
    alignItem: 'center',
    justifyContent: 'center',
    backgroundColor: '#1977F3',
    borderRadius: 15,
  },
  rightIconBtn2: {
    width: 19.93,
    height: 19.93,
    alignItem: 'center',
    justifyContent: 'center',
    backgroundColor: '#F31954',
    borderRadius: 15,
  },
});
