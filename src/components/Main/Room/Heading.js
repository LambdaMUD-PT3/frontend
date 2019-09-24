import React, { useEffect, useState } from 'react';

const Heading = ({ heading, setHeadingLoaded }) => {
	// const [headingText, setHeadingText] = useState('');

	// useEffect(() => {
	// 	if (heading !== headingText) {
	// 		const headingArray = heading.split('');
	// 		async function asyncForEach(array, callback) {
	// 			for (let index = 0; index < array.length; index++) {
	// 				await callback(array[index], index, array);
	// 			}
	// 		}
	// 		const waitFor = ms => new Promise(r => setTimeout(r, ms));
	// 		const start = async () => {
	// 			await asyncForEach(headingArray, async char => {
	// 				await waitFor(100);
	// 				setHeadingText(c => c + char);
	// 			});
	// 		};
	// 		start().then(() => {
	// 			setHeadingLoaded(true);
	// 		});
	// 	}
	// }, [heading, setHeadingLoaded]);
	return <h2>{heading}</h2>;
};

export default Heading;
