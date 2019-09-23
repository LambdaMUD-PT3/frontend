import React from 'react';
import styled from 'styled-components';

import Room from './Room';
import Input from './Input';

const Console = () => {
	return (
		<Container>
			<Room />
			<Input />
		</Container>
	);
};

export default Console;

const Container = styled.section`
	background: #000;
	color: #fff;
	width: 75%;
	height: 500px;
	border-top: 3px solid #fff;
	border-bottom: 3px solid #fff;
	position: relative;

	&:before {
		content: '';
		position: absolute;
		background: #fff;
		height: 100%;
		width: 3px;
		left: -3px;
	}

	&:after {
		content: '';
		position: absolute;
		background: #fff;
		height: 100%;
		width: 3px;
		right: -3px;
		top: 0;
	}

	pre {
		user-select: none;
	}

	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
