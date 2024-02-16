'use strict';

let gridContainer = document.querySelector('.container');
const gridResolution = document.querySelector('.resolution');
const previousCursorLocation = { x: null };

// Callback function for Nyan Cat Song
const nyanCatSong = function () {
	const audio = new Audio(
		'https://cf-media.sndcdn.com/jLbSNoCIpol4.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vakxiU05vQ0lwb2w0LjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA3OTk2NTIyfX19XX0_&Signature=TX9e2s7R-LpXW9ZJyqN7kuxE65uRY2SETNiRMU8h5Jy81mjVY5sIC~bnMCPsYClaA~bvousU3bwntFxc9i01HBUjwOGaf1vWUlRmZ~jKnl8I9QqNHbFIySzasKnMBo32oufXrgL1u7l-psLmFfDd4~12yEIPp9mTa-O00e9k26u-U-ZVG9rObQi6wzFbC9YxxnMD7pqqqbGiDkgoA1EpPvh15Ylr~8SHnFZTmMDtN4ZAitvGqs6IeIL~MQ~WDne4d39mqqQDqg1fgwrph-FsbBcc9Ghfx~CHCPVRMIy44H79-89dbTOF527xJK5OX03Osa1uRjDLr3dewwviDNd8jg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ'
	);

	audio.volume = 0.03;
	audio.play();
};

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

					e.target.style = `border-radius: 50%; background-color: ${colorPick}, ${one}); flex: 1 0 ${newPixelWidth}%`;
					if (one <= 0) clearInterval(alphaCountdown);
					if (!alphaCheck === 1)
						e.target.style = `border-radius: 50%; background-color: ${colorPick}, ${one}); flex: 1 0 ${newPixelWidth}%`;
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
		gridContainer.style = 'cursor: url(/images/nyan-cat-right.cur), default';
	if (leftOrRight === 'left')
		gridContainer.style = 'cursor: url(/images/nyan-cat-left.cur), default';
});

// Calling rainbow grid
rainbowFadeOut(4);

// Function for user to input the drawing grid's width
gridResolution.addEventListener('change', (e) => {
	const resolution = document.querySelector('.resolution');
	const userResolution = +resolution.value;
	console.log(resolution);
	document.querySelector(
		'.resolution-label'
	).innerText = `Grid: ${userResolution} x ${userResolution}`;

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
