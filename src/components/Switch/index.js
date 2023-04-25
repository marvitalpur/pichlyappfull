import { StyleSheet, Text, View, Switch } from 'react-native'
import React, { useState } from 'react'

const Switch1 = ({ text, navigation, onSwitch }) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View>
            <View style={styles.switchbox}>

                <View style={{ marginTop: 5 }}>
                    <Text style={{
                        color: '#323232',
                        fontSize: 18,
                    }}>{text}
                    </Text>
                </View>

                <View style={{ width: '20%', marginTop: 5 }}>
                    <Switch
                        disabled={false}
                        value={isEnabled}
                        onValueChange={toggleSwitch}
                        onChange={onSwitch}
                        trackColor={{
                            true: '#3109FB',
                            false: '#C2C2C2',
                        }}
                        thumbColor={'#FFFFFF'}
                        size="lg"
                    />
                </View>
            </View>
        </View>
    )
}

export { Switch1 }

const styles = StyleSheet.create({
    whitebox: {
        // width: '90%',
        // borderRadius: 10,
        // backgroundColor: '#fff',
        // alignSelf: 'center',
        // elevation: 2,

        // justifyContent: 'space-around'

    },
    switchbox: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})