import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserBios = () => {
    return (
        <View style={styles.whitebox}>
            <View style={styles.textView}>



            </View>
        </View>
    )
}

export { UserBios }

const styles = StyleSheet.create({

    whitebox: {
        width: '90%',
        height: '80%',
        borderRadius: 10,
        backgroundColor: '#fff',
        alignSelf: 'center',
        elevation: 2,
    },
})