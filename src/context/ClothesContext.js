import createDataContext from './createDataContext';
import closetApi from '../api/closetApi';

const clothesReducer = (state, action) => {
    switch (action.type){
        case 'clear_error_message':
            return {...state, duplicateErrorMessage: '', deleteErrorMessage: ''};
        case 'fetch_top':
            return {...state, top: action.payload};
        case 'fetch_bottom':
            return {...state, bottom: action.payload};
        case 'fetch_outerwear':
            return {...state, outerwear: action.payload};
        case 'fetch_accessories':
            return {...state, accessories: action.payload};
        case 'fetch_all':
            return {...state, accessories: action.payload};
        case 'duplicate_item_error':
            return {...state, duplicateErrorMessage: action.payload};
        case 'delete_item_error':
            return {...state, deleteErrorMessage: action.payload};
        default:
            return state;
    }
};
const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
}
const fetchClothes = dispatch => async (categoryName = '') => {
    if(categoryName === '') {
        throw new Error('Empty clothes category passed')
    }
    else {
        const {endpoint, type} = pickClothesCategory(categoryName);
        const response = await closetApi.get(endpoint);
        dispatch({type, payload: response.data})
    }
};
//Add try catch statements and errorMessages and handle them in screens
const createClothes = dispatch => async(categoryName, name) => {
    const {endpoint,type} = pickClothesCategory(categoryName);
    try{
        await closetApi.post(endpoint, {name});
        dispatch({type: 'clear_error_message'})
    }
    catch(err) {
        dispatch({type: 'duplicate_item_error', payload: 'Item already exists'})
    }
};
const deleteClothes = dispatch => async(categoryName, name) => {
    const {endpoint, type} = pickClothesCategory(categoryName);
    try{
        await closetApi.delete(`${endpoint}/${name}`);
    }
    catch(err) {
        dispatch({type: 'delete_item_error', payload: 'Failed to delete item'})
    }
};

const pickClothesCategory = (categoryName) => {
    if(categoryName === 'Top') {
        return {endpoint: '/topClothes', type: 'fetch_top'}
    }
    else if(categoryName === 'Bottom') {
        return {endpoint: '/bottomClothes', type: 'fetch_bottom'}
    }
    else if(categoryName === 'Outerwear') {
        return {endpoint: '/outerwearClothes', type: 'fetch_outerwear'}
    }
    else if(categoryName === 'Accessories') {
        return {endpoint: '/accessories', type: 'fetch_accessories'}
    }
}

export const {Context, Provider} = createDataContext(
    clothesReducer,
    {clearErrorMessage, fetchClothes, createClothes, deleteClothes},
    {top: [], bottom: [], outerwear: [], accessories: [], duplicateErrorMessage: '', deleteErrorMessage: ''}
)