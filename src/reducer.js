import { displays } from './components/Main/Room/displays';

export const initialState = {
	heading: 'Welcome to',
	display: displays.defaultDisplay,
	text: 'Please enter a command.',
	username: '',
	key: null,
	map: null,
	exits: null,
	roomId: null,
	commands: [
		{
			command: 'login',
			example: '{username} {password}',
		},
		{
			command: 'register',
			example: '{username} {password}',
		},
	],
};

export const reducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'NO_INPUT':
			return { ...state, text: 'No command entered. Please enter a command.' };
		case 'INVALID_COMMAND':
			return {
				...state,
				text:
					'The command entered is invalid. You can find a list of commands to the right of the screen.',
			};
		case 'INCOMPLETE_COMMAND':
			return {
				...state,
				text: payload,
			};
		case 'SET_KEY':
			return {
				...state,
				key: payload,
			};
		case 'CHANGE_ROOM':
			const { title, description, name, exits, room_id } = payload;
			const { n, s, e, w } = exits;
			let roomDisplay;
			if (n && !s && !e && !w) {
				roomDisplay = displays.northOnly;
			} else if (e && s && n && !w) {
				roomDisplay = displays.northEastSouth;
			} else if (e && !s && !n && !w) {
				roomDisplay = displays.eastOnly;
			} else if (e && !s && n && !w) {
				roomDisplay = displays.eastNorth;
			} else if (e && s && !n && !w) {
				roomDisplay = displays.eastSouth;
			} else if (e && !s && n && w) {
				roomDisplay = displays.eastNorthWest;
			} else if (e && s && n && w) {
				roomDisplay = displays.allDirections;
			} else if (!e && s && n && w) {
				roomDisplay = displays.northWestSouth;
			} else if (!e && !s && n && w) {
				roomDisplay = displays.northWest;
			} else if (!e && s && n && !w) {
				roomDisplay = displays.northSouth;
			} else if (!e && !s && !n && w) {
				roomDisplay = displays.westOnly;
			} else if (e && !s && !n && w) {
				roomDisplay = displays.westEast;
			} else if (!e && s && !n && w) {
				roomDisplay = displays.westSouth;
			} else if (e && s && !n && w) {
				roomDisplay = displays.westEastSouth;
			} else if (!e && s && !n && !w) {
				roomDisplay = displays.southOnly;
			}
			return {
				...state,
				username: name,
				heading: title,
				display: roomDisplay,
				text: description,
				exits,
				roomId: room_id,
				commands: [
					{ command: 'move', example: '{north | south | east | west}' },
				],
			};
		case 'LOAD_MAP':
			return {
				...state,
				map: payload,
			};
		default:
			return state;
	}
};
