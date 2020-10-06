import React, {useContext} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity} from 'react-native';

const SaveButton = ({isSaving, onClick}) => {
    return <>
        <Button
        title = {'Save'}
        onPress = {onClick}
        />
    </>
}

const styles = StyleSheet.create({
});

export default SaveButton;