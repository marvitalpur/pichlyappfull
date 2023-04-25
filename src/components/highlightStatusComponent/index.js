import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {Images} from '../../constants';
import {publicRequest} from '../../makeRequest';
import {StatusView} from '../statusView';

const HighlightStatusComponent = ({navigation}) => {
  const isfocused = useIsFocused();
  const user = useSelector(state => state.user.loggedInUser);
  const [statusData, setStatusData] = useState([]);
  const [img, setImg] = useState(Images.Logos.plusIcon);

  const storyViewHandler = (
    data,
    statusData,
    statusIndex,
    getUserStatusData,
  ) => {
    let arr = [...statusData];
    if (statusIndex > 0) {
      arr.splice(0, statusIndex);
    }
    navigation.navigate('Homes', {
      screen: 'highlightView',
      params: {
        data: data,
        statusDataa: arr,
        highlightIndex: 0,
        userId: user._id,
        getUserStatusData: getUserStatusData,
      },
    });
  };
  const getUserStatusData = async () => {
    try {
      const res = await publicRequest.get(`/getHighlights/${user._id}`);
      // console.log('data', res.data.data[0].status[0].id.viewedBy);
      setStatusData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    isfocused && getUserStatusData();
  }, [isfocused]);
  return (
    <View style={styles.statusBoxView}>
      <View style={styles.statusAddView}>
        <TouchableOpacity
          onPress={() =>
            navigation?.navigate('Homes', {
              screen: 'Savedstatus',
              params: {
                userId: user._id,
              },
            })
          }
          style={styles.statusAddBox}>
          <Image source={img} style={styles.statusAddIcon} />
        </TouchableOpacity>
        <Text>New</Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={statusData}
        renderItem={({item, index}) => {
          console.log('image');
          return (
            <View style={{paddingLeft: 10}} key={index}>
              <StatusView
                imgName={item.highlightBy.profileImg}
                width={59}
                height={59}
                imgWidth={59}
                imgHeight={59}
                text={
                  item.highlightBy.firstName + ' ' + item.highlightBy.lastName
                }
                // getUserStatusData={getUserStatusData}
                onPress={() => {
                  storyViewHandler(item, statusData, index, getUserStatusData);
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default HighlightStatusComponent;
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  body: {width: '90%', height: '100%', alignSelf: 'center', paddingBottom: 60},
  statusBoxView: {
    width: '100%',
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row',
  },

  headerView: {width: '100%', marginVertical: 15},
  statusAddView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  statusAddView1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
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
  statusAddIcon1: {width: 60, height: 60, borderRadius: 10},
  pitchlyFeatured: {
    width: '100%',
    marginTop: 15,
    borderRadius: 25,
    // borderWidth: 2
  },
  appbg: {
    borderRadius: 25,
    marginVertical: 10,
    top: 5,
  },
  wrapper: {
    width: '100%',

    flexDirection: 'row',
  },
  image: {
    height: '60%',
    width: '20%',
    // backgroundColor: 'blue',
  },
});
