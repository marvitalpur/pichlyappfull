import { StyleSheet, Text, View, TouchableOpacity, LinearGradient } from 'react-native'
import React, { useState } from 'react'
import { Overlay } from 'react-native-elements'
import Tooltip from 'react-native-walkthrough-tooltip';



const OverlayScreen = ({ popup1, popup2, borderRadius }) => {

    const [visible, setVisible] = useState(true);
    const [showTip, setShowTip] = useState(true)

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (

        <Overlay isVisible={visible} overlayStyle={styles.overlayStyles} onBackdropPress={toggleOverlay}>

            {popup1 && (
                <Tooltip
                    style={{}}
                    isVisible={showTip}
                    accessible={false}
                    showChildInTooltip={false}
                    content={
                        <View sty={{}}>
                            <Text>
                                Remove Notification {'\n'}
                                Turn off notificationIcon about Vani's updates
                            </Text>
                        </View>}
                    onClose={() => { setShowTip(false) }}
                    placement="bottom" >
                    <TouchableOpacity onPress={() => setShowTip(!showTip)} >
                        <LinearGradient
                            start={{ x: 1, y: 0.0 }}
                            end={{ x: 1, y: 1.9 }}
                            colors={['#5DF7B8', '#3109FB']}
                            style={{
                                width: 35,
                                height: 35,
                                borderRadius: borderRadius || 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Icon
                                type="AntDesign"
                                name="search1"
                                style={{ color: 'white', fontSize: 24 }}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </Tooltip>
            )}

            {popup2 && (
                <View>
                    <Text style={styles.headertext}>Contact</Text>
                    <View style={styles.contentView}>
                        <Text style={styles.headertext1}>Call</Text>
                        <Text style={styles.lighterText}>+12345697832</Text>
                        <Text style={styles.headertext1}>Email</Text>
                        <Text style={styles.lighterText}>user123@mail.com</Text>
                        <Text style={styles.headertext1}>Location</Text>
                        <Text style={styles.lighterText}>Lorem ipsum dolor sit.</Text>
                    </View>
                </View>
            )}

        </Overlay>
    )
}

export { OverlayScreen }

const styles = StyleSheet.create({
    overlayStyles: {
        width: '90%',
        height: 267,
        // backgroundColor: '#eae',
        borderRadius: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    headertext: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 30,
        color: '#000', textAlign: 'center'
    },
    contentView: {
        width: '80%',
        alignSelf: 'center',
        // marginVertical: 5

    },
    headertext1: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
        marginTop: 5
    },
    lighterText: {
        // fontWeight: 'bold',
        fontSize: 10,

    },
})