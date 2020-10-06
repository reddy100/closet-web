import React, {useContext} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {NavigationEvents} from 'react-navigation';
import NavLink from '../components/NavLink';
import AuthForm from '../components/AuthForm';

const SigninScreen = () => {
    const {state, signin, clearErrorMessage} = useContext(AuthContext);

    return <View style = {styles.container}>
        <NavigationEvents 
        onWillFocus = {clearErrorMessage}
        />
        <AuthForm
        headerText = "Sign into Closet"
        errorMessage = {state.errorMessage}
        buttonText = "Sign In"
        onSubmit = {signin}
        />
        <NavLink
        routeName = 'Signup'
        text = 'Dont have an account? Sign up instead'
    />
    </View>
}

SigninScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    }
});


export default SigninScreen