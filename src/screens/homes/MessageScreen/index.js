// // // // // import {
// // // // //     StyleSheet,
// // // // //     Text,
// // // // //     View,
// // // // //     FlatList,
// // // // //     SafeAreaView,

// // // // // } from 'react-native'
// // // // // import React, { useState } from 'react'
// // // // // import { ChatHeader, Messages, } from '../../../components'
// // // // // import { Images } from '../../../constants';

// // // // // const MessageScreen = () => {

// // // // //     const [data, setData] = useState()


// // // // //     const DataBox = [
// // // // //         {
// // // // //             Imgbox: Images.Pictures.statusImg5,
// // // // //             name: 'Vani',
// // // // //             textmessage: 'Ok let me see...',
// // // // //             messagenumber: '2',
// // // // //             Nowtext: "just now",
// // // // //             Press: () => {
// // // // //                 navigaton.navigate('MessageScreen'), {
// // // // //                     username: 'Vani',
// // // // //                     picture: Images.Pictures.statusImg5,

// // // // //                 }
// // // // //             }

// // // // //         },
// // // // //         {
// // // // //             Imgbox: Images.Pictures.statusImg5,
// // // // //             name: 'Vani',
// // // // //             textmessage: 'Ok let me see...',
// // // // //             messagenumber: '1',
// // // // //             Nowtext: "just now"

// // // // //         },
// // // // //         {
// // // // //             Imgbox: Images.Pictures.statusImg5,
// // // // //             name: 'Vani',
// // // // //             textmessage: 'Ok let me see...',
// // // // //             messagenumber: '7',
// // // // //             Nowtext: "just now"

// // // // //         },
// // // // //         {
// // // // //             Imgbox: Images.Pictures.statusImg5,
// // // // //             name: 'Vani',
// // // // //             textmessage: 'Ok let me see...',
// // // // //             messagenumber: '1',
// // // // //             Nowtext: "just now"


// // // // //         },
// // // // //         {
// // // // //             Imgbox: Images.Pictures.statusImg5,
// // // // //             name: 'Vani',
// // // // //             textmessage: 'Ok let me see...',
// // // // //             messagenumber: '3',
// // // // //             Nowtext: "just now"

// // // // //         },
// // // // //         {
// // // // //             Imgbox: Images.Pictures.statusImg5,
// // // // //             name: 'Vani',
// // // // //             textmessage: 'Ok let me see...',
// // // // //             messagenumber: '3',
// // // // //             Nowtext: "just now"

// // // // //         },
// // // // //         {
// // // // //             Imgbox: Images.Pictures.statusImg5,
// // // // //             name: 'Vani',
// // // // //             textmessage: 'Ok let me see...',
// // // // //             messagenumber: '3',
// // // // //             Nowtext: "just now"

// // // // //         },
// // // // //         {
// // // // //             Imgbox: Images.Pictures.statusImg5,
// // // // //             name: 'Vani',
// // // // //             textmessage: 'Ok let me see...',
// // // // //             messagenumber: '3',
// // // // //             Nowtext: "just now"

// // // // //         },

// // // // //     ]

// // // // //     return (
// // // // //         <SafeAreaView style={{ flex: 1, backgroundColor: 'pink' }}>
// // // // //             <FlatList
// // // // //                 data={DataBox}
// // // // //                 renderItem={(item) => {
// // // // //                     return <Messages DataBox={item} />
// // // // //                 }}

// // // // //                 ItemSeparatorComponent={() => {

// // // // //                     return <View style={{ flex: 1, backgroundColor: 'yellow' }}></View>
// // // // //                 }}
// // // // //             />
// // // // //         </SafeAreaView>
// // // // //     )
// // // // // }
// // // // // export default MessageScreen
// // // // // const styles = StyleSheet.create({})




// // // // import React from 'react';
// // // // import {
// // // //     View,
// // // //     Text,
// // // //     StyleSheet,
// // // //     Dimensions,
// // // //     Animated,
// // // //     TouchableOpacity,
// // // // } from 'react-native';
// // // // import Swipeable from 'react-native-gesture-handler/Swipeable';

// // // // const SCREEN_WIDTH = Dimensions.get('window').width;

// // // // const Message = (props) => {
// // // //     const leftSwipe = (progress, dragX) => {
// // // //         const scale = dragX.interpolate({
// // // //             inputRange: [0, 100],
// // // //             outputRange: [0, 1],
// // // //             extrapolate: 'clamp',
// // // //         });
// // // //         return (
// // // //             <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.6}>
// // // //                 <View style={styles.deleteBox}>
// // // //                     <Animated.Text style={{ transform: [{ scale: scale }] }}>
// // // //                         Delete
// // // //                     </Animated.Text>
// // // //                 </View>
// // // //             </TouchableOpacity>
// // // //         );
// // // //     };
// // // //     return (
// // // //         <Swipeable renderLeftActions={leftSwipe}>
// // // //             <View style={styles.container}>
// // // //                 <Text>My name is {props.data.name}.</Text>
// // // //             </View>
// // // //         </Swipeable>
// // // //     );
// // // // };

// // // // export { Message };

// // // // const styles = StyleSheet.create({
// // // //     container: {
// // // //         height: 80,
// // // //         width: SCREEN_WIDTH,
// // // //         backgroundColor: 'white',
// // // //         justifyContent: 'center',
// // // //         padding: 16,
// // // //     },
// // // //     deleteBox: {
// // // //         backgroundColor: 'red',
// // // //         justifyContent: 'center',
// // // //         alignItems: 'center',
// // // //         width: 100,
// // // //         height: 80,
// // // //     },
// // // // });

// // // import React, { useState } from 'react';
// // // import { SafeAreaView, View, StyleSheet, FlatList, Text } from 'react-native';
// // // import { Message } from '../../../components';


// // // const data = [
// // //     { id: '1', name: 'A' },
// // //     { id: '2', name: 'B' },
// // //     { id: '3', name: 'C' },
// // //     { id: '4', name: 'D' },
// // //     { id: '5', name: 'E' },
// // //     { id: '6', name: 'F' },
// // //     { id: '7', name: 'G' },
// // //     { id: '8', name: 'H' },
// // //     { id: '9', name: 'I' },
// // //     { id: '10', name: 'J' },

// // // ];

// // // const chatscreen1 = () => {
// // //     const [lists, setLists] = useState(data);

// // //     const deleteItem = (index) => {
// // //         const arr = [...lists];
// // //         arr.splice(index, 1);
// // //         setLists(arr);
// // //     };
// // //     return (
// // //         <SafeAreaView style={styles.container}>
// // //             <FlatList
// // //                 data={lists}
// // //                 renderItem={({ item, index }) => {
// // //                     return <Message data={item} handleDelete={() => deleteItem(index)} />;
// // //                 }}


// // //             />
// // //         </SafeAreaView>
// // //     );
// // // };

// // // export default chatscreen1;

// // // const styles = StyleSheet.create({
// // //     container: {
// // //         flex: 1,
// // //     },
// // //     seperatorLine: {
// // //         height: 1,
// // //         backgroundColor: 'black',
// // //     },
// // // });





// // import * as React from 'react';
// // import { useState } from 'react';
// // import { Text, View, StyleSheet, FlatList, Button } from 'react-native';
// // import Swipeable from 'react-native-gesture-handler/Swipeable';

// // import Constants from 'expo-constants';

// // const DATA = [
// //   {
// //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
// //     title: 'First Item',
// //   },
// //   {
// //     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
// //     title: 'Second Item',
// //   },
// //   {
// //     id: '58694a0f-3da1-471f-bd96-145571e29d72',
// //     title: 'Third Item',
// //   },
// //   {
// //     id: '58694a0f-3da1-471f-bd96-145571e29d71',
// //     title: 'Fourth Item',
// //   },
// //   {
// //     id: '58694a0f-3da1-471f-bd96-145571e29d70',
// //     title: 'Fifth Item',
// //   },
// // ];

// // const MessageScreen = ()=> {
// //   const [listData, setListData] = useState(DATA);
// //   const row = [];
// //   const prevOpenedRow();

// //   /**
// //    *
// //    */
// //   const renderItem = ({ item, index }, onClick) => {
// //     //
// //     const closeRow = (index) => {
// //       console.log('closerow');
// //       if (prevOpenedRow && prevOpenedRow !== row[index]) {
// //         prevOpenedRow.close();
// //       }
// //       prevOpenedRow = row[index];
// //     };

// //     const renderRightActions = (progress, dragX, onClick) => {
// //       return (
// //         <View
// //           style={{
// //             margin: 0,
// //             alignContent: 'center',
// //             justifyContent: 'center',
// //             width: 70,
// //           }}>
// //           <Button color="red" onPress={onClick} title="DELETE"></Button>
// //         </View>
// //       );
// //     };

// //     return (
// //       <Swipeable
// //         renderRightActions={(progress, dragX) =>
// //           renderRightActions(progress, dragX, onClick)
// //         }
// //         onSwipeableOpen={() => closeRow(index)}
// //         ref={(ref) => (row[index] = ref)}
// //         rightOpenValue={-100}>
// //         <View
// //           style={{
// //             margin: 4,
// //             borderColor: 'grey',
// //             borderWidth: 1,
// //             padding: 9,
// //             backgroundColor: 'white',
// //           }}>
// //           <Text>{item.title}</Text>
// //         </View>
// //       </Swipeable>
// //     );
// //   };

// //   const deleteItem = ({ item, index }) => {
// //     console.log(item, index);
// //     let a = listData;
// //     a.splice(index, 1);
// //     console.log(a);
// //     setListData([...a]);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <FlatList
// //         data={listData}
// //         renderItem={(v) =>
// //           renderItem(v, () => {
// //             console.log('Pressed', v);
// //             deleteItem(v);
// //           })
// //         }
// //         keyExtractor={(item) => item.id}></FlatList>
// //     </View>
// //   );
// // }

// // export default MessageScreen
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     paddingTop: Constants.statusBarHeight,
// //     backgroundColor: '#ecf0f1',
// //     padding: 8,
// //   },
// //   paragraph: {
// //     margin: 24,
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //   },
// // });



// import React, { Component } from 'react';
// import { Animated, StyleSheet, View } from 'react-native';
// import { RectButton } from 'react-native-gesture-handler';
// import Swipeable from 'react-native-gesture-handler/Swipeable';

// class MMessageScreen extends Component {
//     renderLeftActions = (progress, dragX) => {
//         const trans = dragX.interpolate({
//             inputRange: [0, 50, 100, 101],
//             outputRange: [-20, 0, 0, 1],
//         });
//         return (
//             <RectButton style={styles.leftAction} onPress={this.close}>
//                 <Animated.Text
//                     style={[
//                         styles.actionText,
//                         {
//                             transform: [{ translateX: trans }],
//                         },
//                     ]}>
//                     Archive
//                 </Animated.Text>
//             </RectButton>
//         );
//     };
//     render() {
//         return (
//             <Swipeable renderLeftActions={this.renderLeftActions}>
//                 <Text>"hello"</Text>
//             </Swipeable>
//         );
//     }
// }









import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import SwipeButton from 'rn-swipe-button';

const MessageScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Swipe Button
                </Text>
                <SwipeButton
                    disabled={false}
                    swipeSuccessThreshold={70}
                    height={30}
                    width={100}
                    title="Swipe to Right"
                    titleColor="white"
                    shouldResetAfterSuccess="true"
                    onSwipeSuccess={() => {
                        alert('Swiped Successfully!');
                    }}
                    railFillBackgroundColor="#c1c1c1"
                    railFillBorderColor="#c1c1c1"
                    thumbIconBackgroundColor="#ffffff"
                    thumbIconBorderColor="#c1c1c1"
                    railBackgroundColor="#767888"
                    railBorderColor="#c1c1c1"
                />
            </View>
        </SafeAreaView>
    );
};

export default MessageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
});