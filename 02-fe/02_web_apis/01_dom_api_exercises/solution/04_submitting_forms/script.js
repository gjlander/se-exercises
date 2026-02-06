const contactForm = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const messageTextArea = document.querySelector('#message');
const emailInput = document.querySelector('#email');

const output = document.querySelector('#output');
// *   Add an event listener to handle form submission.
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const message = messageTextArea.value.trim();
  const email = emailInput.value.trim();
  try {
    // *   Validate that all fields are not empty.
    if (!name) {
      throw new Error('Name is required');
    }

    if (!email) {
      throw new Error('Message is required');
    }
    if (!message) {
      throw new Error('Message is required');
    }
    //     *   If validation passes, output the form data to the
    // console and display it in the `p` element as a list (`ul`)
    console.log(name, message, email);
    output.innerHTML = `<ul>
    <li>${name}</li>
    <li>${email}</li>
    <li>${message}</li>
    </ul>`;
    output.classList.remove('bg-red-500');
    output.classList.add('bg-green-500');

    //     *   Clear the form fields
    event.target.reset();
  } catch (error) {
    //     *   If not output an error message in the `p` element,
    // style it as an error. Maybe something red and flashy?
    //     *   [Make sure to toggle the error and success styles](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)!
    output.textContent = error.message;
    output.classList.remove('bg-green-500');
    output.classList.add('bg-red-500');
  }
});

// You can work here or download the template
// const contactForm = document.querySelector('#contact-form');
// const nameInput = document.querySelector('#name');
// const messageInput = document.querySelector('#message');
// const emailInput = document.querySelector('#email');

// const output = document.querySelector('#output');

// contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     if (!nameInput.value || !messageInput.value || !emailInput.value) {
//         output.classList.remove('bg-green-500');
//         output.classList.add('bg-red-500');
//         output.textContent = 'Please fill out all fields!';
//     } else {
//         output.innerHTML = `<ul>
//         <li>${nameInput.value}</li>
//         <li>${emailInput.value}</li>
//         <li>${messageInput.value}</li>
//         </ul>`;
//         output.classList.remove('bg-red-500');
//         output.classList.add('bg-green-500');
//     }
//     contactForm.reset();
// });
