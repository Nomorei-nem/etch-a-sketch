'use strict';

let gridContainer = document.querySelector('.container');
const gridResolution = document.querySelector('.grid-resolution');
const previousCursorLocation = { x: null };

// rainbow grid coloring function
const rainbowFadeOut = function (gridWidth) {
	const newPixelWidth = 100 / gridWidth;

	for (let i = 0; i < gridPixel.length; i++) {
		gridPixel[i].addEventListener('mouseover', (e) => {
			let one = 1;
			const colorPick = randomColor();
			const colorCheck = getComputedStyle(e.target).getPropertyValue(
				'background-color'
			);
			const alphaCheck = parseFloat(colorCheck.split(',')[3]);

			// Check if alpha is 0 to prevent 2 colors being applied at same time
			if (alphaCheck === 0) {
				// Fade out interval timer
				const alphaCountdown = setInterval(() => {
					one = +(one -= 0.01).toFixed(3);

					e.target.style = `background-color: ${colorPick}, ${one}); flex: 1 0 ${newPixelWidth}%`;
					if (one <= 0) clearInterval(alphaCountdown);
					if (!alphaCheck === 1)
						e.target.style = `background-color: ${colorPick}, ${one}); flex: 1 0 ${newPixelWidth}%`;
				}, 10);
			}
		});
	}
};

// Grid generator function
const gridGenerator = function (gridWidth) {
	const PixelWidth = 100 / gridWidth;
	for (let i = 1; i <= gridWidth * gridWidth; i++) {
		gridContainer.innerHTML += `<div style="flex: 1 0 ${PixelWidth}%" class="grid-pixel pixel-no${i}" data-${i}></div>`;
	}
};

// Random color generator
const randomColor = function () {
	const rgbaValue = () => Math.floor(Math.random() * 256);

	return `rgba(${rgbaValue()}, ${rgbaValue()}, ${rgbaValue()}`;
};

// Creating 4x4 grid
gridGenerator(4);

// Create array of grid pixels from generated grid
let gridPixel = Array.from(document.querySelectorAll('.grid-pixel'));

// Change orientation of custom cursor when cursor moves
gridContainer.addEventListener('mousemove', (e) => {
	const leftOrRight = e.clientX > previousCursorLocation.x ? 'right' : 'left';

	previousCursorLocation.x = e.clientX;

	if (leftOrRight === 'right')
		gridContainer.style = 'cursor: url(/images/nyan-cat-right.cur), default';
	if (leftOrRight === 'left')
		gridContainer.style = 'cursor: url(/images/nyan-cat-left.cur), default';
});

// Calling rainbow grid
rainbowFadeOut(4);

// Function for user to input the drawing grid's width
gridResolution.addEventListener('submit', (e) => {
	const resolution = document.querySelector('.resolution');
	const userResolution = +resolution.value;

	resolution.blur();
	e.preventDefault();

	// Clear previous grid
	gridContainer.innerHTML = '';

	// Custom grid
	gridGenerator(userResolution);

	// Create array of grid pixels from generated grid
	gridPixel = Array.from(document.querySelectorAll('.grid-pixel'));

	// Coloring grid pixels
	rainbowFadeOut(userResolution);
});
