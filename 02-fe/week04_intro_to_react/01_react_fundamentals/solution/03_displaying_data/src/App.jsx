import Student from './components/Student';
import './style.css';

// You can work here or download the template
const studentData = {
    firstName: 'Testy',
    lastName: 'McTest',
    age: 42,
    course: 'Web Development',
    city: 'Berlin',
    picture: 'https://randomuser.me/api/portraits/men/1.jpg',
};

// Your components go here

const App = () => {
    return (
        <div>
            <Student {...studentData} />
        </div>
    );
};

export default App;
