import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Images } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';

const TabBar = props => {
  const { state } = props;
  const tabs = [
    { text: 'HOME', navTo: 'home', img: Images.Logos.homeIcon },
    { text: 'CHAT', navTo: 'ChatScreen1', img: Images.Logos.msgIcon },
    { text: 'Upload', navTo: 'TooltipScreen', img: Images.Logos.addIcon },
    {
      text: 'NOTIFICATION',
      navTo: 'Notification',
      img: Images.Logos.notificationIcon,
    },
    { text: 'ACCOUNT', navTo: 'profile', img: Images.Logos.userIcon },
  ];
  const [visible, setVisible] = useState({
    visibles: false,
    invisibles: true,
  });
  return (
    <>
      <SafeAreaView style={styles.tabBarContainer}>
        {/* <View style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>
        <Tooltips invisible={visible.invisibles} visible={visible.visibles} />
      </View> */}
        <View
          style={{
            width: '90%',
            height: 45,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

            shadowColor: '#28A9F633',
            borderRadius: 20,
            opacity: 6,
            marginTop: -10,
          }}>
          {tabs.map((item, i) => (
            <>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate(item.navTo),
                    i === 2
                      ? setVisible({
                        ...visible,
                        visibles: true,
                        invisibles: false,
                      })
                      : setVisible({
                        ...visible,
                        visibles: false,
                        invisibles: true,
                      });
                }}
                style={{ alignItems: 'center', justifyContent: 'center' }}
                key={i}>
                <LinearGradient
                  start={{ x: 1, y: 0.0 }}
                  end={{ x: 1, y: 1.9 }}
                  colors={
                    state.index === i
                      ? ['#3109FB', '#5DF7B8']
                      : ['#FFFFFF00', '#FFFFFF00']
                  }
                  style={{
                    width: 62,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 62,
                    borderRadius: 20,
                    backgroundColor: '#FFFFFF00',
                    marginTop: state.index === i ? -70 : -20,
                  }}>
                  <Image
                    source={item.img}
                    resizeMode={'contain'}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: state.index === i ? '#ffffff' : '#4c9cd2',
                    }}
                  />
                </LinearGradient>
                <View>
                  {state.index === i ? (
                    <Text
                      style={{
                        color: state.index === i ? '#4c9cd2' : '#D3D3D3',
                        marginTop: 5,
                        fontSize: 14,
                      }}>
                      {item.text}
                    </Text>
                  ) : null}
                </View>
              </TouchableOpacity>
            </>
          ))}
        </View>
      </SafeAreaView>



    </>
  );
};

export { TabBar };

const styles = StyleSheet.create({
  tabBarContainer: {
    borderTopLeftRadius: 20,
    width: '100%',
    height: 80,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    elevation: 5,
  },
});
