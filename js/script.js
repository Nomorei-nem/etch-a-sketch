'use strict';

const gridContainer = document.querySelector('.container');

for (let i = 1; i <= 16; i++) {
	gridContainer.innerHTML += `<div class="flex-item" data-${i}>${i}</div>`;
}
