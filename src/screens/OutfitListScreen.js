import React, {useContext} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import AddButton from '../components/AddButton';
import {NavigationEvents} from 'react-navigation';
import {Context as OutfitsContext} from '../context/OutfitsContext';
import ScrollCard from '../components/ScrollCard';


const OutfitListScreen = () => {

    const {state, fetchOutfits, deleteOutfit} = useContext(OutfitsContext);

    const renderItem = ({ item }) => {
        return (
                <View>
                    <ScrollCard outfit = {item} deleteFunc = {deleteOutfit} deleteCallback = {fetchOutfits}/>
                </View>
        );
    }
    return <View style = {{flex:1}}>
        <NavigationEvents onWillFocus = {() => {
            fetchOutfits()}}/>
        <FlatList
            data ={state.outfits}
            keyExtractor = {item => item.name}
            renderItem = {renderItem}
            />
        <AddButton nextScreen = {'OutfitCreate'}/>
    </View>
    
}


const styles = StyleSheet.create({
});

OutfitListScreen.navigationOptions = ({navigation}) => {
    return {
         headerTitle: `Outfits`,
    }
};

export default OutfitListScreen;