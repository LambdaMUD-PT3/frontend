import React from 'react';
import styled from 'styled-components';

import Console from './Console';
import Chat from './Chat';
import Commands from './Commands';

const Main = () => {
	return (
		<Container>
			<Console />
			<div>
				<Chat />
				<Commands />
			</div>
		</Container>
	);
};

export default Main;

const Container = styled.main`
	display: flex;
	justify-content: space-between;
`;
