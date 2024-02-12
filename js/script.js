'use strict';

let gridContainer = document.querySelector('.container');
const gridResolution = document.querySelector('.grid-resolution');

// Random color generator
const randomColor = function () {
	const rgbaValue = () => Math.floor(Math.random() * 256);
	let one = 1;
	setInterval(() => (one -= 0.01).toFixed(3), 20);

	console.log(`rgba(${rgbaValue()}, ${rgbaValue()}, ${rgbaValue()}, ${one})`);

	return `rgba(${rgbaValue()}, ${rgbaValue()}, ${rgbaValue()}, ${one})`;
};

// const alphaCountdown = function () {
// 	let one = 1;
// 	if (one === 0.0) {
// 		clearInterval(alphaCountdown);
// 	}
// 	setInterval(() => console.log((one -= 0.01).toFixed(3)), 20);
// };

// alphaCountdown();

let one = 1;

const alphaCountdown = setInterval(() => {
	+(one -= 0.01).toFixed(2);

	if (one <= 0) clearInterval(alphaCountdown);
}, 20);

// Creating 4x4 grid
for (let i = 1; i <= 16; i++) {
	gridContainer.innerHTML += `<div style="flex: 1 0 25%" class="grid-pixel pixel-no${i}" data-${i}></div>`;
}

// Mouseover event listener to draw with random colors
let gridPixel = Array.from(document.querySelectorAll('.grid-pixel'));

for (let i = 0; i < gridPixel.length; i++) {
	gridPixel[i].addEventListener('mouseover', (e) => {
		e.target.style = `background-color: ${randomColor()}; flex: 1 0 25%`;

		setTimeout(
			() =>
				(e.target.style = `background-color: ${randomColor()}; flex: 1 0 25%`),
			100
		);
	});
}

// Function for user to input the drawing grid's width
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

			setTimeout(
				() =>
					(e.target.style = `background-color: none; flex: 1 0 ${newPixelWidth}%`),
				700
			);
		});
	}
});
