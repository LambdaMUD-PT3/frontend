import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { Context } from '../../../context';

import Display from './Display';
import Heading from './Heading';

import { displays } from './displays';

const Room = () => {
	const [headingLoaded, setHeadingLoaded] = useState(false);
	const { state } = useContext(Context);
	const { display, heading, text } = state;

	return (
		<RoomStyle display={display}>
			<Heading heading={heading} setHeadingLoaded={setHeadingLoaded} />
			<Display display={display} headingLoaded={headingLoaded} />
			<p>{text}</p>
		</RoomStyle>
	);
};

export default Room;

const RoomStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	height: 100%;

	h2 {
		font-size: 2.5rem;
		margin-top: 30px;
	}

	pre {
		width: 50%;
		height: 300px;
		font-size: ${({ display }) =>
			display === displays.defaultDisplay ? '1rem' : '1.3rem'};
	}

	p {
		font-size: 1.4rem;
		margin-bottom: 20px;
		padding: 10px;
		text-align: center;
	}
`;
