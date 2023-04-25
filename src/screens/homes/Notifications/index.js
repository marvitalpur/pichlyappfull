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
  statusBarStyle,
  statusBarTransition,
  hidden,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, Header, Row, Tip} from '../../../components';
import Icon from 'react-native-vector-icons/Entypo';
import {Images} from '../../../constants';
import { useSelector } from 'react-redux';
import { publicRequest } from '../../../makeRequest';
import moment from "moment"

const Notifications = ({route, navigation}) => {
  const user= useSelector(state=>state.user.loggedInUser);
  const [showTip, setShowTip] = useState();
  const [notifications,setNotifications]=useState({
    today:[],
    previous:[]
  });
  const [data, setData] = useState({
    DataBox: [
      {
        Imgbox: Images.Pictures.statusImg5,
        name: 'Vani',
        textmessage: 'Nice Pic❤️❤️',
        messagenumber: '2',
        Nowtext: 'just now',
      },
      {
        Imgbox: Images.Pictures.statusImg5,
        name: 'Vani',
        textmessage: 'Ok let me see...',
        messagenumber: '1',
        Nowtext: '1 day ago',
      },
      {
        Imgbox: Images.Pictures.statusImg5,
        name: 'Vani',
        textmessage: 'Ok let me see...',
        messagenumber: '7',
        Nowtext: '1 day ago',
      },
      {
        Imgbox: Images.Pictures.statusImg5,
        name: 'Vani',
        textmessage: 'Ok let me see...',
        messagenumber: '1',
        Nowtext: '1 day ago',
      },
      {
        Imgbox: Images.Pictures.statusImg5,
        name: 'Vani',
        textmessage: 'Ok let me see...',
        messagenumber: '3',
        Nowtext: 'just now',
      },
      {
        Imgbox: Images.Pictures.statusImg5,
        name: 'Vani',
        textmessage: 'Ok let me see...',
        messagenumber: '3',
        Nowtext: 'just now',
      },
      {
        Imgbox: Images.Pictures.statusImg5,
        name: 'Vani',
        textmessage: 'Ok let me see...',
        messagenumber: '3',
        Nowtext: 'just now',
      },
      {
        Imgbox: Images.Pictures.statusImg5,
        name: 'Vani',
        textmessage: 'Ok let me see...',
        messagenumber: '3',
        Nowtext: 'just now',
      },
    ],
  });

  const getNotifications= async()=>{
    try{
      const res= await publicRequest.get(`/getNotifications/${user._id}`);
      console.log('response',res.data.data);
      setNotifications({today:[...res.data.data[0]],previous:[...res.data.data[1]]})
    }
    catch(err){
      console.log('error',err);
    }
  };
  useEffect(() => {
    console.log('presss')
    getNotifications()
  }, []);
  
console.log('notifications>>>>>>>>>>>',notifications)
  return (
    // <></>
    <ImageBackground
      style={{width:'100%',height:'100%'}}
      source={Images.Pictures.appBg}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <StatusBar
          animated={true}
          backgroundColor="#000"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <View>
          <View style={styles.screenHeader}>
            <Header HeaderText hiddinText1 text1="Notifications" />
          </View>

         {notifications.today.length >0 || notifications.previous.length>0 ?
          (<View style={styles.screenBody}>
            {notifications.today.length >0 && 
            <View
            style={{width: '95%', alignSelf: 'center', marginVertical: 10}}>
            <Text style={{color: '#000', fontWeight: '400', fontSize: 16}}>
              Today
            </Text>
        
           <FlatList
              data={notifications.today}
              renderItem={({item}) => {
                console.log("moment",moment(item.date).fromNow())
                return (
                  <View>
                    <View
                      style={{
                        width: '90%',
                        height: 82,
                        alignSelf: 'center',
                        marginVertical: 5,
                        backgroundColor: '#fff',
                        elevation: 1,
                        borderRadius: 20,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginVertical: 18,
                        }}>
                        <View style={{flexDirection: 'row', width: '80%'}}>
                          <View style={{width: 60, height: 60}}>
                            <Image
                              source={{uri:item.messageBody.messageBy?item.messageBody.messageBy :'https://img.icons8.com/glyph-neue/64/000000/user.png'}}
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 31,
                                margin: -5,
                              }}
                              resizeMode="contain"
                            />
                          </View>
                          <View style={{alignSelf:'center'}}>
                            <Text style={{fontWeight:'400'   ,color:'black'}}>{item.messageBody.message}</Text>
                            <Text>{moment(item.date).fromNow()}</Text>
                          </View>
                        </View>
                        <View style={{marginTop: -30}}>
                          <Tip
                            tooltip1
                            tooltipdata1
                            content1
                            onPress={true}
                            DoteIcon={<Text>{item.Icon1}</Text>}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
              </View>
            }
           
            { notifications.previous.length > 0 &&
            <View>
            <Text style={{paddingLeft:20,color: '#000', fontWeight: '400', fontSize: 16}}>
                Previous
              </Text>
            <FlatList
              data={notifications.previous}
              renderItem={({item}) => {
                console.log('previous>>>',item);
                return (
                  <View>
                    <View
                      style={{
                        width: '90%',
                        height: 82,
                        alignSelf: 'center',
                        marginVertical: 5,
                        backgroundColor: '#fff',
                        elevation: 1,
                        borderRadius: 20,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginVertical: 18,
                        }}>
                        <View style={{flexDirection: 'row', width: '80%'}}>
                          <View style={{width: 60, height: 60}}>
                            <Image
                              source={{uri:item.messageBody.messageBy?item.messageBody.messageBy :'https://img.icons8.com/glyph-neue/64/000000/user.png'}}
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 31,
                                margin: -5,
                              }}
                              resizeMode="contain"
                            />
                          </View>
                          <View style={{alignSelf:'center'}}>
                            <Text style={{fontWeight:'400'   ,color:'black'}}>{item.messageBody.message}</Text>
                            <Text>{moment(item.date).fromNow()}</Text>
                          </View>
                        </View>
                        <View style={{marginTop: -30}}>
                          <Tip
                            tooltip1
                            tooltipdata1
                            content1
                            onPress={true}
                            DoteIcon={<Text>{item.Icon1}</Text>}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
            </View>
            
            }
            
          </View>
          )
          :
          (
            <View style={{alignSelf:'center',alignItems:'center',justifyContent:'center',width:'100%',height:'50%'}}>
            <Text style={{color:'black',fontWeight:'400'}}> No Notifications</Text>
            </View>
          )
          
        }
        
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default Notifications;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  screenBody: {
    width: '100%',
    // height: '100%',
    marginBottom: 50,
    // alignSelf: 'center'
  },
  message: {
    fontWeight: '700',
    fontSize: 18,
    color: '#000',
    marginVertical: 10,
  },
  horizental: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  box: {
    margin: 5,
    width: 64,
    height: 70,
    borderRadius: 20,
    borderColor: 'blue',
    borderWidth: 1.25,
    // backgroundColor: 'pink'
  },
  cardbox: {
    width: '100%',
    height: 80,
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    elevation: 4,
  },
  ImgView: {
    justifyContent: 'space-evenly',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'grey',
    marginLeft: 20,
  },
  vani: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  just_now_text: {
    color: 'blue',
    fontSize: 16,
  },
  btn: {
    width: 60,
    padding: 10,
    backgroundColor: 'red',
    textAlign: 'center',
  },
  Icon: {
    width: '5%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  Container: {
    flex: 1,
  },

  screenHeader: {
    width: '90%',
    height: 80,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Body: {
    backgroundColorL: 'purple',
    width: '88%',
    // height: '100%',
    alignSelf: 'center',
  },
  message: {
    fontWeight: '700',
    fontSize: 18,
    color: '#000',
    marginVertical: 10,
  },
  horizental: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  box: {
    margin: 5,
    width: 64,
    height: 70,
    borderRadius: 20,
    borderColor: 'blue',
    borderWidth: 1.25,
    // backgroundColor: 'pink'
  },
  cardbox: {
    width: '100%',
    height: 80,
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    elevation: 4,
  },
  ImgView: {
    justifyContent: 'space-evenly',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'grey',
    marginLeft: 20,
  },
  vani: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  just_now_text: {
    color: 'blue',
    fontSize: 16,
  },
  btn: {
    width: 60,
    padding: 10,
    backgroundColor: 'red',
    textAlign: 'center',
  },
  Icon: {
    width: '5%',
    alignSelf: 'center',
    marginVertical: 10,
  },
});

// <ImageBackground
//       style={styles.imageContainer}
//       source={Images.Pictures.appBg}>
//       <ScrollView

//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ flexGrow: 1 }}>
//         <View style={styles.Body}>
//           <View style={{}}>

//             <Text style={styles.message}>Notification</Text>
//           </View>
//           <FlatList
//             data={data.DataBox}
//             renderItem={({ item }) => {
//               return (
//                 <View>
//                   <View
//                     style={{
//                       width: '100%',
//                       height: 82,
//                       alignSelf: 'center',
//                       marginVertical: 5,
//                       backgroundColor: '#fff',
//                       elevation: 1,
//                       borderRadius: 20,
//                     }}>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         marginVertical: 18,
//                       }}>
//                       <View style={{ flexDirection: 'row', width: '80%' }}>
//                         <View style={{ width: 60, height: 60 }}>
//                           <Image
//                             source={item.Imgbox}
//                             style={{
//                               width: '100%',
//                               height: '100%',
//                               borderRadius: 31,
//                               margin: -5,
//                             }}
//                             resizeMode="contain"
//                           />
//                         </View>
//                         <View style={{ left: 10, marginTop: 5 }}>
//                           <View style={{ flexDirection: 'row' }}>
//                             <Text
//                               style={{
//                                 color: '#000',
//                                 fontSize: 18,
//                                 fontWeight: 'bold',
//                               }}>
//                               {item.name}
//                             </Text>
//                             <Text
//                               style={{ marginLeft: 5, top: 3, color: '#000' }}>
//                               {item.textmessage}
//                             </Text>
//                           </View>
//                           <Text>{item.Nowtext}</Text>
//                         </View>
//                       </View>
//                       <TouchableOpacity
//                         style={styles.Icon}
//                         onPress={item.Press}>
//                         <Icon
//                           name="dots-three-vertical"
//                           type="Entypo"
//                           style={{ fontSize: 26 }}
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                   <View style={styles.Body}>
//                     <View style={{ marginVertical: 10 }}>
//                       <Text style={{ color: '#000', fontWeight: 'bold' }}>Today</Text>
//                     </View>
//                     <FlatList
//                       data={data.DataBox}
//                       renderItem={({ item }) => {
//                         return (
//                           <View>
//                             <View style={{
//                               width: '100%', height: 82, alignSelf: 'center',
//                               marginVertical: 5,
//                               backgroundColor: '#fff',
//                               elevation: 1,
//                               borderRadius: 20,
//                             }}>
//                               <View style={{
//                                 flexDirection: 'row',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 marginVertical: 18
//                               }}>
//                                 <View style={{ flexDirection: 'row', width: '86%' }}>
//                                   <View style={{ width: 60, height: 60, }}>
//                                     <Image source={item.Imgbox}
//                                       style={{ width: '100%', height: '100%', borderRadius: 31, margin: -5 }}
//                                       resizeMode="contain"
//                                     />
//                                   </View>
//                                   <View style={{ left: 10, marginTop: 5, }}>
//                                     <View style={{ flexDirection: 'row', }}>
//                                       <Text style={{
//                                         color: '#000',
//                                         fontSize: 16,
//                                         fontWeight: 'bold',
//                                       }}>
//                                         {item.name}
//                                       </Text>
//                                       <Text style={{ marginLeft: 2, top: 3, color: '#000' }}>
//                                         {item.textmessage}
//                                       </Text>
//                                     </View>
//                                     <Text>
//                                       {item.Nowtext}
//                                     </Text>
//                                   </View>
//                                 </View>
//                                 <View style={{

//                                 }}></View>
