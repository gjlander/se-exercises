const args = process.argv.slice(2);

if (args.length !== 1) {
    console.error('Can only choose 1 option!');
    return;
}
const playerChoice = args[0].toLowerCase();

const options = ['rock', 'paper', 'scissors'];

if (!options.find((opt) => opt === playerChoice)) {
    console.error('Must select rock, paper, or scissors!');
    return;
}
// console.log(Math.floor(Math.random() * 3));
const compChoice = options[Math.floor(Math.random() * 3)];

// console.log('playerChoice', playerChoice);
// console.log('compChoice', compChoice);

const message = (playerChoice, compChoice, result) => {
    const resultMessage =
        result === 'won'
            ? 'You win! :D'
            : result === 'lost'
            ? 'You lose! :('
            : "It's a draw! :O";
    return `You chose ${playerChoice}. Computer chose ${compChoice}. ${resultMessage}`;
};

switch (true) {
    case playerChoice === 'rock' && compChoice === 'scissors':
    case playerChoice === 'paper' && compChoice === 'rock':
    case playerChoice === 'scissors' && compChoice === 'paper':
        console.log(message(playerChoice, compChoice, 'won'));
        break;

    case playerChoice === 'rock' && compChoice === 'paper':
    case playerChoice === 'paper' && compChoice === 'scissors':
    case playerChoice === 'scissors' && compChoice === 'rock':
        console.log(message(playerChoice, compChoice, 'lost'));
        break;

    default:
        console.log(message(playerChoice, compChoice, 'draw'));
}
