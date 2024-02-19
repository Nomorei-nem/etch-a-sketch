'use strict';

let gridContainer = document.querySelector('.container');
const gridResolution = document.querySelector('.resolution');
const previousCursorLocation = { x: null };
const colorInput = document.querySelector('.color-picker');
const rainbowBtn = document.querySelector('.rainbow-btn');
const colorBtn = document.querySelector('.color-btn');
const cleanBtn = document.querySelector('.clean-btn');
let userColorChoice;

// Function for Rainbow Mode
const rainbowMode = function () {
	const resolution = document.querySelector('.resolution');
	const userResolution = +resolution.value;

	// Custom grid
	gridGenerator(userResolution);

	// Create array of grid pixels from generated grid
	gridPixel = Array.from(document.querySelectorAll('.grid-pixel'));

	// Coloring grid pixels
	rainbowFadeOut(userResolution);

	console.log('rainbow box');
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
cursor: url(/images/nyan-cat-right.cur), default;`;
};

const colorInputStyleSettings = gridContainerStyleSettings.bind(colorInput);

colorInput.addEventListener('input', (e) => {
	const h1 = document.querySelector('h1');
	const colorBtn = document.querySelector('.color-btn');

	userColorChoice = e.target.value;

	colorInput.style = `background-color: ${userColorChoice};
		box-shadow: 0 0 30px ${userColorChoice};`;

	colorBtn.style = `color: ${userColorChoice}`;

	gridContainer.style = colorInputStyleSettings();

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

// Callback function for Nyan Cat Song
// const nyanCatSong = function () {
// 	const audio = new Audio(
// 		'https://cf-media.sndcdn.com/jLbSNoCIpol4.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vakxiU05vQ0lwb2w0LjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA3OTk2NTIyfX19XX0_&Signature=TX9e2s7R-LpXW9ZJyqN7kuxE65uRY2SETNiRMU8h5Jy81mjVY5sIC~bnMCPsYClaA~bvousU3bwntFxc9i01HBUjwOGaf1vWUlRmZ~jKnl8I9QqNHbFIySzasKnMBo32oufXrgL1u7l-psLmFfDd4~12yEIPp9mTa-O00e9k26u-U-ZVG9rObQi6wzFbC9YxxnMD7pqqqbGiDkgoA1EpPvh15Ylr~8SHnFZTmMDtN4ZAitvGqs6IeIL~MQ~WDne4d39mqqQDqg1fgwrph-FsbBcc9Ghfx~CHCPVRMIy44H79-89dbTOF527xJK5OX03Osa1uRjDLr3dewwviDNd8jg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ'
// 	);

// 	audio.volume = 0.03;
// 	audio.play();
// };

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
					// if (!alphaCheck === 1) applyColorInGrid(one);
				}, 10);
			}
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

// Song plays when you enter grid
// gridContainer.addEventListener('mouseenter', () => nyanCatSong());
// gridContainer.addEventListener('mouseleave', () => {
// 	nyanCatSong().pause();
// 	nyanCatSong().currentTime = 0;
// });

// Create array of grid pixels from generated grid
let gridPixel = Array.from(document.querySelectorAll('.grid-pixel'));

// Change orientation of custom cursor when cursor moves
gridContainer.addEventListener('mousemove', (e) => {
	const leftOrRight = e.clientX > previousCursorLocation.x ? 'right' : 'left';

	previousCursorLocation.x = e.clientX;

	if (leftOrRight === 'right')
		gridContainer.style = `${gridContainerStyleSettings()}cursor: url(/images/nyan-cat-right.cur), default`;
	if (leftOrRight === 'left')
		gridContainer.style = `${gridContainerStyleSettings()}cursor: url(/images/nyan-cat-left.cur), default`;
});

// Calling rainbow grid
rainbowFadeOut(4);

// Rainbow Mode
rainbowBtn.addEventListener('click', (e) => {
	e.preventDefault();
	colorBtn.classList.remove('btn--active');
	rainbowBtn.classList.add('btn--active');
});

// Color Mode
colorBtn.addEventListener('click', (e) => {
	e.preventDefault();
	colorBtn.classList.add('btn--active');
	rainbowBtn.classList.remove('btn--active');
});

// Clean Slate
cleanBtn.addEventListener('click', (e) => {
	e.preventDefault();
});

// Eventlistener for user to input the drawing grid's width
gridResolution.addEventListener('input', (e) => {
	const resolution = document.querySelector('.resolution');
	const userResolution = +resolution.value;
	console.log(resolution);
	document.querySelector(
		'.resolution-label'
	).innerText = `Grid: ${userResolution} x ${userResolution}`;

	e.preventDefault();

	// Clear previous grid
	gridContainer.innerHTML = '';

	if (rainbowBtn.classList.contains('btn--active')) rainbowMode();

	if (colorBtn.classList.contains('btn--active')) {
		console.log('color mode');
	}
});

// Eventlistener for Rainbow Mode Button
rainbowBtn.addEventListener('click', () => rainbowMode());

// Eventlistner for Color Mode Button
