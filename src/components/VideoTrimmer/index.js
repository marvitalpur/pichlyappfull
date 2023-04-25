import {StyleSheet, Text, View} from 'react-native';
import React, {Ref} from 'react';
import {VideoPlayer, Trimmer} from 'react-native-video-processing';
import {useState} from 'react';
import {Images} from '../../constants';
const VideoTimmer = () => {
  const [video, setVideo] = useState({
    currentTime: 0,
  });
  //   const videoPlayerRef = Ref();
  //   const trimVideo = () => {
  //     const options = {
  //       startTime: 0,
  //       endTime: 15,
  //       quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only
  //       saveToCameraRoll: true, // default is false // iOS only
  //       saveWithCurrentDate: true, // default is false // iOS only
  //     };
  //     videoPlayerRef
  //       .trim(options)
  //       .then(newSource => console.log(newSource))
  //       .catch(console.warn);
  //   };

  //   const compressVideo = () => {
  //     const options = {
  //       width: 720,
  //       height: 1280,
  //       bitrateMultiplier: 3,
  //       saveToCameraRoll: true, // default is false, iOS only
  //       saveWithCurrentDate: true, // default is false, iOS only
  //       minimumBitrate: 300000,
  //       removeAudio: true, // default is false
  //     };
  //     videoPlayerRef
  //       .compress(options)
  //       .then(newSource => console.log(newSource))
  //       .catch(console.warn);
  //   };

  //   const getPreviewImageForSecond = second => {
  //     const maximumSize = {width: 640, height: 1024}; // default is { width: 1080, height: 1080 } iOS only
  //     videoPlayerRef
  //       .getPreviewForSecond(second, maximumSize) // maximumSize is iOS only
  //       .then(base64String =>
  //         console.log('This is BASE64 of image', base64String),
  //       )
  //       .catch(console.warn);
  //   };

  //   const getVideoInfo = () => {
  //     videoPlayerRef
  //       .getVideoInfo()
  //       .then(info => console.log(info))
  //       .catch(console.warn);
  //   };
  return (
    <View style={{width: 200, height: 100}}>
      <VideoPlayer
        // ref={ref => (videoPlayerRef = ref)}
        startTime={30} // seconds
        endTime={120} // seconds
        play={true} // default false
        replay={true} // should player play video again if it's ended
        rotate={true} // use this prop to rotate video if it captured in landscape mode iOS only
        source={{uri: Images.video.video1}}
        playerWidth={300} // iOS only
        playerHeight={500} // iOS only
        style={{width: 200, height: 100}}
        // resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
        onChange={({nativeEvent}) => console.log({nativeEvent})} // get Current time on every second
      />
      <Trimmer
        source={{uri: Images.video.video1}}
        height={100}
        width={300}
        // onTrackerMove={e => console.log(e.currentTime)} // iOS only
        currentTime={video.currentTime}
        // use this prop to set tracker position iOS only
        themeColor={'white'} // iOS only
        thumbWidth={30} // iOS only
        trackerColor={'green'} // iOS only
        onChange={e => console.log(e.startTime, e.endTime)}
      />
    </View>
  );
};

export default VideoTimmer;

const styles = StyleSheet.create({});
