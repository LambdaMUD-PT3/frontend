import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { Context } from '../../context';

const Input = () => {
	const { dispatch } = useContext(Context);
	const [input, setInput] = useState('');
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

	const handleSubmit = e => {
		e.preventDefault();
		const value = document.forms[0][0].value;
		if (!value) {
			dispatch({ type: 'NO_INPUT' });
			return;
		}
		const split = value.split(' ');

		switch (split[0].toLowerCase()) {
			case 'login':
				if (!split[1]) {
					dispatch({
						type: 'INCOMPLETE_COMMAND',
						payload: 'Please enter your username and password',
					});
				} else if (split[1] && !split[2]) {
					dispatch({
						type: 'INCOMPLETE_COMMAND',
						payload: 'Please enter your password',
					});
				} else {
					setInput('');
				}
				return;
			default:
				dispatch({ type: 'INVALID_COMMAND' });
				setInput('');
				return;
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<span>></span>
			<div onClick={() => inputField.current.focus()}>
				<input
					type='text'
					value={input}
					onChange={e => setInput(e.target.value)}
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
