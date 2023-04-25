import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import { Icon } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Images } from '../../../constants';
import { Tip } from '../../../components';
const ToolTipScreen = (props) => {
  // useEffect(() => {
  //     setShowtool(true);
  // }, [showTool]);
  // const [showTool, setShowtool] = useState(false);
  return (
    <ImageBackground
      style={styles.imageContainer}
      source={Images.Pictures.homeMainBg}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.Body}>
          <View style={{}}>
            <Tip tooltipdata2
              headingtext="UPLOAD"
              marginVertical={70}
              Toppint
              Text1="General"
              Text2="Talent"
              Text3="Services"
              Text4="Products"
              onPress1={() => { props.navigation.navigate("Homes", { screen: 'addpost' }) }}
              onPress2={() => { props.navigation.navigate("Homes", { screen: 'addtelent' }) }}
              onPress3={() => { props.navigation.navigate("Homes", { screen: 'addservices' }) }}
              onPress4={() => { props.navigation.navigate("Homes", { screen: 'addproduct' }) }}
              img1
              Image1={Images.Icons.add1}
              Image2={Images.Icons.user1}
              Image3={Images.Icons.setting1}
              Image4={Images.Icons.lock1}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default ToolTipScreen;
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  Body: {
    backgroundColorL: 'purple',
    width: '90%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

});
// < TouchableOpacity onPress = { onPress } >
//     <Text>heljhskajdjdfjd</Text>
//                         </TouchableOpacity >