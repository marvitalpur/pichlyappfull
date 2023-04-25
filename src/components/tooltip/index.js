import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Tooltip from 'react-native-walkthrough-tooltip';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'native-base';
import StarRating from 'react-native-star-rating';
import {Images} from '../../constants';
import {publicRequest} from '../../makeRequest';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../../redux/userRedux';
// import {AntDesign} from 'react-native-vector-icons/AntDesign';

const Tip = ({
  tooltipdata1,
  tooltipdata2,
  tooltipdata3,
  tooltipdata4,
  Image1,
  Image2,
  Image3,
  Image4,
  Text1,
  Text2,
  Text3,
  Text4,
  onPress,
  onPress1,
  onPress2,
  onPress3,
  onPress4,
  Toppint,
  bottompoint,
  marginBottom,
  marginVertical,
  content1,
  content2,
  Icon1,
  borderRadius,
  img1,
  headingtext,
  toolwidth,
  starCount,
  setStarCount,
  handleRating,
  blockUserId,
  setReload,
  reload,
}) => {
  const [showTip, setShowTip] = useState(false);
  const user = useSelector(state => state.user.loggedInUser);
  const dispatch = useDispatch();
  const hanldeBlockUser = async () => {
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
        setShowTip(false);
        setReload(!reload);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {tooltipdata1 && (
        <View>
          <Tooltip
            // style={{ backgroundColor: 'pink', windth: 150 }}
            isVisible={showTip}
            accessible={false}
            showChildInTooltip={false}
            childrenWrapperStyle={{width: 100}}
            arrowStyle={{left: 90}}
            contentStyle={{width: toolwidth || 90, height: 100}}
            // arrowStyle={{ color: '#fff' }}
            content={
              <View>
                {content1 && (
                  <Text style={{color: '#000'}}>
                    Remove Notification {'\n'}
                    Turn off notificationIcon about {'\n'}
                    Vani's updates
                  </Text>
                )}
                <View>
                  {content2 && (
                    <View>
                      <View style={{flexDirection: 'row', width: 150}}>
                        <Icon
                          name="mail-forward"
                          type="FontAwesome"
                          style={{
                            color: '#4059E4',
                            marginRight: 10,
                            fontSize: 16,
                            top: 4,
                          }}
                        />
                        <Text>Forward</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: 150,
                          marginVertical: 6,
                        }}>
                        <Icon
                          name="reply"
                          type="FontAwesome"
                          style={{
                            color: '#4059E4',
                            marginRight: 10,
                            fontSize: 16,
                          }}
                        />
                        <Text>Reply</Text>
                      </View>
                      <View style={{flexDirection: 'row', width: 150}}>
                        <Icon
                          name="copy"
                          type="FontAwesome"
                          style={{
                            color: '#4059E4',
                            marginRight: 10,
                            fontSize: 16,
                          }}
                        />
                        <Text>Copy</Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            }
            onClose={() => {
              setShowTip(false);
            }}
            placement="left">
            <TouchableOpacity onPress={() => setShowTip(true)}>
              <Icon
                name="dots-three-vertical"
                type="Entypo"
                style={{color: '#000', fontSize: 18, top: 8}}
              />
            </TouchableOpacity>
          </Tooltip>
        </View>
      )}
      {tooltipdata2 && (
        <View style={styles.TooltipContainer}>
          <View
            style={{
              // borderWidth: 1,
              width: '100%',
              height: 150,
              justifyContent: 'space-evenly',
              // marginVertical: 75,
              backgroundColor: '#fff',
              borderRadius: 16,
              alignItems: 'center',
              // marginBottom: marginBottom || 50,
              marginVertical: marginVertical || 30,
            }}>
            {Toppint && (
              <View
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: 40,
                  borderRightWidth: 40,
                  borderTopWidth: 40,
                  borderStyle: 'solid',
                  backgroundColor: 'transparent',
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderTopColor: '#fff',
                  position: 'absolute',
                  bottom: -25,
                }}></View>
            )}
            <View>
              {bottompoint && (
                <View
                  style={{
                    width: 0,
                    height: 0,
                    borderLeftWidth: 40,
                    borderRightWidth: 40,
                    borderBottomWidth: 40,
                    borderStyle: 'solid',
                    backgroundColor: 'transparent',
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor: '#fff',
                    position: 'absolute',
                    bottom: 0,
                    left: 100,
                  }}></View>
              )}
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'black',
              }}>
              {headingtext}
            </Text>
            <View style={styles.TooltipContainerMain}>
              <View></View>
              <TouchableOpacity onPress={onPress1} style={styles.box}>
                {Icon1 && (
                  <View style={{alignSelf: 'center'}}>
                    <LinearGradient
                      start={{x: 1, y: 0.0}}
                      end={{x: 1, y: 1.9}}
                      colors={['#5DF7B8', '#3109FB']}
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: borderRadius || 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        type="AntDesign"
                        name="search1"
                        style={{color: 'white', fontSize: 24}}
                      />
                    </LinearGradient>
                  </View>
                )}
                {img1 && (
                  <Image
                    source={Image1}
                    resizeMode="contain"
                    style={{width: 40, height: 40}}
                  />
                )}

                <Text style={styles.texts}>{Text1}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPress2} style={styles.box}>
                <Image
                  source={Image2}
                  resizeMode="contain"
                  style={{width: 40, height: 40}}
                />
                <Text style={styles.texts}>{Text2}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onPress3} style={styles.box}>
                <Image
                  source={Image3}
                  resizeMode="contain"
                  style={{width: 40, height: 40}}
                />
                <Text style={styles.texts}>{Text3}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPress4} style={styles.box}>
                <Image
                  source={Image4}
                  resizeMode="contain"
                  style={{width: 40, height: 40}}
                />
                <Text style={styles.texts}>{Text4}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {tooltipdata3 && (
        <Tooltip
          // style={{ backgroundColor: 'pink', windth: 150 }}
          isVisible={showTip}
          accessible={false}
          showChildInTooltip={false}
          childrenWrapperStyle={{width: 140}}
          arrowStyle={{left: 100}}
          contentStyle={{width: toolwidth || 102, height: 70}}
          // arrowStyle={{ color: '#fff' }}
          content={
            <View>
              {content1 && (
                <View>
                  <Text style={{marginVertical: 5}}>Report Post</Text>
                  <TouchableOpacity onPress={hanldeBlockUser}>
                    <Text style={{}}>Block person</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          }
          onClose={() => {
            setShowTip(false);
          }}
          placement="left">
          <TouchableOpacity onPress={() => setShowTip(true)}>
            <View style={{width: 20, height: 20}}>
              <Image
                source={Images.Logos.globe}
                style={{width: '100%', height: '100%'}}
              />
            </View>
          </TouchableOpacity>
        </Tooltip>

        //   <Tooltip
        //   // style={{ backgroundColor: 'pink', windth: 150 }}
        //   isVisible={showTip}
        //   accessible={false}
        //   showChildInTooltip={false}
        //   childrenWrapperStyle={{ width: 100 }}
        //   arrowStyle={{ left: 90 }}
        //   contentStyle={{ width: toolwidth || 90, height: 100 }}
        //   // arrowStyle={{ color: '#fff' }}
        //   backgroundColor="#fff"
        //   withPointer={true}
        //   content={
        //     <View>
        //       <Text style={{ marginVertical: 5 }}>Report Post</Text>
        //       <Text style={{ marginVertical: 5 }}>Block person</Text>
        //     </View>
        //   }>
        //   <View style={{ width: 20, height: 20 }}>
        //     <Image
        //       source={Images.Logos.globe}
        //       style={{ width: '100%', height: '100%' }}
        //     />
        //   </View>
        // </Tooltip>
      )}

      {tooltipdata4 && (
        <Tooltip
          // style={{ backgroundColor: 'pink', windth: 150 }}
          isVisible={showTip}
          accessible={false}
          showChildInTooltip={false}
          childrenWrapperStyle={{width: 400, backgroundColor: 'red'}}
          arrowStyle={{left: 100}}
          contentStyle={{
            width: toolwidth || 200,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginLeft: '20%',
            // marginTop: '20%',
            // position: 'absolute',
            // backgroundColor: 'red',
          }}
          // arrowStyle={{ color: '#fff' }}
          content={
            <View>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={starCount}
                fullStarColor={'yellow'}
                selectedStar={rating => {
                  setStarCount(rating);
                  handleRating(rating);
                  setShowTip(false);
                }}
              />
            </View>
          }
          onClose={() => {
            setShowTip(false);
          }}
          placement="left">
          <TouchableOpacity onPress={() => setShowTip(true)}>
            <View style={{width: 20, height: 20}}>
              <Icon
                type="AntDesign"
                name="star"
                style={{
                  color: '#4059E4',
                  fontSize: 20,
                }}
              />
            </View>
          </TouchableOpacity>
        </Tooltip>
      )}
    </>
  );
};
export {Tip};

const styles = StyleSheet.create({
  TooltipContainerMain: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  TooltipContainer: {
    width: '100%',
  },
  TooltipContainer1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  box: {
    margin: 2,
    width: 64,
    height: 70,
    borderRadius: 20,
    borderColor: 'blue',
    borderWidth: 1.25,
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 10,
    backgroundColor: 'red',
    textAlign: 'center',
  },
  Icon: {
    width: '5%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  texts: {
    fontSize: 12,
  },
});

// <TouchableOpacity
// onPress={() => {
//   props.navigation.navigate('');
// }}
// style={styles.box}>
// <Image
//   source={Image2}
//   resizeMode="contain"
//   style={{ width: 40, height: 40 }}
// />
// <Text>Talent</Text>
// </TouchableOpacity>
// <TouchableOpacity
// onPress={() => {
//   props.navigation.navigate();
// }}
// style={styles.box}>
// <Image
//   source={Image3}
//   resizeMode="contain"
//   style={{ width: 40, height: 40 }}
// />
// <Text>Services</Text>
// </TouchableOpacity>
// <TouchableOpacity
// onPress={() => {
//   props.navigation.navigate('');
// }}
// style={styles.box}>
// <Image source={Image4}
//   resizeMode="contain"
//   style={{ width: 40, height: 40 }}
// />
// <Text>Products</Text>
// </TouchableOpacity>
