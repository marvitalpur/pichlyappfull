import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  hidden,
  statusBarStyle,
  statusBarTransition,
} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Icon} from 'native-base';
import {useState} from 'react';
import {publicRequest} from './../../../makeRequest';
import {useSelector} from 'react-redux';
export default function StorieCreate(props) {
  const [status, setstatus] = useState('Type A Status');
  const [image, setimage] = useState('');
  const user = useSelector(state => state.user.loggedInUser);
  const createStoryHandler = async () => {
    try {
      const obj = {
        type: 'text',
        caption: status,
        content: '',
      };
      const res = await publicRequest.post(`/crateStory/${user._id}`, obj);
      console.log('response', res.data);
      if (res.status == 201) {
        props.navigation.replace('MyTabs', {screen: 'Home'});
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container1}>
      <StatusBar
        animated={true}
        backgroundColor="#000"
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden}
      />
      <View style={{width: '90%', marginTop: 50, alignSelf: 'center'}}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon
            type="Entypo"
            name="cross"
            style={{
              color: '#fff',
              fontSize: 30,
              marginLeft: 0,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: '600',
          }}>
          {status}
        </Text>
        <View style={styles.inputcontainer}>
          <TextInput
            placeholder="Type a Status"
            onChangeText={text => setstatus(text)}
            style={{width: '75%'}}
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '10%',
            }}>
            <TouchableOpacity onPress={createStoryHandler}>
              <Icon
                type="Feather"
                name="send"
                style={{
                  color: '#4059E4',
                  fontSize: 24,
                  marginLeft: 0,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    backgroundColor: '#A70000',
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  container: {
    // backgroundColor: '#A70000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputcontainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 55,
    borderRadius: 20,
    width: '60%',
    justifyContent: 'center',
    flexDirection: 'row',

    // alignItems: 'flex-end',
  },
});
