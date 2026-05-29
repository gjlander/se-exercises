import Chat from '../components/Chat';
import Form from '../components/Form';

const Home = () => {
    return (
        <div className='p-4 flex flex-col gap-4 h-screen'>
            <Chat />
            <Form />
        </div>
    );
};

export default Home;
