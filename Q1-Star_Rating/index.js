import { createElement, createElements } from "./helper.js";

const starCount = 5;
const smileys = ['😢', '😞', '😐', '😀', '😎'];

let rating = 0;
let filled = 0;
let unfilled = 0;

const starContainer = document.getElementById('starContainer');
const smileyContainer = document.getElementById('smileyContainer');
starContainer.appendChild(
    createElements(starCount, i => createElement('div', { class : 'star star-empty', 'data-index': i }), 1)
);
const stars = starContainer.querySelectorAll('.star');
console.log(stars);

starContainer.addEventListener('mouseover', hoverListener);
starContainer.addEventListener('mouseleave', leaveListener);
starContainer.addEventListener('click', clickListener);

function fillStars(count) {
    for(let i = filled; i < count; i++) {
        stars[i].classList.add('star-filled');
        stars[i].classList.remove('star-empty');
    }

    filled = count;
    console.log('filled', filled);

    for(let i = count; i < unfilled; i++) {
        stars[i].classList.add('star-empty');
        stars[i].classList.remove('star-filled');
    }

    unfilled = count;
    console.log('unfilled', unfilled);

}

function clickListener(event) {
    const target = event.target;
    console.log('click: ', target);

    if(target.classList.contains('star')) {
        rating = target.dataset.index;
        setSmiley(rating);
    }
}

function hoverListener(event) {
    const target = event.target;
    // console.log('hover: ', target);
    if(target.classList.contains('star')) {
        const index = target.dataset.index;
        console.log('index', index);
        fillStars(index);
    }
}

function leaveListener(event) {
    fillStars(rating);
}

function setSmiley(rating) {
    const index = Math.ceil((smileys.length * rating) / starCount) - 1;
    smileyContainer.textContent = smileys[index];
}