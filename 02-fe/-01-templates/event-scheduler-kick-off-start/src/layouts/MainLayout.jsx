import { useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    const [signedIn, setSignedIn] = useState(false);
    const [user, setUser] = useState();
    const [checkSession, setCheckSession] = useState(true);
    return (
        <div className='bg-slate-600 text-gray-300 flex flex-col min-h-screen'>
            <Navbar
                signedIn={signedIn}
                setSignedIn={setSignedIn}
                user={user}
                setUser={setUser}
            />
            <main className='flex-grow flex flex-col justify-between py-4'>
                <Outlet
                    context={{
                        signedIn,
                        setSignedIn,
                        user,
                        setUser,
                        setCheckSession,
                    }}
                />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
