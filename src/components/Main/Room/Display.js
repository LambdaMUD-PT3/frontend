import React, { useEffect, useState, useContext } from 'react';

import { Context } from '../../../context';

const Display = () => {
	const { state } = useContext(Context);
	const { display } = state;
	const [currentDisplay, setCurrentDisplay] = useState('');
	useEffect(() => {
		const displayArray = display.split('\n');
		displayArray.forEach((line, idx, arr) => {
			setTimeout(() => {
				setCurrentDisplay(c => c + line + '\n');
			}, idx * 150);
		});
	}, [display]);
	return <pre>{currentDisplay}</pre>;
};

export default Display;
