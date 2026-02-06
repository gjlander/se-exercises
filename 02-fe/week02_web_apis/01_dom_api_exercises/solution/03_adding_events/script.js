// Array of 10 random tasks as strings
const tasks = [
    'Complete the project',
    'Attend the meeting',
    'Write a report',
    'Review the code',
    'Fix the bugs',
    'Update the documentation',
    'Plan the next sprint',
    'Conduct user testing',
    'Optimize the performance',
    'Design',
];
const addBtn = document.getElementById('add-item-btn');
const alertBtn = document.getElementById('alert-btn');
const logBtn = document.getElementById('console-btn');
const itemList = document.getElementById('item-list');

let currentTask = 0;
addBtn.addEventListener('click', () => {
    const newTask = document.createElement('li');
    newTask.textContent = tasks[currentTask];
    itemList.appendChild(newTask);
    newTask.scrollIntoView();
    currentTask++;
});

alertBtn.addEventListener('click', () => {
    alert('Do you feel alert?');
});
logBtn.addEventListener('click', () => {
    console.log('Hehe, butts');
});
