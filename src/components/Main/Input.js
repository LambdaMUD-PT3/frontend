import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Input = () => {
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

	return (
		<Form>
			<span>></span>
			<div>
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
