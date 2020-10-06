import React, {useContext, useState} from 'react';
import {Alert, View, StyleSheet, FlatList, Dimensions, Text, TouchableOpacity, Button} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import PopUp from '../components/PopUp';
import {Context as ClothesContext} from '../context/ClothesContext';
import Modal from 'react-native-modal';
import {EvilIcons} from '@expo/vector-icons';

const numColumns = 3;
const ClosetGridScreen = ({navigation}) => {
    const {state, fetchClothes, createClothes, deleteClothes, clearErrorMessage} = useContext(ClothesContext);
    const categoryName = navigation.state.params.categoryName;
    const [isModalVisible, setModalVisible] = useState(false);
    let items = state[categoryName.toLowerCase()]
    items = [{name: '+ Add New'}].concat(items)
    const getDuplicateErrorMessage = () => {
        return state.duplicateErrorMessage;
    }
    const getDeleteErrorMessage = () => {
        return state.deleteErrorMessage;
    }
    console.log(getDeleteErrorMessage())
    const toggleModal = () => {
        clearErrorMessage();
        setModalVisible(!isModalVisible);
        fetchClothes(categoryName)
    };
    const createSingleButtonAlert = () =>
    Alert.alert(
      "Delete Error",
      getDeleteErrorMessage(),
      [
        { text: "OK", onPress: () => {
            console.log("OK Pressed")
            clearErrorMessage()
        } }
      ],
      { cancelable: false }
    );
        
    const renderItem = ({ item }) => {
        if (item.empty === true) {
          return <View style={styles.item} />;
        }
        else if(item.name === '+ Add New') {
            return ( 
            <View style={styles.addButtonitem}>
                <TouchableOpacity onPress={toggleModal}>
                        <Text style={styles.addButtonitemText}>{item.name}</Text>
                </TouchableOpacity>
                <Modal 
                    isVisible={isModalVisible} 
                    onBackdropPress = {toggleModal}
                    onBackButtonPress = {toggleModal}>
                    <View style={styles.popUpContainer}>
                        <PopUp 
                        headerText = {'Add New Clothes'}
                        categoryName = {categoryName}
                        onSubmit = {createClothes}
                        getErrorMessage = {getDuplicateErrorMessage}
                        toggleModal={async() => {
                                toggleModal()
                        }}
                        />
                    </View>
                </Modal>
            </View>
        );
        }
        return (
            <TouchableOpacity onLongPress = {async() => {
                await deleteClothes(categoryName, item.name)
                await fetchClothes(categoryName)
                if(getDeleteErrorMessage())
                    createSingleButtonAlert()
                }}
                style={styles.item}>
                <View>
                    <Text style={styles.itemText}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
      };

    return (
    <View style = {{margin: 5}}>
        <NavigationEvents onWillBlur = {() => {
            fetchClothes(categoryName)
            clearErrorMessage()}}/>
        <FlatList
            data ={items}
            keyExtractor = {item => item.name}
            renderItem = {renderItem}
            numColumns={3}
            />
    </View>
    )
}

const styles = StyleSheet.create({
    grid: {
        marginBottom: 32,
        marginTop: 16,
        alignItems: 'center'
    },
    item: {
        backgroundColor: '#4D243D',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    itemText: {
        color: '#fff',
        textAlign: 'center',
    },
    addButtonitemText: {
        color: 'black'
    },
    addButtonitem: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / numColumns, // approximate a square
    },
});


ClosetGridScreen.navigationOptions = ({navigation}) => {
    return {
         headerTitle: `Closet: ${navigation.state.params.categoryName}`,

    }
};


export default ClosetGridScreen;