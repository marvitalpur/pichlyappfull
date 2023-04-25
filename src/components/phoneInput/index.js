import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

const NumInput = ({
  bgColor,
  borderC,
  backgroundColor,
  borderW,
  setState,
  state,
  onFocus,
  iconR,
  borderRadius,
}) => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');

  const phoneInput = useRef(null);
  // console.log(state.phone.toString());
  // const phone=state.pho
  return (
    <>
      <View
        style={{
          width: '100%',
          height: 51,
          color: 'black',
          // backgroundColor: 'white',
        }}>
        {/* <PhoneInput
          // defaultValue={set}
      
          value={state.phone.toString()}
          disableArrowIcon={true}
          layout="first"
          ref={phoneInput}
          defaultCode="PK"
          containerStyle={{
            width: '100%',
            // backgroundColor: backgroundColor || '#E9EBEF',
            borderRadius: 5,
          }}
          textContainerStyle={{
            // color: 'black',
            // backgroundColor:'blue'
            backgroundColor: backgroundColor || '#E9EBEF',
          }}
          textInputStyle={{
            color: 'blue',
            borderBottomWidth: 1,
          }}
          onChangeText={text => {
            // console.log(text);
            // setValue(text);
            setState({
              ...state,
              phone: text,
            });
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
          codeTextStyle={{marginLeft: -40}}
          flagButtonStyle={{marginLeft: -10}}
          autoFocus={true}
          placeholder="Phone Number"
        /> */}

        <PhoneInput
          // modalVisible={allowText}
          // disabled={allowText}
          ref={phoneInput}
          value={state.phone.toString()}
          defaultCode="PK"
          layout="first"
          // withShadow
          // autoFocus
          containerStyle={{
            width: '100%',
            // backgroundColor: backgroundColor || '#E9EBEF',
            borderRadius: 5,
          }}
          secureTextEntry={state.phone.toString()}
          // flagButtonStyle={{paddingTop: 5}}
          textContainerStyle={{
            borderRadius: borderRadius || 10,
            paddingVertical: 0,
            backgroundColor: iconR ? 'white' : null,
          }}
          textInputStyle={
            {
              // color: 'blue',
              // borderBottomWidth: 1,
            }
          }
          codeTextStyle={{marginLeft: -20}}
          // onChangeFormattedText={onFormattedText}
          // onChangeCountry={onChangeCountry}
          // onChangeText={onChangeTextPhone}
          onChangeText={text => {
            // console.log(text);
            // setValue(text);
            setState({
              ...state,
              phone: text,
            });
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
        />
        {/* <TouchableOpacity
          style={{}}
          onPress={() => {
            const checkValid = phoneInput.current?.isValidNumber(value);
            setShowMessage(true);
            setValid(checkValid ? checkValid : false);
          }}>
          <Text>Check</Text>
        </TouchableOpacity> */}
      </View>
    </>
  );
};

export {NumInput};
