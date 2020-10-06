import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {NavigationEvents} from 'react-navigation'
import NavLink from '../components/NavLink';
import AuthForm from '../components/AuthForm';

const SignupScreen = () => {
    const {state, signup, clearErrorMessage} = useContext(AuthContext);

    return <View style = {styles.container}>
        <NavigationEvents 
        onWillFocus = {clearErrorMessage}
         />
        <AuthForm
        headerText = "Sign Up for Closet"
        errorMessage = {state.errorMessage}
        buttonText = "Sign Up"
        onSubmit = {signup}
        />
        <NavLink
        routeName = 'Signin'
        text = 'Already have an account? Sign in instead'
    />
    </View>
}

SignupScreen.navigationOptions = () => {
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

export default SignupScreen;