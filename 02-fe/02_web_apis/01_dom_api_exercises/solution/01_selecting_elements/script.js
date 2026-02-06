//1. Select Elements and Log to Console:
const heading = document.querySelector('.hero-content h1');
console.log(heading.textContent);

const navLinks = document.querySelectorAll('.nav-list a');

console.log(navLinks);

const btn = document.querySelector('.btn');
console.log(btn);

//2. Modify Styles:
const header = document.querySelector('.header');
header.style.backgroundColor = '#b5651d';

heading.style.fontSize = '3rem';

navLinks.forEach((link) => (link.style.color = '#faf0e6'));
// for (const link of navLinks) {
//     link.style.color = '#faf0e6';
// }

const hero = document.querySelector('.hero-content');
const newP = document.createElement('p');
newP.textContent = 'Open daily from 7 AM to 9 PM.';
hero.appendChild(newP);
