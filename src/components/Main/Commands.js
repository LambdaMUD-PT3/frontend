import React, { useContext } from 'react';
import styled from 'styled-components';

import { Context } from '../../context';

const Commands = () => {
	const { state } = useContext(Context);
	const { commands } = state;
	return (
		<CommandsContainer>
			<h2>Commands</h2>
			<table>
				<tbody>
					{commands.map((comm, idx) => {
						const { command, example } = comm;
						return (
							<tr key={idx}>
								<td>{command}</td>
								<td>{example}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</CommandsContainer>
	);
};

export default Commands;

const CommandsContainer = styled.div`
	background: #000;
	width: 225px;
	border-top: 3px solid #fff;
	border-bottom: 3px solid #fff;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
	height: 193px;
	color: #fff;

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

	h2 {
		font-size: 2rem;
		margin-top: 10px;
	}

	table {
		margin-top: 10px;
	}
`;
