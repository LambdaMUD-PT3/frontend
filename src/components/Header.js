import React from 'react';
import styled from 'styled-components';

const Header = () => {
	return (
		<Container>
			<h1>Lambda MUD Room</h1>
		</Container>
	);
};

export default Header;

const Container = styled.header`
	background: #000;
	color: #fff;
	width: 30%;
	height: 60px;
	margin: 20px 0;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 3rem;
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
	}
`;
