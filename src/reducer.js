import { displays } from './components/Main/Room/displays'

export const initialState = {
  heading: 'Welcome to',
  display: displays.defaultDisplay,
  text: 'Please enter a command.',
  username: '',
  key: null,
}

export const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'NO_INPUT':
      return { ...state, text: 'No command entered. Please enter a command.' }
    case 'INVALID_COMMAND':
      return {
        ...state,
        text:
          'The command entered is invalid. You can find a list of commands to the right of the screen.',
      }
    case 'INCOMPLETE_COMMAND':
      return {
        ...state,
        text: payload,
      }
    case 'SET_KEY':
      return {
        ...state,
        key: payload,
      }
    case 'CHANGE_ROOM':
      const { title, description, name } = payload
      return {
        ...state,
        username: name,
        heading: title,
        text: description,
      }
    default:
      return state
  }
}
