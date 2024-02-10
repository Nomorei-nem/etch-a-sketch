'use strict';

const gridContainer = document.querySelector('.container');

const randomColor = function () {
	const rgbValue = () => Math.floor(Math.random() * 256);

	return `rgb(${rgbValue()} ${rgbValue()} ${rgbValue()})`;
};

for (let i = 1; i <= 16; i++) {
	gridContainer.innerHTML += `<div class="grid-pixel pixel-no${i}" data-${i}></div>`;
}

const gridPixel = Array.from(document.querySelectorAll('.grid-pixel'));

for (let i = 0; i < gridPixel.length; i++) {
	gridPixel[i].addEventListener('mouseover', (e) => {
		e.target.style = `background-color: ${randomColor()}`;

		setTimeout(() => (e.target.style = 'background-color: none'), 700);
	});
}

console.log(randomColor());
