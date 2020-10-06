import React, {useContext} from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
// import ClothesTab from '../components/ClothesTab';
import CategoryList from '../components/CategoryList';
import {EvilIcons} from '@expo/vector-icons';
import {NavigationEvents} from 'react-navigation';
import {Context as ClothesContext} from '../context/ClothesContext';

const ClosetScreen = ({navigation}) => {
    //use fetches to return top 10 of each category to show on this screen
    const {state, fetchClothes} = useContext(ClothesContext);
    console.log(state.top)
    return <> 
        <NavigationEvents onWillFocus = {() => {
            fetchClothes('Top')
            fetchClothes('Bottom')
            fetchClothes('Outerwear')
            fetchClothes('Accessories')}}/>
        <ScrollView>
            <CategoryList categoryName = {'Top'} items = {state.top}/>
            <CategoryList categoryName = {'Bottom'} items = {state.bottom}/>
            <CategoryList categoryName = {'Outerwear'} items = {state.outerwear}/>
            <CategoryList categoryName = {'Accessories'} items = {state.accessories}/>
        </ScrollView>
    </>
}

const styles = StyleSheet.create({
    container : {
        justifyContent: 'space-between'
    }
});



export default ClosetScreen;