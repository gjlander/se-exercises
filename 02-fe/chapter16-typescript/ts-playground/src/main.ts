console.log('Test console override');
console.warn('This is a warning');
console.info('Some info message');
console.error(new Error('This is an error message'));
console.warn({
  message: 'This is a warning with an object',
  code: 404,
  details: 'Not Found'
});
console.log(undefined);
console.error(null);
console.info([1, 2, 3, { a: 'test', b: [4, 5] }]);
class Test {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  greet() {
    console.log(`Hello, ${this.name}!`);
  }
}
const testInstance = new Test('World');
console.log(testInstance);

type Customer = {
  name: string;
  sendEmail(message: string): void;
};

function sendInvoice(customer: Customer): void {
  customer.sendEmail('Your invoice is ready');
}

// sendInvoice({ name: 'Ada Lovelace' });
const button = document.createElement('button');
button.textContent = 'Send Invoice';
button.classList.add(
  'bg-blue-500',
  'hover:bg-blue-900',
  'cursor-pointer',
  'text-white',
  'mt-5',
  'px-4',
  'py-2',
  'rounded'
);
document.body.appendChild(button);

button.addEventListener('click', () => {
  sendInvoice({
    name: 'Paddington Bear',
    sendEmail(message: string) {
      console.log(`Email sent to ${this.name}: ${message}`);
    }
  });
});
