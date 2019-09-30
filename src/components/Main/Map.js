import React, { useRef, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { Context } from '../../context';

const Map = () => {
	const canvas = useRef(null);
	const { state } = useContext(Context);
	useEffect(() => {
		const { map, exits } = state;
		const ctx = canvas.current.getContext('2d');
		if (map) {
			ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
			const high = Object.keys(map).reduce((acc, cur) => {
				if (map[cur].x > acc || map[cur].y > acc) {
					acc = Math.max(map[cur].x, map[cur].y);
				}
				return acc;
			}, 0);
			const drawRooms = (exits, x, y, direction) => {
				if (direction) {
					delete exits[direction];
				}

				if (exits.n) {
					ctx.fillRect(x + 2.5, y - lineLength, 0.5, lineLength);
					ctx.fillRect(x, y - lineLength - 5, 5, 5);
				}
				if (exits.e) {
					ctx.fillRect(x + 5, y + 2.5, lineLength, 0.5);
					ctx.fillRect(x + lineLength + 5, y, 5, 5);
				}
				if (exits.w) {
					ctx.fillRect(x - lineLength, y + 2.5, lineLength, 0.5);
					ctx.fillRect(x - lineLength - 5, y, 5, 5);
				}
				if (exits.s) {
					ctx.fillRect(x + 2.5, y + lineLength - 12, 0.5, lineLength);
					ctx.fillRect(x, y + lineLength + 5, 5, 5);
				}
			};
			const lineLength = canvas.current.width / high;
			const x = canvas.current.width / 2;
			const y = canvas.current.height / 2;
			ctx.fillStyle = 'red';
			ctx.fillRect(x, y, 5, 5);
			ctx.fillStyle = '#fff';
			if (exits && exits.n) {
				ctx.fillRect(x + 2.5, y - lineLength, 0.5, lineLength);
				ctx.fillRect(x, y - lineLength - 5, 5, 5);
				drawRooms(map[exits.n].exits, x, y - lineLength - 5, 's');
			}
			if (exits && exits.e) {
				ctx.fillRect(x + 5, y + 2.5, lineLength, 0.5);
				ctx.fillRect(x + lineLength + 5, y, 5, 5);
				drawRooms(map[exits.e].exits, x + lineLength + 5, y, 'w');
			}
			if (exits && exits.w) {
				ctx.fillRect(x - lineLength, y + 2.5, lineLength, 0.5);
				ctx.fillRect(x - lineLength - 5, y, 5, 5);
				drawRooms(map[exits.w].exits, x - lineLength - 5, y, 'e');
			}
			if (exits && exits.s) {
				ctx.fillRect(x + 2.5, y + lineLength - 12, 0.5, lineLength);
				ctx.fillRect(x, y + lineLength + 5, 5, 5);
				drawRooms(map[exits.s].exits, x, y + lineLength + 5, 'n');
			}
		} else {
			ctx.font = '1.8rem monospace';
			ctx.fillStyle = '#fff';
			ctx.textAlign = 'center';
			ctx.fillText(`Please sign in`, 110, 100);
			ctx.fillText(`to view map`, 110, 120);
		}
	}, [state]);
	return (
		<MapContainer>
			<h2>Map</h2>
			<canvas ref={canvas} width='200' height='250' />
		</MapContainer>
	);
};

export default Map;

const MapContainer = styled.div`
	background: #000;
	width: 225px;
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

	h2 {
		color: #fff;
		font-size: 2rem;
	}
`;
