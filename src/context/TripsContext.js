import createDataContext from './createDataContext';
import closetApi from '../api/closetApi';

const tripsReducer = (state, action) => {
    switch (action.type){
        case 'clear_error_message':
            return {...state, duplicateErrorMessage: '', deleteErrorMessage: '', missingDataError: ''};
        case 'fetch_trips':
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
const fetchTrips = dispatch => async () => {
    const response = await closetApi.get('/trips');
    dispatch({type: 'fetch_trips', payload: response.data})
};
//Add try catch statements and errorMessages and handle them in screens
const createTrip = dispatch => async(trip) => {
    const {name, location, description, tops, bottoms, outerwears, accessories, outfits} = trip;
    if(!name) {
        dispatch({type: 'missing_data_error', payload: 'Please enter a name for the outfit'})
    }
    if(!location) {
        dispatch({type: 'missing_data_error', payload: 'Please enter a location'})
    }
    if(!(tops & bottoms & outerwears & accessories & outfits) && !(tops.length === 0 & bottoms.length === 0 & outerwears.length === 0 & accessories.length === 0 & outfits.length ===0)) {
        dispatch({type: 'missing_data_error', payload: 'You must add atleast one item of clothing'})
    }
    try{
        await closetApi.post('/trips', trips);
        dispatch({type: 'clear_error_message'})
    }
    catch(err) {
        dispatch({type: 'duplicate_item_error', payload: 'Item already exists'})
    }
};
const deleteTrip = dispatch => async(id) => {
    if(!id) {
        dispatch({type: 'delete_item_error', payload: 'Id missing'})
    }
    try{
        await closetApi.delete(`/trips/${id}`);
    }
    catch(err) {
        dispatch({type: 'delete_item_error', payload: 'Failed to delete item'})
    }
};

export const {Context, Provider} = createDataContext(
    tripsReducer,
    {clearErrorMessage, fetchTrips, createTrip, deleteTrip},
    {trips: [], duplicateErrorMessage: '', deleteErrorMessage: '', missingDataError: ''}
)