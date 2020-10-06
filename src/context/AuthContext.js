import {AsyncStorage} from 'react-native'
import createDataContext from './createDataContext';
import closetApi from '../api/closetApi';
import {navigate} from '../navigationRef'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signin':
            return {errorMessage: '', token: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        case 'signout':
            return {token: null, errorMessage: ''};
        default:
            return state;
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
}

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if(token) {
        dispatch({type: 'signin', payload: token})
        navigate('Closet')
    }
    else{
        navigate('loginFlow')
    }
}

const signup = (dispatch) => async ({email, password}) => {
        try {
        const response = await closetApi.post('/signup', {email, password})
        await AsyncStorage.setItem('token', response.data.token)
        dispatch({type: 'signin', payload: response.data.token})
        navigate('Closet')
    } catch(err) {
        dispatch({type: 'add_error', payload: 'Something went wrong with signup'})
        }
    };

const signin = (dispatch) => async ({email, password}) => {
    try{
        const response = await closetApi.post('/signin', {email, password});
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signin', payload: response.data.token})
        navigate('Closet');
    } catch(err) {
        dispatch({type: 'add_error', payload: 'Something went wrong with signin'})
    }
    }

const signout = (dispatch) => async() => {
        await AsyncStorage.removeItem('token');
        dispatch({type: 'signout'});
        navigate('loginFlow');
    }


export const {Provider, Context} = createDataContext(
    authReducer,
    {signin, signout, signup, clearErrorMessage, tryLocalSignin},
    {token: null, errorMessage: ''}
);