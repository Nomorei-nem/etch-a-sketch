'use strict';

let gridContainer = document.querySelector('.container');
const gridResolution = document.querySelector('.grid-resolution');

// Random color generator
const randomColor = function () {
	const rgbaValue = () => Math.floor(Math.random() * 256);

	return `rgba(${rgbaValue()}, ${rgbaValue()}, ${rgbaValue()}`;
};

// Creating 4x4 grid
for (let i = 1; i <= 16; i++) {
	gridContainer.innerHTML += `<div style="flex: 1 0 25%" class="grid-pixel pixel-no${i}" data-${i}></div>`;
}

// Mouseover event listener to draw with random colors
let gridPixel = Array.from(document.querySelectorAll('.grid-pixel'));

for (let i = 0; i < gridPixel.length; i++) {
	gridPixel[i].addEventListener('mouseover', (e) => {
		let one = 1;
		const colorPick = randomColor();
		e.target.style = `background-color: ${colorPick}, ${one}); flex: 1 0 25%`;

		const alphaCountdown = setInterval(() => {
			one = +(one -= 0.01).toFixed(2);

			e.target.style = `background-color: ${colorPick}, ${one}); flex: 1 0 25%`;
			if (one <= 0) clearInterval(alphaCountdown);
		}, 20);
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
