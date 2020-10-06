import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigate } from '../navigationRef';

const AddButton = ({nextScreen}) => {
    return <View>
    <TouchableOpacity
                style={{
                    borderWidth:1,
                    borderColor:'rgba(0,0,0,0.2)',
                    alignItems:'center',
                    justifyContent:'center',
                    width:70,
                    position: 'absolute',                                          
                    bottom: 10,                                                    
                    right: 10,
                    height:70,
                    backgroundColor:'#fff',
                    borderRadius:100,
                }}
                onPress = {() => 
                  navigate(nextScreen) }>
                <Icon name="ios-add"  size={30} color="#01a699" />
            </TouchableOpacity>                
   </View>
}

const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });

export default AddButton;