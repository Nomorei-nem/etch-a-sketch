'use strict';

const gridContainer = document.querySelector('.container');
const gridContainerBorder = document.querySelector('.container-border');
const gridResolution = document.querySelector('.resolution');
const colorInput = document.querySelector('.color-picker');
let userColorChoice = colorInput.value;

const rainbowBtn = document.querySelector('.rainbow-btn');
const colorBtn = document.querySelector('.color-btn');
const darkenBtn = document.querySelector('.darken-btn');
const cleanBtn = document.querySelector('.clean-btn');

const previousCursorLocation = { x: null };

let gridWidth = +gridResolution.value;

// Generate Grid
const gridGenerator = function (gridWidth) {
	gridContainer.style = `grid-template-columns: repeat(${gridWidth}, 1fr); grid-template-rows: repeat(${gridWidth}, 1fr);`;

	for (let i = 1; i <= gridWidth * gridWidth; i++) {
		const containerDiv = document.createElement('div');
		containerDiv.classList.add('cell');

		gridContainer.appendChild(containerDiv);
	}
};

gridGenerator(gridWidth);

// Function for grid container's border
const gridContainerBorderSettings = function () {
	return `border-radius: 10px;
	border: 5px solid #ffffff;
	box-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px ${userColorChoice};
	margin: auto;
	cursor: url(/images/nyan-cat-right.png), default;`;
};

// Event listener on color input
colorInput.addEventListener('input', (e) => {
	const h1 = document.getElementsByTagName('h1');

	userColorChoice = e.target.value;

	// Change h1 style
	h1[0].style = `font-family: 'Big Shoulders Inline Display', sans-serif;
	font-size: 100px;
	text-transform: uppercase;
	margin-bottom: 50px;
	text-align: center;
	color: #fff;
	text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px ${userColorChoice},
		0 0 82px cyan, 0 0 92px ${userColorChoice}, 0 0 102px ${userColorChoice}, 0 0 151px ${userColorChoice};`;

	// Change color input's style
	colorInput.style = `background-color: ${userColorChoice};
	box-shadow: 0 0 30px ${userColorChoice};`;

	// Change color mode button's style
	colorBtn.style = `color: ${userColorChoice};`;

	// Change grid container border style
	gridContainerBorder.style = gridContainerBorderSettings();

	return userColorChoice;
});

// Cursor switch direction in grid container
gridContainerBorder.addEventListener('mousemove', (e) => {
	const leftOrRight = e.clientX > previousCursorLocation.x ? 'right' : 'left';

	previousCursorLocation.x = e.clientX;

	if (leftOrRight === 'right')
		gridContainerBorder.style = `${gridContainerBorderSettings()}cursor: url(/images/nyan-cat-right.png), default`;
	if (leftOrRight === 'left')
		gridContainerBorder.style = `${gridContainerBorderSettings()}cursor: url(/images/nyan-cat-left.png), default`;
});

// Update UI grid dimensions label
gridResolution.addEventListener('input', () => {
	gridContainer.innerHTML = '';
	gridWidth = +gridResolution.value;
	document.querySelector(
		'.resolution-label'
	).innerText = `Grid: ${gridWidth} x ${gridWidth}`;
});

// Set number of grid cells
gridResolution.addEventListener('change', () => {
	gridWidth = +gridResolution.value;
	gridGenerator(gridWidth);
});

// Rainbow, Color or Darken Mode
gridContainer.addEventListener('mouseover', (e) => {
	// Rainbow Mode
	if (rainbowBtn.classList.contains('btn--active')) {
		if (e.target.classList.contains('cell')) {
			// Random color generator
			const randomColor = function () {
				const rgbaValue = () => Math.floor(Math.random() * 256);

				return `rgba(${rgbaValue()}, ${rgbaValue()}, ${rgbaValue()}`;
			};

			{
				let one = 1;
				const colorPick = randomColor();
				const colorCheck = getComputedStyle(e.target).getPropertyValue(
					'background-color'
				);
				const alphaCheck = parseFloat(colorCheck.split(',')[3]);
				const applyColorInGrid = function (alpha) {
					e.target.style = `background-color: ${colorPick}, ${alpha}); box-shadow: 0 0 42px ${colorPick}, ${alpha}),
					0 0 82px ${colorPick}, ${alpha}), 0 0 92px ${colorPick}, ${alpha}), 0 0 102px ${colorPick}, ${alpha}), 0 0 151px ${colorPick}, ${alpha}); border-radius: 50%;`;
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
			}
		}
	}

	// Color Mode
	if (colorBtn.classList.contains('btn--active')) {
		if (e.target.classList.contains('cell'))
			e.target.style = `border-radius: 50%; background-color: ${userColorChoice}; box-shadow: 0 0 82px ${userColorChoice}, 0 0 92px ${userColorChoice};`;
	}

	// Darken Mode
	if (darkenBtn.classList.contains('btn--active')) {
		if (e.target.classList.contains('cell')) {
			const targetOpacity = +getComputedStyle(e.target).getPropertyValue(
				'opacity'
			);

			e.target.style = `border-radius: 50%; background-color: ${userColorChoice}; box-shadow: 0 0 7px ${userColorChoice}; opacity: ${
				targetOpacity === 1 ? 0.1 : targetOpacity + 0.1
			}`;
		}
	}
});

// Grid - Mode option Buttons
rainbowBtn.addEventListener('click', (e) => {
	e.preventDefault();

	rainbowBtn.classList.add('btn--active');
	colorBtn.classList.remove('btn--active');
	darkenBtn.classList.remove('btn--active');
});

colorBtn.addEventListener('click', (e) => {
	e.preventDefault();

	rainbowBtn.classList.remove('btn--active');
	colorBtn.classList.add('btn--active');
	darkenBtn.classList.remove('btn--active');
});

darkenBtn.addEventListener('click', (e) => {
	e.preventDefault();

	rainbowBtn.classList.remove('btn--active');
	colorBtn.classList.remove('btn--active');
	darkenBtn.classList.add('btn--active');
});

cleanBtn.addEventListener('click', () => {
	gridContainer.innerHTML = '';
	gridGenerator(gridWidth);
});
