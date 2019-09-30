import React, { useContext, useEffect } from 'react';
import axios from 'axios';

import GlobalStyle from './styles/GlobalStyle';

import { Context } from './context';

import Header from './components/Header';
import Main from './components/Main';

function App() {
	const { dispatch } = useContext(Context);
	useEffect(() => {
		const key = localStorage.getItem('mudkey');
		if (key) {
			dispatch({ type: 'SET_KEY', payload: key });
			axios({
				method: 'GET',
				url: 'https://lambda-mud-11.herokuapp.com/api/adv/init/',
				headers: {
					Authorization: `Token ${key}`,
				},
			}).then(res => {
				dispatch({ type: 'CHANGE_ROOM', payload: res.data });
			});
			axios({
				method: 'GET',
				url: 'https://lambda-mud-11.herokuapp.com/api/adv/rooms/',
				headers: {
					Authorization: `Token ${key}`,
				},
			}).then(res => {
				dispatch({ type: 'LOAD_MAP', payload: res.data });
			});
		}
		document.forms[0].children[1].children[0].focus();
	}, [dispatch]);
	return (
		<>
			<GlobalStyle />
			<Header />
			<Main />
		</>
	);
}

export default App;
