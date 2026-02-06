const choiceBtns = document.querySelectorAll('#selection button');
// console.log(choiceBtns);

const playBtn = document.querySelector('#play-button');
const resultDiv = document.querySelector('#result');
const userScore = document.querySelector('#user-score');
const computerScore = document.querySelector('#computer-score');

let playerChoice = '';
let playerWins = 0;
let compWins = 0;

for (const btn of choiceBtns) {
    btn.addEventListener('click', (e) => {
        playerChoice = e.target.id;
        for (const otherBtn of choiceBtns) {
            if (otherBtn.id !== playerChoice)
                otherBtn.classList.remove('border-black', 'border-2');
        }
        e.target.classList.add('border-black', 'border-2');
    });
}

const message = (playerChoice, compChoice, result) => {
    const resultMessage =
        result === 'won'
            ? 'You win! :D'
            : result === 'lost'
            ? 'You lose! :('
            : "It's a draw! :O";
    return `You chose ${playerChoice}. Computer chose ${compChoice}. ${resultMessage}`;
};
playBtn.addEventListener('click', () => {
    if (!playerChoice) return alert('Make a selection!');
    const options = ['rock', 'paper', 'scissors'];
    const compChoice = options[Math.floor(Math.random() * 3)];
    switch (true) {
        case playerChoice === 'rock' && compChoice === 'scissors':
        case playerChoice === 'paper' && compChoice === 'rock':
        case playerChoice === 'scissors' && compChoice === 'paper':
            resultDiv.textContent = message(playerChoice, compChoice, 'won');
            playerWins++;
            userScore.textContent = playerWins;
            return;

        case playerChoice === 'rock' && compChoice === 'paper':
        case playerChoice === 'paper' && compChoice === 'scissors':
        case playerChoice === 'scissors' && compChoice === 'rock':
            resultDiv.textContent = message(playerChoice, compChoice, 'lost');
            compWins++;
            computerScore.textContent = compWins;
            return;

        default:
            resultDiv.textContent = message(playerChoice, compChoice, 'draw');
            return;
    }
});
