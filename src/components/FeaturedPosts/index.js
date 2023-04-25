import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {Images} from '../../constants';
import {Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {publicRequest} from '../../makeRequest';

const FeaturedPosts = ({user, navigation}) => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [scrollnum, setScrollnum] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (featuredPosts.length > 0) {
      ref.current.scrollToIndex({
        index: scrollnum,
        animated: true,
        viewPosition: 0,
      });
    }
  }, [scrollnum, featuredPosts]);
  //   const onViewRef = useRef(viewableItems => {
  //     console.log('viewRef', viewableItems.changed[0].index);
  //     setScrollnum(viewableItems.changed[0].index);
  //     // setStoryIndex(0);
  //   });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 40});

  const onSwipe = index => {
    ref.current.scrollToIndex({index: index, animated: true, viewPosition: 0});
    setScrollnum(index);
    // setStoryIndex(0);
    console.log('on swipe');
  };
  useEffect(() => {
    console.log('first');
    const getAllFeaturedPosts = async () => {
      try {
        const res = await publicRequest.get(`/allFeaturedPosts/${user._id}`);
        // console.log('response>>>>>>>>>>>>', res.data.data);
        setFeaturedPosts(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllFeaturedPosts();
  }, []);
  return (
    <View style={styles.pitchlyFeatured}>
      <View
        style={{
          width: '100%',
          height: 181,
          borderRadius: 19,
        }}>
        <ImageBackground
          style={{borderRadius: 20}}
          source={Images.Pictures.appBg}
          resizeMode="cover">
          <View
            style={{
              alignSelf: 'center',
              width: '79%',
              height: '90%',
              alignSelf: 'center',
              borderRadius: 25,
            }}>
            <TouchableOpacity
              onPress={() => scrollnum > 0 && setScrollnum(scrollnum - 1)}
              style={{position: 'absolute', top: '50%', left: -25}}>
              <Icon
                type="AntDesign"
                name="left"
                style={{
                  fontSize: 15,
                  color: 'black',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (scrollnum < featuredPosts.length - 1) {
                  setScrollnum(scrollnum + 1);
                }
              }}
              style={{
                position: 'absolute',
                top: '50%',
                right: -15,
              }}>
              <Icon
                type="AntDesign"
                name="right"
                style={{
                  fontSize: 15,
                  color: 'black',
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                Pitchly Featured
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Homes', {
                    screen: 'home11',
                  });
                  //  console.log("home 11")
                  // props.navigation.navigate("home11");
                }}>
                <Text style={{color: '#3109FB', fontWeight: 'bold'}}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '100%', marginLeft: -10}}>
              {/* Featured postss >>>>>>>> */}
              <FlatList
                ref={ref}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={scrollnum}
                onScrollToIndexFailed={info => {
                  const wait = new Promise(resolve => setTimeout(resolve, 500));
                  wait.then(() => {
                    ref.current?.scrollToIndex({
                      index: info.index,
                      animated: true,
                    });
                  });
                }}
                // onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                index={scrollnum}
                keyExtractor={(item, index) => index}
                data={featuredPosts}
                renderItem={({item, index}) => {
                  return (
                    <View style={{marginTop: 5}} key={index}>
                      <TouchableOpacity
                        onPress={item.onPress}
                        activeOpacity={0.9}
                        style={{
                          width: 78,
                          height: 97,
                          borderRadius: 15,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: 10,
                        }}>
                        <ImageBackground
                          source={{
                            uri: item?.postId?.content[0].uri,
                          }}
                          style={{
                            width: 80,
                            height: 90,
                            borderRadius: 15,
                            // borderWidth:0.5,
                            overflow: 'hidden',
                          }}>
                          <LinearGradient
                            activeOpacity={0.9}
                            start={{x: 0, y: 0.0}}
                            end={{x: 1, y: 1.9}}
                            colors={[
                              '#4059E4',
                              '#4059E4',
                              '#4059E4',
                              '#5DF7B8',
                            ]}
                            style={{
                              width: '100%',
                              alignSelf: 'center',
                              height: 15,
                              backgroundColor: 'red',
                              position: 'absolute',
                              bottom: 0,
                              borderBottomRightRadius: 8,
                              borderBottomLeftRadius: 8,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={{color: 'white', fontSize: 9}}>
                              {item?.postId?.productName
                                ? item?.postId?.productName
                                : item?.postId?.serviceName
                                ? item?.postId?.serviceName
                                : item?.postId?.talentName}
                            </Text>
                          </LinearGradient>
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MyTabs', {screen: 'homescreensix'})
        }>
        <LinearGradient
          activeOpacity={0.9}
          start={{x: 0, y: 0.0}}
          end={{x: 1, y: 1.9}}
          colors={['#5DF7B8', '#3109FB']}
          style={{
            width: '99%',
            alignSelf: 'center',
            height: 35,
            backgroundColor: 'red',
            position: 'absolute',
            bottom: 0,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Icon
            type="AntDesign"
            name="arrowleft"
            style={{fontSize: 10, color: 'white', marginRight: 10}}
          />
          <Text style={{fontSize: 14, color: 'white'}}>
            Pitchly Promotions & Discounts
          </Text>
          <Icon
            type="AntDesign"
            name="arrowright"
            style={{fontSize: 10, color: 'white', marginLeft: 10}}
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default FeaturedPosts;

const styles = StyleSheet.create({
  pitchlyFeatured: {
    width: '100%',
    marginTop: 15,
    borderRadius: 25,
    // borderWidth: 2
  },
});
