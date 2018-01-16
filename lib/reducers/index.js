import { combineReducers } from 'redux';
import items from './items';
import filterItems from './filter';

export default combineReducers({
	items,
	filterItems
});