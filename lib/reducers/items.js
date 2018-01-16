import { changeData } from '../firebase/firebase';

const initialState = [];

export default function items(state = initialState, action) {
	if (action.type === 'FETCH_DATA_SUCCESS') {
		return action.payload;
	}
	if (action.type === 'TOOGLE_CHECK') {
		changeData(action.payload);
		return state.map((item) => (item.id !== action.payload) ? item : {...item, done: !item.done})
	}
	return state;
}