import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {Images} from '../../constants';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

const GridList = ({images, navigation}) => {
  const [resume, setResume] = useState(false);
  return (
    <View>
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('Homes', {
              screen: 'pictureslider',
              params: {
                contents: images,
              },
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
              height: '100%',
            }}>
            {images.length <= 2 ? (
              images.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: images.length == 1 ? '100%' : '45%',
                      height: '100%',
                    }}>
                    {item?.type?.split('/')[0] == 'video' ? (
                      <View
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 10,
                        }}>
                        <VideoPlayer
                          muted
                          paused={true}
                          autoplay={false}
                          disableFullscreen
                          disableVolume
                          disableBack
                          disableTimer
                          // seek={true}
                          onEnd={() => {
                            console.log('end called');
                          }}
                          resizeMode="contain"
                          source={{uri: item?.uri}}
                          // source={{
                          //   uri: 'http:192.168.100.33:4000/api/videoStream/data',
                          //   // type: 'm3u8',
                          // }}
                          style={{borderRadius: 10, resizeMode: 'fit'}}
                          // navigator={this.props.navigator}
                        />
                      </View>
                    ) : (
                      <Image
                        source={{uri: item?.uri}}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 10,
                        }}
                        // resizeMode="contain"
                      />
                    )}
                    {/* 
                  <Image
                    source={{uri: item}}
                    style={{width: '100%', height: '100%', borderRadius: 10}}
                    // resizeMode="contain"
                  /> */}
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  width: images.length == 1 ? '100%' : '45%',
                  height: '100%',
                }}>
                {images[0].type?.split('/')[0] == 'video' ? (
                  <View
                    style={{width: '100%', height: '100%', borderRadius: 10}}>
                    <VideoPlayer
                      muted
                      paused={true}
                      autoplay={false}
                      disableFullscreen
                      disableVolume
                      disableBack
                      disableTimer
                      source={{uri: images[0].uri}}
                      style={{borderRadius: 10}}
                      // navigator={this.props.navigator}
                    />
                  </View>
                ) : (
                  <Image
                    source={{uri: images[0].uri}}
                    style={{width: '100%', height: '100%', borderRadius: 10}}
                    // resizeMode="contain"
                  />
                )}
                {/* <Image
                source={{uri: images[0]}}
                style={{width: '100%', height: '100%', borderRadius: 10}}
                // resizeMode="contain"
              /> */}
              </View>
            )}
            {images.length > 2 && (
              <View
                style={{
                  width: '50%',
                  height: '100%',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: images.length == 3 ? '100%' : '45%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {images[1].type?.split('/')[0] == 'video' ? (
                      <View
                        style={{
                          width: '100%',
                          height: '45%',
                          borderRadius: 10,
                        }}>
                        <VideoPlayer
                          muted
                          paused={true}
                          autoplay={false}
                          disableFullscreen
                          disableVolume
                          disableBack
                          disableTimer
                          source={{uri: images[1].uri}}
                          style={{borderRadius: 10}}
                          // navigator={this.props.navigator}
                        />
                      </View>
                    ) : (
                      <Image
                        source={{uri: images[1].uri}}
                        style={{width: '100%', height: '45%', borderRadius: 10}}
                        // resizeMode="contain"
                      />
                    )}
                    {/* <Image
                    source={{uri: images[1]}}
                    style={{width: '100%', height: '45%', borderRadius: 10}}
                  /> */}
                    {images[2].type?.split('/')[0] == 'video' ? (
                      <View
                        style={{
                          width: '100%',
                          height: '45%',
                          marginTop: 8,
                          borderRadius: 10,
                        }}>
                        <VideoPlayer
                          muted
                          paused={true}
                          autoplay={false}
                          disableFullscreen
                          disableVolume
                          disableBack
                          disableTimer
                          source={{uri: images[2].uri}}
                          style={{borderRadius: 10}}
                          // navigator={this.props.navigator}
                        />
                      </View>
                    ) : (
                      <Image
                        source={{uri: images[2].uri}}
                        style={{
                          width: '100%',
                          height: '45%',
                          marginTop: 8,
                          borderRadius: 10,
                        }}
                        // resizeMode="contain"
                      />
                    )}
                    {/* <Image
                    source={{uri: images[2]}}
                    style={{
                      width: '100%',
                      height: '45%',
                      marginTop: 8,
                      borderRadius: 10,
                    }}
                  /> */}
                  </View>
                  {images.length > 3 && (
                    <View
                      style={{
                        width: '45%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {images[3].type?.split('/')[0] == 'video' ? (
                        <View
                          style={{
                            width: '100%',
                            height: images.length == 4 ? '100%' : '45%',
                            borderRadius: 10,
                          }}>
                          <VideoPlayer
                            muted
                            paused={true}
                            autoplay={false}
                            disableFullscreen
                            disableVolume
                            disableBack
                            disableTimer
                            source={{uri: images[3].uri}}
                            style={{borderRadius: 10}}
                            // navigator={this.props.navigator}
                          />
                        </View>
                      ) : (
                        <Image
                          source={{uri: images[3].uri}}
                          style={{
                            width: '100%',
                            height: images.length == 4 ? '100%' : '45%',
                            borderRadius: 10,
                          }}
                          // resizeMode="contain"
                        />
                      )}
                      {/* <Image
                      source={{uri: images[3]}}
                      style={{
                        width: '100%',
                        height: images.length == 4 ? '100%' : '45%',
                        borderRadius: 10,
                      }}
                    /> */}
                      {images.length > 4 && (
                        <>
                          {images[4].type?.split('/')[0] == 'video' ? (
                            <View
                              style={{
                                width: '100%',
                                height: '45%',
                                marginTop: 15,
                                borderRadius: 10,
                                backgroundColor: 'black',
                                opacity: images.length > 5 ? 0.5 : 1,
                              }}>
                              <VideoPlayer
                                muted
                                paused={true}
                                autoplay={false}
                                disableFullscreen
                                disableVolume
                                disableBack
                                disableTimer
                                source={{uri: images[4].uri}}
                                style={{borderRadius: 10}}
                                // navigator={this.props.navigator}
                              />
                            </View>
                          ) : (
                            <Image
                              source={{uri: images[4].uri}}
                              style={{
                                width: '100%',
                                height: '45%',
                                marginTop: 15,
                                borderRadius: 10,
                                backgroundColor: 'black',
                                opacity: images.length > 5 ? 0.5 : 1,
                              }}
                              // resizeMode="contain"
                            />
                          )}
                          {/* <Image
                          source={{uri: images[4]}}
                          style={{
                            width: '100%',
                            height: '45%',
                            marginTop: 15,
                            borderRadius: 10,
                            backgroundColor: 'black',
                            opacity: images.length > 5 ? 0.5 : 1,
                          }}
                        /> */}

                          {images.length > 5 && (
                            <Text
                              style={{
                                color: 'white',
                                position: 'absolute',
                                bottom: 20,
                                textAlign: 'center',
                                fontSize: 15,
                              }}>
                              {images.length - 5 + '\n More'}
                            </Text>
                          )}
                        </>
                      )}
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {GridList};
// const styles = StyleSheet.create({});
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 80,
    width: 80,
  },
});
