// // import { Dimensions, StyleSheet, Text, View } from 'react-native'
// // import React from 'react'
// // import { Item } from 'native-base'
// // import Swipeable from 'react-native-gesture-handler/Swipeable';

// // const SCREEN_WIDTH = Dimensions.get('window').width;

// // const Messages = (props) => {

// //     const LeftSwipe = () => {
// //         return (
// //             <View>
// //                 <Text>Delete</Text>
// //             </View>
// //         )
// //     }
// //     return (
// //         <Swipeable
// //             renderLeftActions={LeftSwipe}
// //         >
// //             <View style={styles.container}
// //             >
// //                 <Text> my name is {props.Nowtext}</Text>
// //             </View>
// //         </Swipeable>
// //     )
// // }

// // export { Messages }

// // const styles = StyleSheet.create({
// //     container: {
// //         width: SCREEN_WIDTH, height: 80, backgroundColor: 'grey',
// //         justifyContent: 'center',
// //         alignContent: 'center'

// //     }
// // })



// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     Dimensions,
//     Animated,
//     TouchableOpacity,
// } from 'react-native';
// import Swipeable from 'react-native-gesture-handler/Swipeable';

// const SCREEN_WIDTH = Dimensions.get('window').width;

// const Message = (props) => {
//     const leftSwipe = (progress, dragX) => {
//         const scale = dragX.interpolate({
//             inputRange: [0, 100],
//             outputRange: [0, 1],
//             extrapolate: 'clamp',
//         });
//         return (
//             <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.6}>
//                 <View style={styles.deleteBox}>
//                     <Text>mggkjgtgrlenhngf</Text>

//                 </View>
//             </TouchableOpacity>
//         );
//     };
//     return (
//         <View>
//             <View style={styles.container}>
//                 <Text>My name is {props.data.name}.</Text>
//             </View>
//         </View>
//     );
// };
// export { Message };

// const styles = StyleSheet.create({
//     container: {
//         height: 80,
//         width: SCREEN_WIDTH,
//         backgroundColor: 'white',
//         justifyContent: 'center',
//         padding: 16,
//     },
//     deleteBox: {
//         backgroundColor: 'red',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 100,
//         height: 80,
//         color: '#000'
//     },
// });