import React from 'react';
import styled from 'styled-components';

import Console from './Console';
import Map from './Map';
import Commands from './Commands';

const Main = () => {
	return (
		<Container>
			<Console />
			<div>
				<Map />
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
