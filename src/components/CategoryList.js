import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {View, StyleSheet, FlatList, Text, TouchableOpacity, Button} from 'react-native';
import {Card} from 'react-native-elements';
import { navigate } from '../navigationRef';
///use react-native-snap-carousel when images can be uploaded here
const CategoryList = ({categoryName, items, includeAddition}) => {
    //Make card item that as atouchable opacity just on the title and can still scroll through the list under card
    return(
        <View>
            <TouchableOpacity onPress = {() => 
                           navigate('ClosetGridScreen', {categoryName}) }>
            <Card title = {categoryName} containerStyle = {styles.outerCard} dividerStyle = {{marginBottom: 10}}>
            {
            (items.length===0)?
                <Text> Please add new clothes here</Text>:
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator = {false}
                    data ={items}
                    keyExtractor = {item => item.name}
                    renderItem = {({ item }) => {
                        return <Card 
                                title = {item.name} 
                                containerStyle= {styles.innerCard} 
                                titleStyle = {styles.innerTitle}
                                dividerStyle = {{width: 0}}
                                />
                    }}
                
                />
            }
            </Card>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    outerCard: {
        paddingLeft: 0, 
        paddingRight: 0
    },
    innerCard : {
        height: 50, 
        width: 100,
        padding: 0,
        marginHorizontal: 5
    },
    innerTitle : {
        fontSize: 14,

    }
});

export default CategoryList;