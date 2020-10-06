import React, {useContext, useState} from 'react';
import {View, StyleSheet, Button, ScrollView, TextInput, Text, BackHandler} from 'react-native';
import ScrollCard2 from '../components/ScrollCard2';
import {Context as ClothesContext} from '../context/ClothesContext';
import {Context as OutfitsContext} from '../context/OutfitsContext';
import {NavigationEvents} from 'react-navigation';
import CustomMultiPicker from '../components/CustomMultiPicker';
import * as Animatable from 'react-native-animatable';

const OutfitCreateScreen = ({navigation}) => {
    const{state, fetchClothes} = useContext(ClothesContext);
    const{createOutfit} = useContext(OutfitsContext);
    const outfitsContext = useContext(OutfitsContext).state;
    const[tops, setTops] = useState([]);
    const[bottoms, setBottoms] = useState([]);
    const[outerwears, setOuterwear] = useState([]);
    const[accessories, setAccessories] = useState([]);
    const[outfitName, setOutfitName] = useState('');
    const[validity, setValidity] = useState({isValidOutfitName : true, isValidOutfit: true})
    const handleValidOutfitName = (value) => {
        if(value != '') {
            setValidity({...validity, isValidOutfitName: true})
        }
        else{
            setValidity({...validity, isValidOutfitName: false})
        }
    }
    const handleSave = () => {
        let isValidOutfitName = true;
        let isValidOutfit = true;
        if((tops.length === 0 && bottoms.length === 0 && outerwears.length === 0 && accessories.length === 0)) {
            isValidOutfit = false;
        }
        if(outfitName === '') {
            isValidOutfitName = false;
        }
        if(isValidOutfitName === false || isValidOutfit === false) {
            setValidity({isValidOutfitName, isValidOutfit})
            return;
        }
        createOutfit({name: outfitName , tops, bottoms, outerwears, accessories})
        console.log('Inside: ' + outfitsContext.missingDataError)
        navigation.navigate('OutfitList')
    }
    return <>
    <NavigationEvents onWillFocus = {() => {
            fetchClothes('Top')
            fetchClothes('Bottom')
            fetchClothes('Outerwear')
            fetchClothes('Accessories')}}/>
        <ScrollView style = {styles.container}>
            <TextInput
                style={styles.searchBoxStyle}
                onChangeText={(text) => { setOutfitName(text) }}
                clearButtonMode={'always'}
                placeholder={'Enter Name of Outfit'}
                placeholderTextColor={'#757575'}
                underlineColorAndroid={'transparent'}
                onEndEditing = {(e) => handleValidOutfitName(e.nativeEvent.text)}
            />
            {validity.isValidOutfitName ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style = {styles.errorMsg}>Please enter Valid name</Text>
                </Animatable.View>
            }
            <CustomMultiPicker
                options={state.top.map(i => [i.name, i._id])}
                search={true} // should show search bar?
                multiple={true} //
                placeholder={"Search"}
                placeholderTextColor={'#757575'}
                returnValue={"label"} // label or value
                callback={(res)=>{ setTops(res) }} // callback, array of selected items
                rowBackgroundColor={"#eee"}
                rowHeight={40}
                rowRadius={5}
                searchIconName="ios-checkmark"
                searchIconColor="red"
                searchIconSize={30}
                iconColor={"#00a2dd"}
                iconSize={30}
                selectedIconName={"md-radio-button-on"}
                unselectedIconName={"md-radio-button-off"}
                scrollViewHeight={130}
            />
            <CustomMultiPicker
                    options={state.bottom.map(i => [i.name, i._id])}
                    search={true} // should show search bar?
                    multiple={true} //
                    placeholder={"Search"}
                    placeholderTextColor={'#757575'}
                    returnValue={"label"} // label or value
                    callback={(res)=>{ setBottoms(res) }} // callback, array of selected items
                    rowBackgroundColor={"#eee"}
                    rowHeight={40}
                    rowRadius={5}
                    searchIconName="ios-checkmark"
                    searchIconColor="red"
                    searchIconSize={30}
                    iconColor={"#00a2dd"}
                    iconSize={30}
                    selectedIconName={"md-radio-button-on"}
                    unselectedIconName={"md-radio-button-off"}
                    scrollViewHeight={130}
                />
            <CustomMultiPicker
                    options={state.outerwear.map(i => [i.name, i._id])}
                    search={true} // should show search bar?
                    multiple={true} //
                    placeholder={"Search"}
                    placeholderTextColor={'#757575'}
                    returnValue={"label"} // label or value
                    callback={(res)=>{ setOuterwear(res) }} // callback, array of selected items
                    rowBackgroundColor={"#eee"}
                    rowHeight={40}
                    rowRadius={5}
                    searchIconName="ios-checkmark"
                    searchIconColor="red"
                    searchIconSize={30}
                    iconColor={"#00a2dd"}
                    iconSize={30}
                    selectedIconName={"md-radio-button-on"}
                    unselectedIconName={"md-radio-button-off"}
                    scrollViewHeight={130}
                />
            <CustomMultiPicker
                    options={state.accessories.map( i => [i.name, i._id])}
                    search={true} // should show search bar?
                    multiple={true} //
                    placeholder={"Search"}
                    placeholderTextColor={'#757575'}
                    returnValue={"label"} // label or value
                    callback={(res)=>{ setAccessories(res) }} // callback, array of selected items
                    rowBackgroundColor={"#eee"}
                    rowHeight={40}
                    rowRadius={5}
                    searchIconName="ios-checkmark"
                    searchIconColor="red"
                    searchIconSize={30}
                    iconColor={"#00a2dd"}
                    iconSize={30}
                    selectedIconName={"md-radio-button-on"}
                    unselectedIconName={"md-radio-button-off"}
                    scrollViewHeight={130}
                />
            {validity.isValidOutfit ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style = {styles.errorMsg}>You must add atleast one item of clothing</Text>
                </Animatable.View>
            }
            <Button title = {'Save'} onPress={handleSave}/>
        </ScrollView>
    </>
}

const styles = StyleSheet.create({
    searchBoxStyle: {
        //width: this.state.pageWidth-20,
        height: 35,
        margin: 0,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        padding: 5,
        paddingLeft: 30,
        borderWidth: 1,
        borderRadius: 5
      },
      errorMsg: {
          color: 'red',
          marginLeft: 10,
      },
      container : {flex: 5}
});

OutfitCreateScreen.navigationOptions = ({navigation}) => {
    return {
         headerTitle: `Create new outfit`,
    }
};

export default OutfitCreateScreen;