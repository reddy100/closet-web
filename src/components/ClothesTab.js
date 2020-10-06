import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CategoryList from './CategoryList';

const ClothesTab = () => {
    return (
        <View style = {styles.container}>
            <CategoryList categoryName = {'Top'}/>
            <CategoryList categoryName = {'Bottom'}/>
            <CategoryList categoryName = {'Outerwear'}/>
            <CategoryList categoryName = {'Accessories'}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        justifyContent: 'flex-end'
    }
});

export default ClothesTab;