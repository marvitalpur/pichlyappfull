import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Icon} from 'native-base';
// import TrackPlayer, {
//   useProgress,
//   useTrackPlayerProgress,
// } from 'react-native-track-player';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// import SoundPlayer from 'react-native-sound-player';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
const audioRecorderPlayer = new AudioRecorderPlayer();
let timeout = null;
const TrackPlayerComponent = props => {
  // let sound = null;
  const {message, messageId, index} = props;
  const [state, setState] = useState({
    playState: 'paused',
    duration: 0,
    messageId: messageId,
    playSeconds: 0,
  });
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [iconChange, setIconChange] = useState(false);
  const [sound, setSound] = useState(null);

  Sound.setCategory('Playback');

  useEffect(() => {
    let sounds = new Sound(message, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // console.log('soundss', sounds.getDuration());
      setState({
        playState: 'paused',
        duration: sounds.getDuration(),
        messageId: messageId,
        playSeconds: 0,
      });
    });
    setSound(sounds);

    // }
  }, []);

  useEffect(() => {
    // play();
    if (sound && sound.isLoaded() && !sound.isPlaying()) {
      changeSliderHandler();
      sound?.play(success => {
        playComplete(success);
      });
    } else if (sound && sound.isLoaded() && sound.isPlaying()) {
      changeSliderHandler();
    }
    // console.log('useEffect run', sound);
  }, [sound]);

  const changeSliderHandler = () => {
    // console.log('sound is ', soundss);
    timeout = setInterval(() => {
      // if (sound && sound.isLoaded() && state.playState == 'playing') {
      if (sound && sound.isLoaded()) {
        sound.getCurrentTime((seconds, isPlaying) => {
          setState({...state, playSeconds: seconds});
        });
      }
    }, 100);
  };
  const removeIntervalHandler = () => {
    if (sound) {
      sound.release();
      setSound(null);
    }
    if (timeout) {
      clearInterval(timeout);
      setState({...state, playSeconds: 0, playState: 'paused'});
      setIconChange(false);
    }
  };
  const playComplete = success => {
    if (sound) {
      if (success) {
        removeIntervalHandler();
        // console.log('successfully finished playing');
        // sound?.getCurrentTime(seconds =>
        //   console.log('current time>>>>> ' + seconds),
        // );
      } else {
        console.log('playback failed due to audio decoding errors');
        // Alert.alert('Notice', 'audio file error. (Error code : 2)');
        console.log('Notice', 'audio file error. (Error code : 2)');
      }

      setState({
        playState: 'paused',
        duration: sound?.getDuration(),
        messageId: messageId,
        playSeconds: 0,
      });
      sound?.setCurrentTime(0);
      setSound(null);
    }
  };
  const play = async uri => {
    if (sound && sound._filename == uri) {
      changeSliderHandler();
      sound.play(success => {
        playComplete(success);
      });
    } else {
      sound?.pause();
      setIconChange(false);
      let sounds = new Sound(uri, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error);
          // Alert.alert('Notice', 'audio file error. (Error code : 1)');
          setState({...state, playState: 'paused'});
        } else {
          setSound(sounds);

          // changeSliderHandler(sounds);
          // sounds?.play(success => {
          //   playComplete(success);
          // });
        }
      });
    }
  };

  const pause = () => {
    // console.log('paused');
    if (sound) {
      sound.pause();
      setIconChange(true);
    }
    setState({...state, playState: 'paused'});
  };
  const getAudioTimeString = seconds => {
    const m = parseInt((seconds % (60 * 60)) / 60);
    const s = parseInt(seconds % 60);

    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
  };
  // const currentTimeString = getAudioTimeString(state[index].playSeconds);
  const durationString = getAudioTimeString(state.duration);
  //this function is called when the user starts to slide the seekbar
  const slidingStarted = value => {
    setIsSeeking(true);
  };
  //this function is called when the user stops sliding the seekbar
  const slidingCompleted = async (value, uri) => {
    if (sound) {
      // console.log('sliding value', value, 'sound', sound);
      sound.setCurrentTime(value);
      setState({...state, playSeconds: value});
    } else {
      let sounds = new Sound(message, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // console.log('soundss', sounds.getDuration());
        setState({
          playState: 'paused',
          duration: sounds.getDuration(),
          messageId: messageId,
          playSeconds: value,
        });
        // console.log('sliding value', value, 'sound', sounds);
        sounds.setCurrentTime(value);
        // setState({...state, playSeconds: value});
      });

      setSound(sounds);
    }
    // console.log(sound);
    //   setSliderValue(value);
    setIsSeeking(false);
  };

  return (
    <View
      style={{
        width: '100%',
        marginVertical: 10,
        alignItems: 'flex-start',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          minHeight: 50,
          paddingVertical: 10,
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 25,
          paddingHorizontal: 10,
          minWidth: 80,
        }}>
        <Icon
          onPress={() => {
            if (!iconChange) {
              play(message);
              setIconChange(true);
            } else {
              pause();
              setIconChange(false);
            }
            // if (!newRoom) {
            // TrackPlayer.add(message.message);
            //   onStartPlay(message);
            // }
          }}
          name={iconChange ? 'controller-paus' : 'controller-play'}
          type="Entypo"
          style={{color: 'white'}}
        />
        <Slider
          // disabled
          style={{width: '70%'}}
          minimumValue={0}
          maximumValue={state.duration}
          // value={i < index ? 0 : i == index ? 0.8 : 0}
          value={state.playSeconds}
          minimumTrackTintColor="white"
          maximumTrackTintColor="gray"
          thumbTintColor="white"
          onSlidingStart={slidingStarted}
          onSlidingComplete={value => slidingCompleted(value, message)}
        />
        <View>
          <Text>{isNaN(durationString) ? durationString : '00:00'}</Text>
        </View>
        {/* <Text style={{color: '#fff'}}> {message?.text} </Text> */}
      </View>
    </View>
  );
};

export {TrackPlayerComponent};

const styles = StyleSheet.create({});
