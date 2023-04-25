import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import React, {useState} from 'react';
import {Tip, TrackPlayerComponent} from '../../components';
import VideoPlayer from 'react-native-video-controls';
import {Image} from 'react-native';
import {publicRequest} from '../../makeRequest';
import {Images} from '../../constants';
// import {WebView} from 'react-native-webview';

const MessagesScreen = ({message, i, user, setModalData, navigation}) => {
  const [isVisible, setIsVisible] = useState(null);

  const [show, setshow] = useState(true);
  const [emoji, setemoji] = useState({
    value: null,
  });
  const handlePress = async () => {
    // console.log(message.type);
    if (message.type == 'image' || message.type == 'video') {
      if (setModalData) {
        setModalData({
          message: message.message,
          type: message.type,
        });
      }
      setShowModal(!showModal);
    }
    if (message.type === 'url') {
      try {
        const split = message.message.split('=');
        const type = split[1].charAt(split[1].length - 1);
        const postId = split[1].slice(0, -1);

        // console.log('split', type, url);
        const res = await publicRequest.get(`/getPostById/${postId}/${type}`);
        console.log('response', res.data.data);
        navigation?.navigate('Homes', {
          screen: 'talentscreen',
          params: {
            users: res.data.data.postedBy,
            postId,
            profileImg: res.data.data.postedBy.profileImg,
            profileTitle:
              res.data.data.postedBy.firstName +
              ' ' +
              res.data.data.postedBy.lastName,
            postTime: res.data.data.createdAt,
            boxTitle: res.data.data.productName
              ? res.data.data.productName
              : res.data.data.serviceName
              ? res.data.data.serviceName
              : res.data.data.talentName
              ? res.data.data.talentName
              : res.data.data.caption,
            boxDetail: res.data.data.description
              ? res.data.data.description
              : '',
            price: res.data.data.price ? res.data.data.price : '',
            city: res.data.data.city ? res.data.data.city : '',
            state: res.data.data.state ? res.data.data.state : '',
            content: res.data.data.content ? res.data.data.content : '',
            navigation: navigation,
            priceInfo: res.data.data.priceInfo ? res.data.data.priceInfo : '',
            rating: res.data.data.rating ? res.data.data.rating : '',
            totalAvgRating: res.data.data.totalRating
              ? res.data.data.totalRating
              : '',
            postLikes: res.data.data.likes ? res.data.data.likes : '',
            // setPostLikes: setPostLikes,
            type:
              type == 'g'
                ? 'general'
                : type == 'p'
                ? 'product'
                : type == 's'
                ? 'service'
                : 'talent',
            // setRatingAvg: setRatingAvg,
            // ratingAvg,
            // starCount,
            // setStarCount: setStarCount,
            heart:
              res.data.data.caption || res.data.data.talentName ? true : false,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <View key={i}>
      {isVisible === i ? (
        show === true ? (
          <View
            key={i}
            style={{
              width: '50%',
              height: '10%',
              marginLeft: 10,
              justifyContent: 'space-evenly',
              backgroundColor: 'white',
              flexDirection:
                message?.messageBy?.toString() != user?._id.toString()
                  ? 'row'
                  : 'row-reverse',
              marginVertical: 10,
              alignItems: 'center',
              elevation: 3,
              alignSelf:
                message?.messageBy?.toString() != user?._id.toString()
                  ? 'flex-start'
                  : 'flex-end',
              borderRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                setemoji({
                  ...emoji,
                  value: Images.Pictures.ic_like_fill,
                });
              }}>
              <Avatar
                style={{flexDirection: 'row-reverse'}}
                rounded
                source={Images.Pictures.like}
                size={18}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setemoji({
                  ...emoji,
                  value: Images.Pictures.love2,
                }),
                  setshow(false);
              }}>
              <Avatar rounded source={Images.Pictures.love} size={18} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setemoji({
                  ...emoji,
                  value: Images.Pictures.haha2,
                }),
                  setshow(false);
              }}>
              <Avatar rounded source={Images.Pictures.haha} size={18} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setemoji({
                  ...emoji,
                  value: Images.Pictures.wow2,
                }),
                  setshow(false);
              }}>
              <Avatar rounded source={Images.Pictures.wow} size={18} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setemoji({
                  ...emoji,
                  value: Images.Pictures.sad2,
                }),
                  setshow(false);
              }}>
              <Avatar rounded source={Images.Pictures.sad} size={18} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setemoji({
                  ...emoji,
                  value: Images.Pictures.angry2,
                }),
                  setshow(false);
              }}>
              <Avatar rounded source={Images.Pictures.angry} size={18} />
            </TouchableOpacity>
          </View>
        ) : null
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          flexDirection:
            message?.messageBy?.toString() != user?._id.toString()
              ? 'row'
              : 'row-reverse',
          marginVertical: 10,
          alignItems: 'flex-start',
          alignSelf:
            message?.messageBy?.toString() != user?._id.toString()
              ? 'flex-start'
              : 'flex-end',
        }}>
        <TouchableOpacity
          activeOpacity={message.type != 'text' || 'audio' ? 1 : 0}
          onLongPress={() => {
            setIsVisible(i);
            setemoji({...emoji, value: null});
            setshow(true);
          }}
          onPress={() => {
            handlePress();
          }}
          style={{
            width: '70%',
            backgroundColor:
              message.type == 'text' &&
              message?.messageBy?.toString() != user?._id.toString()
                ? '#E4E4E4'
                : '#4059E4',
            borderRadius: 25,
          }}>
          <View
            style={{
              minHeight: 50,
              paddingVertical: message.type == 'text' ? 15 : 0,
              overflow: 'hidden',

              // height: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 25,
              paddingHorizontal: message.type == 'text' ? 10 : 0,
              minWidth: 80,
              // backgroundColor: 'pink',
            }}>
            {message.type == 'text' || message.type == 'url' ? (
              <Text
                style={{
                  color:
                    message?.messageBy?.toString() != user?._id.toString()
                      ? 'black'
                      : 'white',
                }}>
                {' '}
                {message?.message}{' '}
              </Text>
            ) : message.type == 'image' ? (
              <Image
                source={{uri: message?.message}}
                style={{
                  width: '100%',
                  height: 150,
                }}
              />
            ) : message.type == 'audio' ? (
              <TrackPlayerComponent
                message={message.message}
                messageId={message._id}
                index={i}
              />
            ) : (
              <View
                style={{
                  width: '100%',
                  height: 200,
                }}>
                <VideoPlayer
                  source={{uri: message?.message}}
                  // source={{
                  //   // uri: 'http://192.168.100.33:4000/api/videoStream/uploads/content-1666097280141-585580150.mp4',
                  //   uri: 'https://www.youtube.com/watch?v=8zT6CYu0iYQ',
                  // }}
                  disableFullscreen
                  disableVolume
                  disableBack
                  style={{
                    width: '100%',
                    height: 150,
                  }}
                />
                {/* to use external video player like youtube dailymotion etc*/}
                {/* <WebView
                  source={{
                    uri: 'https://www.youtube.com/watch?v=8zT6CYu0iYQ',
                  }}
                  // startInLoadingState={true}
                  style={{width: '100%', height: 200}}
                /> */}
              </View>
            )}
          </View>
        </TouchableOpacity>

        <View
          style={{
            alignSelf: 'center',
            position: 'relative',
            right: 10,
          }}>
          <Avatar rounded source={isVisible === i && emoji.value} size={20} />
        </View>

        <TouchableOpacity style={{marginTop: 15, height: 30}}>
          <Tip
            tooltip1
            tooltipdata1
            content2
            onPress={true}
            DoteIcon={<Text>Icon1</Text>}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {MessagesScreen};

const styles = StyleSheet.create({});
