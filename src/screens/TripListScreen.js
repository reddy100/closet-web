import React, {useContext} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import AddButton from '../components/AddButton';
import {NavigationEvents} from 'react-navigation';
import {Context as TripsContext} from '../context/TripsContext';
import ScrollCard from '../components/ScrollCard';


const TripListScreen = () => {

    const {state, fetchTrips, deleteTrip} = useContext(TripsContext);

    const renderItem = ({ item }) => {
        return (
                <View>
                    <ScrollCard trip = {item} deleteFunc = {deleteTrip} deleteCallback = {fetchTrips}/>
                </View>
        );
    }
    return <View style = {{flex:1}}>
        <NavigationEvents onWillFocus = {() => {
            fetchTrips()}}/>
        <FlatList
            data ={state.outfits}
            keyExtractor = {item => item.name}
            renderItem = {renderItem}
            />
        <AddButton nextScreen = {'TripCreate'}/>
    </View>
    
}


const styles = StyleSheet.create({
});

TripListScreen.navigationOptions = ({navigation}) => {
    return {
         headerTitle: `Trips`,
    }
};

export default TripListScreen;