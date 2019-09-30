import React, { useEffect, useState, useContext } from 'react';

import { Context } from '../../../context';

const Display = () => {
	const { state } = useContext(Context);
	const { display } = state;
	const [currentDisplay, setCurrentDisplay] = useState('');
	useEffect(() => {
		console.log(display);
		setCurrentDisplay(display);
		// const displayArray = display.split('\n');
		// displayArray.forEach((line, idx) => {
		// 	setTimeout(() => {
		// 		setCurrentDisplay(c => c + line + '\n');
		// 	}, idx * 150);
		// });
	}, [display]);
	return <pre>{currentDisplay}</pre>;
};

export default Display;
