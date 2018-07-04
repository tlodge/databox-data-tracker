import { combineReducers } from 'redux';
//import { routerReducer as routing } from 'react-router-redux';

import flows, { NAME as flowsName } from './features/flows';


export default combineReducers({
    //routing,
    [flowsName]: flows,
});
