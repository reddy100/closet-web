import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import Spacer from './Spacer';

const PopUp = ({headerText, onSubmit, toggleModal, getErrorMessage, categoryName}) => {
    const [name, setName] = useState('');
    return (
        <View style={styles.container}>
            <Spacer>
            <Text h3 style={styles.text}>{headerText}</Text>
            </Spacer>
                <Input label = "Name" value = {name} onChangeText = {setName} inputStyle={styles.text}/>
            <Spacer />
            <Spacer>
                <Button title = "Add" onPress = {async() => {
                    await onSubmit(categoryName, name)
                    setName('')
                    }}/>
            </Spacer>
            {getErrorMessage() ? <Text style = {styles.errorMessage}>{getErrorMessage()}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white'
    },
    errorMessage: {
        fontSize :16, 
        color: 'red',
        marginLeft: 15,
        marginTop: 15
}
});

export default PopUp;