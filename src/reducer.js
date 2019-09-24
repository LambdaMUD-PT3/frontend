import { displays } from './components/Main/Room/displays';

export const initialState = {
	heading: 'Welcome to',
	display: displays.blankRoom,
	text: 'Please enter a command',
	username: '',
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
