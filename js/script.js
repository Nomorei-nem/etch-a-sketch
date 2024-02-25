'use strict';

let gridContainer = document.querySelector('.container');
const gridResolution = document.querySelector('.resolution');
const previousCursorLocation = { x: null };
const colorInput = document.querySelector('.color-picker');
const rainbowBtn = document.querySelector('.rainbow-btn');
const colorBtn = document.querySelector('.color-btn');
const cleanBtn = document.querySelector('.clean-btn');
const darkenBtn = document.querySelector('.darken-btn');
let userColorChoice;

let resolution = document.querySelector('.resolution');
let userResolution = +resolution.value;

// Function for Rainbow Mode
const rainbowMode = function () {
	// Clear previous grid
	gridContainer.innerHTML = '';

	// Custom grid
	gridGenerator(userResolution);

	// Create array of grid pixels from generated grid
	gridPixel = Array.from(document.querySelectorAll('.grid-pixel'));

	// Coloring grid pixels
	rainbowFadeOut(userResolution);
};

// Function for Color Mode
const colorMode = function () {
	// Clear previous grid
	gridContainer.innerHTML = '';

	// Custom grid
	gridGenerator(userResolution);

	// Create array of grid pixels from generated grid
	gridPixel = Array.from(document.querySelectorAll('.grid-pixel'));

	// Color mode gridPixels
	normalColor(userResolution);
};

// Function for Darken Mode
const darkenMode = function () {
	gridContainer.innerHTML = '';

	// Custom grid
	gridGenerator(userResolution);

	// Create array of grid pixels from generated grid
	gridPixel = Array.from(document.querySelectorAll('.grid-pixel'));

	// Darken mode gridPixels
	darkenColor(userResolution);
};

// Function to style Grid Container
const gridContainerStyleSettings = function () {
	return `text-align: center;
display: flex;
align-items: center;
justify-content: space-between;
flex-wrap: wrap;
width: 40%;
height: 40%;
border-radius: 10px;
border: 5px solid #ffffff;
box-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px ${userColorChoice};
margin: auto;
cursor: url(/images/nyan-cat-right.png), default;`;
};

// Bind 'this' keyword so colorInput eventlistener can use gridContainerStyleSettings() function
const colorInputStyleSettings = gridContainerStyleSettings.bind(colorInput);

// Event listener on color input
colorInput.addEventListener('input', (e) => {
	const h1 = document.querySelector('h1');
	const colorBtn = document.querySelector('.color-btn');

	userColorChoice = e.target.value;

	// Changes color/shadow properties of color input
	colorInput.style = `background-color: ${userColorChoice};
		box-shadow: 0 0 30px ${userColorChoice};`;

	colorBtn.style = `color: ${userColorChoice}`;

	// Changes color/shadow properties of Grid container's border
	gridContainer.style = colorInputStyleSettings();

	// Changes color properties of h1 header
	h1.style = `font-family: 'Big Shoulders Inline Display', sans-serif;
	font-size: 100px;
	text-transform: uppercase;
	margin-bottom: 50px;
	text-align: center;
	color: ${userColorChoice};
	text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px ${userColorChoice},
		0 0 82px ${userColorChoice}, 0 0 92px ${userColorChoice}, 0 0 102px ${userColorChoice}, 0 0 151px ${userColorChoice};`;

	return userColorChoice;
});

// Rainbow Mode grid coloring function
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
			const applyColorInGrid = function (alpha) {
				e.target.style = `flex: 1 0 ${newPixelWidth}%; border-radius: 50%; background-color: ${colorPick}, ${alpha}); box-shadow: 0 0 42px ${colorPick}, ${alpha}),
				0 0 82px ${colorPick}, ${alpha}), 0 0 92px ${colorPick}, ${alpha}), 0 0 102px ${colorPick}, ${alpha}), 0 0 151px ${colorPick}, ${alpha});`;
			};

			// Check if alpha is 0 to prevent 2 colors being applied at same time
			if (alphaCheck === 0) {
				// Fade out interval timer
				const alphaCountdown = setInterval(() => {
					one = +(one -= 0.01).toFixed(3);

					applyColorInGrid(one);
					if (one <= 0) clearInterval(alphaCountdown);
				}, 10);
			}
		});
	}
};

// Color Mode grid coloring function
const normalColor = function (gridWidth) {
	const newPixelWidth = 100 / gridWidth;

	for (let i = 0; i < gridPixel.length; i++) {
		gridPixel[i].addEventListener('mouseover', (e) => {
			const colorPick = colorInput.value;
			const applyColorInGrid = function () {
				e.target.style = `flex: 1 0 ${newPixelWidth}%; border-radius: 50%; background-color: ${colorPick}; box-shadow: 0 0 42px ${colorPick},
				0 0 82px ${colorPick}, 0 0 92px ${colorPick}, 0 0 102px ${colorPick}, 0 0 151px ${colorPick};`;
			};

			applyColorInGrid();
		});
	}
};

// Darken Mode grid coloring function
const darkenColor = function (gridWidth) {
	const newPixelWidth = 100 / gridWidth;

	for (let i = 0; i < gridPixel.length; i++) {
		let pixelOpacity = 0;

		gridPixel[i].addEventListener('mouseover', (e) => {
			const colorPick = colorInput.value;
			pixelOpacity += 0.1;

			const applyColorInGrid = function () {
				e.target.style = `flex: 1 0 ${newPixelWidth}%; border-radius: 50%; background-color: ${colorPick}; box-shadow: 0 0 7px ${colorPick};opacity: ${pixelOpacity}`;
			};

			applyColorInGrid();
		});
	}
};

// Grid generator function
const gridGenerator = function (gridWidth) {
	const PixelWidth = 100 / gridWidth;
	for (let i = 1; i <= gridWidth * gridWidth; i++) {
		gridContainer.innerHTML += `<div style="flex: 1 0 ${PixelWidth}%; " class="grid-pixel pixel-no${i}" data-${i}></div>`;
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
		gridContainer.style = `${gridContainerStyleSettings()}cursor: url(./images/nyan-cat-right.png), default`;
	if (leftOrRight === 'left')
		gridContainer.style = `${gridContainerStyleSettings()}cursor: url(./images/nyan-cat-left.png), default`;
});

// Calling rainbow grid
rainbowFadeOut(4);

// Eventlistener for user to input the drawing grid's width
gridResolution.addEventListener('input', (e) => {
	resolution = document.querySelector('.resolution');
	userResolution = +resolution.value;

	document.querySelector(
		'.resolution-label'
	).innerText = `Grid: ${userResolution} x ${userResolution}`;
	e.preventDefault();

	// Rainbow mode if active
	if (rainbowBtn.classList.contains('btn--active')) rainbowMode();

	// Color mode if active
	if (colorBtn.classList.contains('btn--active')) colorMode();

	// Darken mode if active
	if (darkenBtn.classList.contains('btn--active')) darkenMode();
});

// Eventlistener for Rainbow Mode Button
rainbowBtn.addEventListener('click', (e) => {
	e.preventDefault();

	colorBtn.classList.remove('btn--active');
	darkenBtn.classList.remove('btn--active');
	rainbowBtn.classList.add('btn--active');

	rainbowMode();
});

// Eventlistener for Color Mode Button
colorBtn.addEventListener('click', (e) => {
	e.preventDefault();

	rainbowBtn.classList.remove('btn--active');
	darkenBtn.classList.remove('btn--active');
	colorBtn.classList.add('btn--active');

	colorMode();
});

// Eventlistener for Darken Mode Button
darkenBtn.addEventListener('click', (e) => {
	e.preventDefault();

	colorBtn.classList.remove('btn--active');
	rainbowBtn.classList.remove('btn--active');
	darkenBtn.classList.add('btn--active');

	darkenMode();
});

// Eventlistener for Clean Slate button
cleanBtn.addEventListener('click', (e) => {
	e.preventDefault();
	gridContainer.innerHTML = '';

	// Rainbow mode if active
	if (rainbowBtn.classList.contains('btn--active')) rainbowMode();

	// Color mode if active
	if (colorBtn.classList.contains('btn--active')) colorMode();

	// Darken mode if active
	if (darkenBtn.classList.contains('btn--active')) darkenMode();
});
