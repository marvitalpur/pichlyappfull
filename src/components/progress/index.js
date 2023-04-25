import {StyleSheet, View, Dimensions} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Slider from '@react-native-community/slider';
// import * as Progress from 'react-native-progress';
// import {BackHandler} from 'react-native';
// let timeout = null;
let progressValue = 0;
let storyIndexCount = 0;

const ProgressBarComponent = ({
  item,
  storyIndex,
  statusData,
  statusIndex,
  setStoryIndex,
  navigation,
  view,
  stopProgress,
  key,
  onSwipe,
  highlight,
}) => {
  const {width, height} = Dimensions.get('window');
  const [progress, setProgress] = useState(0);
  const [timeout, settimeout] = useState(null);
  const changeSliderHandler = () => {
    settimeout(
      setInterval(() => {
        setProgress(prevState => prevState + 0.02);
      }, 100),
    );
  };
  const stopSliderHandler = () => {
    clearInterval(timeout);
  };
  useEffect(() => {
    if (view || stopProgress) {
      stopSliderHandler();
    }
  }, [stopProgress, view]);
  ``;
  useEffect(() => {
    console.log('storyIndex', storyIndex);
    let check = false;
    if (view || stopProgress) {
      check = true;
    } else {
      check = false;
    }
    if (!check) {
      if (timeout) {
        stopSliderHandler();
      }
      if (storyIndexCount !== storyIndex) {
        storyIndexCount = storyIndex;
        setProgress(0);
      }
      if (progressValue >= 1) {
      }
      changeSliderHandler();
    }
  }, [storyIndex, view, stopProgress]);

  useEffect(() => {
    progressValue = progress;
    if (progress >= 1) {
      clearInterval(timeout);
      setProgress(0);

      if (!highlight) {
        if (storyIndex < statusData[statusIndex].status.length - 1) {
          setStoryIndex(storyIndex + 1);
        } else if (storyIndex == statusData[statusIndex].status.length - 1) {
          if (statusIndex < statusData.length - 1) {
            onSwipe(statusIndex + 1);
          } else {
            navigation.goBack();
          }
        }
      } else {
        if (storyIndex < statusData[statusIndex].highlights.length - 1) {
          setStoryIndex(storyIndex + 1);
        } else if (
          storyIndex ==
          statusData[statusIndex].highlights.length - 1
        ) {
          if (statusIndex < statusData.length - 1) {
            onSwipe(statusIndex + 1);
          } else {
            navigation.goBack();
          }
        }
      }
    }
  }, [progress]);

  return (
    <View
      key={key}
      style={{
        flexDirection: 'row',
        position: 'absolute',
        // margin: 15,
      }}>
      {!highlight
        ? item?.status.map((storyItem, index) => {
            return (
              <View key={index}>
                {index === storyIndex ? (
                  <Slider
                    style={{
                      zIndex: 10,
                      marginTop: 20,
                    }}
                    width={width / item.status.length}
                    minimumValue={0}
                    maximumValue={1}
                    value={progress}
                    minimumTrackTintColor="white"
                    maximumTrackTintColor="gray"
                    thumbTintColor="transparent"
                  />
                ) : index > storyIndex ? (
                  <Slider
                    style={{
                      zIndex: 10,
                      marginTop: 20,
                    }}
                    width={width / item.status.length}
                    minimumValue={0}
                    maximumValue={1}
                    value={0}
                    minimumTrackTintColor="white"
                    maximumTrackTintColor="gray"
                    thumbTintColor="transparent"
                  />
                ) : (
                  <Slider
                    style={{
                      zIndex: 10,
                      marginTop: 20,
                    }}
                    width={width / item.status.length}
                    minimumValue={0}
                    maximumValue={1}
                    value={1}
                    minimumTrackTintColor="white"
                    maximumTrackTintColor="gray"
                    thumbTintColor="transparent"
                  />
                )}
              </View>
            );
          })
        : item?.highlights.map((storyItem, index) => {
            return (
              <View key={index}>
                {index === storyIndex ? (
                  <Slider
                    style={{
                      zIndex: 10,
                      marginTop: 20,
                    }}
                    width={width / item.highlights.length}
                    minimumValue={0}
                    maximumValue={1}
                    value={progress}
                    minimumTrackTintColor="white"
                    maximumTrackTintColor="gray"
                    thumbTintColor="transparent"
                  />
                ) : index > storyIndex ? (
                  <Slider
                    style={{
                      zIndex: 10,
                      marginTop: 20,
                    }}
                    width={width / item.highlights.length}
                    minimumValue={0}
                    maximumValue={1}
                    value={0}
                    minimumTrackTintColor="white"
                    maximumTrackTintColor="gray"
                    thumbTintColor="transparent"
                  />
                ) : (
                  <Slider
                    style={{
                      zIndex: 10,
                      marginTop: 20,
                    }}
                    width={width / item.highlights.length}
                    minimumValue={0}
                    maximumValue={1}
                    value={1}
                    minimumTrackTintColor="white"
                    maximumTrackTintColor="gray"
                    thumbTintColor="transparent"
                  />
                )}
              </View>
            );
          })}
    </View>
  );
};

export default ProgressBarComponent;

const styles = StyleSheet.create({});
