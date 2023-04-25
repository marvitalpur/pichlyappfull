// import { StyleSheet, Text, View, SafeAreaView, Image, TouchableHighlight } from 'react-native'
// import React from 'react'
// import ImageSlider from 'react-native-image-slider';
// import { Images } from '../../../constants';

// const PictureSlider = () => {

//     const images = [
//         'https://placeimg.com/640/640/nature',
//         'https://placeimg.com/640/640/people',
//         'https://placeimg.com/640/640/animals',
//         'https://placeimg.com/640/640/beer',
//     ];
//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.content1}>
//                 <Text style={styles.contentText}>Content 1</Text>
//             </View>
//             <ImageSlider
//                 loopBothSides
//                 autoPlayWithInterval={3000}
//                 images={images}
//                 customSlide={({ index, item, style, width }) => (
//                     // It's important to put style here because it's got offset inside
//                     <View key={index} style={[style, styles.customSlide]}>
//                         <Image source={{ uri: item }} style={styles.customImage} />
//                     </View>
//                 )}
//                 customButtons={(position, move) => (
//                     <View style={styles.buttons}>
//                         {images.map((image, index) => {
//                             return (
//                                 <TouchableHighlight
//                                     key={index}
//                                     underlayColor="#ccc"
//                                     onPress={() => move(index)}
//                                     style={styles.button}
//                                 >
//                                     <Text style={position === index && styles.buttonSelected}>
//                                         {index + 1}
//                                     </Text>
//                                 </TouchableHighlight>
//                             );
//                         })}
//                     </View>
//                 )}
//             />
//             <View style={styles.content2}>
//                 <Text style={styles.contentText}>Content 2</Text>
//             </View>
//         </SafeAreaView>
//     )
// }

// export default PictureSlider

// const styles = StyleSheet.create({

// })

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableHighlight,
  statusBarStyle,
  statusBarTransition,
  hidden,
} from 'react-native';
import React from 'react';
// import ImageSlider from 'react-native-image-slider';
// import { Images } from '../../../constants';
// import GridImageView from 'react-native-grid-image-viewer';
import Swiper from 'react-native-swiper';
import {Item} from 'native-base';
import VideoPlayer from 'react-native-video-controls';

const PictureSlider = props => {
  const images = [
    'https://placeimg.com/640/640/nature',
    'https://placeimg.com/640/640/people',
    'https://placeimg.com/640/640/animals',
    'https://placeimg.com/640/640/beer',
  ];
  const contents = props?.route?.params.contents;
  console.log(contents);
  let data = [];
  if (contents) {
    data = [...contents];
  } else {
    data = [...props.content];
  }
  return (
    <View style={styles.background}>
      <Swiper
        height="100%"
        width={'100%'}
        // {data.length>1 && showsButtons}
        showsPagination={true}
        showsButtons={data.length > 1 ? true : false}
        // autoplay={true}
        // loop
        autoplay={false}>
        {data.map((image, index) => {
          return (
            <>
              {image.type.split('/')[0] == 'video' ? (
                <VideoPlayer
                  // muted
                  disableFullscreen
                  disableVolume
                  disableBack
                  // disablePlayPause
                  // disableTimer
                  // disableSeekbar
                  // resizeMode="contain"
                  source={{uri: image.uri}}
                  // style={{}}
                  // navigator={this.props.navigator}
                />
              ) : (
                <Image
                  source={{uri: image.uri}}
                  resizeMode="contain"
                  style={styles.image}
                />
              )}
            </>
          );
        })}
      </Swiper>
    </View>
  );
};

export default PictureSlider;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wrapper: {},
  headline_text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 20,
  },
  explore_text: {
    marginTop: 5,
    marginBottom: 10,
    color: 'white',
    marginLeft: 20,
    fontSize: 12,
    fontWeight: '600',
  },
});
