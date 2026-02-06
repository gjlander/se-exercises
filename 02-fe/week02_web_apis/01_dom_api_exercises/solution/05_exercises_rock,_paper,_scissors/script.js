// HTML with Tailwind CSS:
// A card at the top to display the score (User vs. Computer).
// A card with three buttons for selecting Rock, Paper, or Scissors.
// An empty card to display the result of each round.
// A button to play the round.

//grab a reference to the play button
const playBtn = document.querySelector('#play-button');
//a NodeList of the button choices
const choiceBtns = document.querySelectorAll('#selection button');
//the div where the game result goes
const resultDiv = document.querySelector('#result');

//initialize a variable to store the player choice, with initial value as an empty string
let playerChoice = '';

// JavaScript:
// Listen for a click on the play button.
playBtn.addEventListener('click', () => {
    // Check if the user selected something; if not, alert the user.
    if (!playerChoice) return alert('Make a selection!');
    resultDiv.textContent = "Here's where the result of the game would go!";
});
// Mark the user selected button in some way.
//iterate over the buttons, and add an event listener to each
choiceBtns.forEach((btn) =>
    btn.addEventListener('click', (e) => {
        //use the id of each button to update player choice
        playerChoice = e.target.id;
        //add border to clicked button
        e.target.classList.add('border-black', 'border-2');
        //iterate over all of the buttons
        for (const otherBtn of choiceBtns) {
            //if the button doesn't match the players choice, remove the border (so only the current choice has the border)
            if (otherBtn.id !== playerChoice)
                otherBtn.classList.remove('border-black', 'border-2');
        }
    })
);
// Randomly select Rock, Paper, or Scissors for the computer.
// Compare the user's selection with the computer's selection.
// Display the result in the output area.
// Update the score and the DOM accordingly.
