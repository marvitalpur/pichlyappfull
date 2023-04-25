import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Highlight} from '../Highlight';
import {Images} from '../../constants';
import {publicRequest} from '../../makeRequest';
import StatusComponent from '../../screens/homes/statusComponent';

const Highlights = ({navigation, userId}) => {
  const [state, setState] = useState([]);
  const [img, setImg] = useState(Images.Logos.plusIcon);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await publicRequest.get(`/getHighlights/${userId}`);
        console.log('hightlight', res.data.data);
        setState(res.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetch();
  }, []);
  const statusData = [
    {
      imgName: Images.Pictures.highlight,
      imgWidth: 59,
      imgHeight: 59,
      borderRadius: 19,
      borderColor: '#3729F2',
      borderWidth: 2,
      width: 61,
      height: 61,
      text: 'Highlight',
      onPress: () =>
        navigation?.navigate('Homes', {
          screen: 'storyreplay',
          params: {
            state: state,
            setState: setState,
          },
        }),
    },
    {
      imgName: Images.Pictures.Friendship,
      imgWidth: 59,
      imgHeight: 59,
      borderRadius: 19,
      borderColor: '#3729F2',
      borderWidth: 2,
      width: 61,
      height: 61,
      text: ' Friendship',
      onPress: () =>
        props.navigation.navigate('Homes', {
          screen: 'storyreplay',
          params: {
            state: state,
            setState: setState,
          },
        }),
    },
    {
      imgName: Images.Pictures.statusImg3,
      imgWidth: 59,
      imgHeight: 59,
      borderRadius: 19,
      borderColor: '#3729F2',
      borderWidth: 2,
      width: 61,
      height: 61,
      text: 'Food',
      onPress: () =>
        props.navigation.navigate('Homes', {
          screen: 'storyreplay',
          params: {
            state: state,
            setState: setState,
          },
        }),
    },
  ];
  return (
    <View style={styles.statusBoxView}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={state}
        renderItem={item => {
          return (
            <View style={{paddingLeft: 10}}>
              <Highlight
                imgName={item.content}
                width={59}
                height={59}
                imgWidth={61}
                imgHeight={61}
                text={item.type}
                onPress={item.onPress}
              />
            </View>
          );
        }}
      />
      {/* <StatusComponent navigation={navigation} highlight={true} /> */}
      <View style={styles.statusAddView}>
        <TouchableOpacity
          onPress={() =>
            navigation?.navigate('Homes', {
              screen: 'Savedstatus',
              params: {
                userId: userId,
              },
            })
          }
          style={styles.statusAddBox}>
          <Image source={img} style={styles.statusAddIcon} />
        </TouchableOpacity>
        <Text>New</Text>
      </View>
    </View>
  );
};

export {Highlights};

const styles = StyleSheet.create({
  statusBoxView: {
    width: '86%',
    marginTop: 20,
    marginLeft: -10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  statusAddView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  statusAddBox: {
    width: 65,
    height: 65,
    borderRadius: 19,
    borderColor: '#3729F2',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusAddIcon: {width: 24.63, height: 24.63},
});
