import createDataContext from './createDataContext';
import closetApi from '../api/closetApi';

const outfitsReducer = (state, action) => {
    switch (action.type){
        case 'clear_error_message':
            return {...state, duplicateErrorMessage: '', deleteErrorMessage: '', missingDataError: ''};
        case 'fetch_outfits':
            return {...state, outfits: action.payload};
        case 'duplicate_item_error':
            return {...state, duplicateErrorMessage: action.payload};
        case 'delete_item_error':
            return {...state, deleteErrorMessage: action.payload};
        case 'missing_data_error':
            return {...state, missingDataError: action.payload}
        default:
            return state;
    }
};
const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
}
const fetchOutfits = dispatch => async () => {
    const response = await closetApi.get('/outfits');
    dispatch({type: 'fetch_outfits', payload: response.data})
};
//Add try catch statements and errorMessages and handle them in screens
const createOutfit = dispatch => async(outfit) => {
    const {name, description, tops, bottoms, outerwears, accessories} = outfit;
    if(!name) {
        dispatch({type: 'missing_data_error', payload: 'Please enter a name for the outfit'})
    }
    if(!(tops & bottoms & outerwears & accessories) && !(tops.length === 0 & bottoms.length === 0 & outerwears.length === 0 & accessories.length === 0)) {
        dispatch({type: 'missing_data_error', payload: 'You must add atleast one item of clothing'})
    }
    try{
        await closetApi.post('/outfits', outfit);
        dispatch({type: 'clear_error_message'})
    }
    catch(err) {
        dispatch({type: 'duplicate_item_error', payload: 'Item already exists'})
    }
};
const deleteOutfit = dispatch => async(id) => {
    if(!id) {
        dispatch({type: 'delete_item_error', payload: 'Id missing'})
    }
    try{
        await closetApi.delete(`/outfits/${id}`);
    }
    catch(err) {
        dispatch({type: 'delete_item_error', payload: 'Failed to delete item'})
    }
};

export const {Context, Provider} = createDataContext(
    outfitsReducer,
    {clearErrorMessage, fetchOutfits, createOutfit, deleteOutfit},
    {outfits: [], duplicateErrorMessage: '', deleteErrorMessage: '', missingDataError: ''}
)