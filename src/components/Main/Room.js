import React from 'react';
import styled from 'styled-components';

import Display from './Display';

const Room = () => {
	return (
		<RoomStyle>
			<h2>Welcome to</h2>
			<Display />
			<p>Please enter your name.</p>
		</RoomStyle>
	);
};

export default Room;

const RoomStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	h2 {
		font-size: 2.5rem;
		margin-top: 30px;
	}

	pre {
		width: 50%;
	}

	p {
		margin-top: 30px;
		font-size: 1.4rem;
	}
`;
