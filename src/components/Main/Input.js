import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Context } from '../../context';

const Input = () => {
	const { state, dispatch } = useContext(Context);
	const [input, setInput] = useState('');
	const [password, setPassword] = useState('');
	const inputField = useRef(null);

	useEffect(() => {
		const tempEl = document.createElement('pre');
		tempEl.style.fontSize = '1.8rem';
		tempEl.style.display = 'inline';
		tempEl.style.fontFamily = 'Arial';
		tempEl.innerHTML = input;
		document.body.appendChild(tempEl);
		inputField.current.style.width = `${tempEl.offsetWidth + 10}px`;
		tempEl.parentNode.removeChild(tempEl);
	}, [input]);

	const handleChange = e => {
		const split = e.target.value.split(' ');
		if ((split[0] === 'login' || split[0] === 'register') && split[2]) {
			if (e.nativeEvent.inputType === 'deleteContentBackward') {
				setPassword(password.slice(0, password.length - 1));
			} else {
				setPassword(password + split[2][split[2].length - 1]);
			}
			const pass = '*'.repeat(password.length);
			e.target.value = `${split[0]} ${split[1]} ${pass}`;
			setInput(e.target.value);
			console.log(password);
		}
		setInput(e.target.value);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const value = document.forms[0][0].value;
		if (!value) {
			dispatch({ type: 'NO_INPUT' });
			return;
		}
		const split = value.split(' ');

		try {
			switch (split[0].toLowerCase()) {
				case 'login':
					if (!split[1]) {
						dispatch({
							type: 'INCOMPLETE_COMMAND',
							payload: 'Please enter your username and password',
						});
					} else if (split[1] && !password) {
						dispatch({
							type: 'INCOMPLETE_COMMAND',
							payload: 'Please enter your password',
						});
					} else {
						const res = await axios({
							method: 'POST',
							url: 'https://lambda-mud-11.herokuapp.com/api/login/',
							headers: { 'Content-Type': 'application/json' },
							data: {
								username: split[1],
								password: password,
							},
						});
						const { key } = res.data;
						localStorage.setItem('mudkey', key);
						dispatch({ type: 'SET_KEY', payload: key });
						const initRes = await axios({
							url: 'https://lambda-mud-11.herokuapp.com/api/adv/init/',
							headers: {
								Authorization: `Token ${key}`,
							},
						});
						localStorage.setItem('mudroom', JSON.stringify(initRes.data));
						dispatch({ type: 'CHANGE_ROOM', payload: initRes.data });
						setInput('');
					}
					return;
				case 'register':
					if (!split[1]) {
						dispatch({
							type: 'INCOMPLETE_COMMAND',
							payload: 'Please enter your username and password',
						});
					} else if (split[1] && !password) {
						dispatch({
							type: 'INCOMPLETE_COMMAND',
							payload: 'Please enter your password',
						});
					} else {
						const res = await axios({
							method: 'POST',
							url: 'https://lambda-mud-11.herokuapp.com/api/registration/',
							data: {
								username: split[1],
								email: 'no@email.com',
								password1: password,
								password2: password,
							},
						});
						const { key } = res.data;
						localStorage.setItem('mudkey', key);
						dispatch({ type: 'SET_KEY', payload: key });
						const initRes = await axios({
							method: 'GET',
							url: 'https://lambda-mud-11.herokuapp.com/adventure/init',

							headers: {
								Authorization: `Token ${key}`,
							},
						});
						dispatch({ type: 'CHANGE_ROOM', payload: initRes.data });
						setInput('');
					}
					return;
				case 'move':
					if (
						!['north', 'west', 'east', 'south'].includes(split[1].toLowerCase())
					) {
						dispatch({
							type: 'INCOMPLETE_COMMAND',
							payload: 'Please enter a direction to move.',
						});
					} else {
						const res = await axios({
							method: 'POST',
							url: 'https://lambda-mud-11.herokuapp.com/api/adv/move/',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Token ${state.key}`,
							},
							data: {
								direction: split[1][0],
							},
						});
						if (res.data.error_msg) {
							const current = state.text;
							dispatch({
								type: 'INCOMPLETE_COMMAND',
								payload: res.data.error_msg,
							});
							setTimeout(() => {
								dispatch({
									type: 'INCOMPLETE_COMMAND',
									payload: current,
								});
							}, 1000);
							setInput('');
							return;
						}
						dispatch({ type: 'CHANGE_ROOM', payload: res.data });
						setInput('');
					}
					return;
				default:
					dispatch({ type: 'INVALID_COMMAND' });
					setInput('');
					return;
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<span>></span>
			<div onClick={() => inputField.current.focus()}>
				<input
					type='text'
					value={input}
					onChange={e => handleChange(e)}
					ref={inputField}
				/>
				<Caret onClick={() => inputField.current.focus()}>▍</Caret>
			</div>
			<button type='submit'>send</button>
		</Form>
	);
};

export default Input;

const Form = styled.form`
	padding: 5px;
	display: flex;
	justify-content: space-between;

	span {
		font-size: 1.8rem;
	}
	div {
		width: 100%;
		display: flex;
		align-content: center;
		cursor: text;

		input {
			padding-left: 5px;
			border: none;
			background: #000;
			color: #fff;
			font-size: 1.8rem;
			caret-color: transparent;
		}
	}

	button {
		border: none;
		background: #000;
		color: #fff;
		font-size: 1.8rem;
	}
`;

const Caret = styled.span`
	font-sight: 2rem;
	animation: blink 1s infinite;

	@keyframes blink {
		0% {
			opacity: 0;
		}
		49% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
	}
`;
