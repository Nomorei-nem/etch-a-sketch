'use strict';

let gridContainer = document.querySelector('.container');
const gridResolution = document.querySelector('.grid-resolution');

const randomColor = function () {
	const rgbValue = () => Math.floor(Math.random() * 256);

	return `rgb(${rgbValue()} ${rgbValue()} ${rgbValue()})`;
};

for (let i = 1; i <= 16; i++) {
	gridContainer.innerHTML += `<div style="flex: 1 0 25%" class="grid-pixel pixel-no${i}" data-${i}></div>`;
}

let gridPixel = Array.from(document.querySelectorAll('.grid-pixel'));

for (let i = 0; i < gridPixel.length; i++) {
	gridPixel[i].addEventListener('mouseover', (e) => {
		e.target.style = `background-color: ${randomColor()}; flex: 1 0 25%`;

		setTimeout(
			() => (e.target.style = 'background-color: none; flex: 1 0 25%'),
			700
		);
	});
}

gridResolution.addEventListener('submit', (e) => {
	const resolution = document.querySelector('.resolution');
	const userResolution = +resolution.value;
	const newPixelWidth = 100 / userResolution;

	resolution.blur();
	e.preventDefault();

	gridContainer.innerHTML = '';

	for (let i = 1; i <= userResolution * userResolution; i++) {
		gridContainer.innerHTML += `<div style="flex: 1 0 ${newPixelWidth}%" class="grid-pixel pixel-no${i}" data-${i}></div>`;
	}

	gridPixel = Array.from(document.querySelectorAll('.grid-pixel'));

	for (let i = 0; i < gridPixel.length; i++) {
		gridPixel[i].addEventListener('mouseover', (e) => {
			e.target.style = `background-color: ${randomColor()}; flex: 1 0 ${newPixelWidth}%`;

			console.log(e.target.style);
			setTimeout(
				() =>
					(e.target.style = `background-color: none; flex: 1 0 ${newPixelWidth}%`),
				700
			);
		});
	}
});
