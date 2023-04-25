import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  statusBarStyle,
  statusBarTransition,
  hidden,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'native-base';
import {Images} from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {publicRequest} from '../../../makeRequest';
import {useSelector} from 'react-redux';
import {showToast} from '../../../showToast';
const Viewstatus = props => {
  const [status, setstatus] = useState('Type A Status');
  const [image, setimage] = useState('');
  const user = useSelector(state => state.user.loggedInUser);

  const createHighlightHandler = async () => {
    try {
      const res = await publicRequest.post(`/createHighlight/${user?._id}`, {
        storyId: props?.route?.params?.item?._id,
      });
      console.log(res.data.data);
      showToast('success', 'highlight created successfully');
      props.navigation.goBack();
    } catch (err) {
      console.log(err.message);
      showToast('error', err.message);
      props.navigation.goBack();
    }
  };
  return (
    <>
      <View style={styles.screenHeader}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Icon
            type="Feather"
            name="chevron-left"
            style={{
              color: '#fff',
              fontSize: 26,
              marginLeft: 0,
            }}
          />
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
            Highlights
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{position: 'absolute', right: 15, top: 15, zIndex: 100}}>
        <TouchableOpacity activeOpacity={0.8} onPress={createHighlightHandler}>
          <LinearGradient
            start={{x: 1, y: 0.0}}
            end={{x: 1, y: 1.9}}
            colors={['#5DF7B8', '#3109FB']}
            style={{
              width: 35,
              height: 35,
              alignItems: 'center',
              justifyContent: 'flex-end',
              flex: 1,
            }}>
            <Icon
              type="Ionicons"
              name="ios-checkmark-done-sharp"
              style={{
                fontSize: 28,
                color: '#ffff',
              }}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <ImageBackground
        style={styles.imageContainer}
        source={{uri: props.route.params.item.content}}>
        <StatusBar
          animated={true}
          backgroundColor="#000"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        {/* <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        
      </ScrollView> */}
      </ImageBackground>
    </>
  );
};
export default Viewstatus;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Body: {
    backgroundColorL: 'purple',
    width: '90%',
    height: '80%',
    alignSelf: 'center',
    // alignItems: 'flex-end',
    justifyContent: 'center',
  },
  inputcontainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',

    // alignItems: 'flex-end',
  },
  screenHeader: {
    width: '100%',
    height: 30,
    marginTop: 20,
    top: 0,
    left: 0,
    // marginLeft: 20,
    // right: 10,
    position: 'absolute',
    zIndex: 100,
    // alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
