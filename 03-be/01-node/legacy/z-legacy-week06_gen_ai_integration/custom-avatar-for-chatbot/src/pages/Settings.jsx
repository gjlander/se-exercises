import { useOutletContext } from 'react-router-dom';
import ImagePrompt from '../components/ImagePrompt';
const Settings = () => {
    const { base64 } = useOutletContext();
    return (
        <div>
            <h2 className='text-4xl text-center m-4'>Generate an image</h2>
            <ImagePrompt />
            {base64 && (
                <div className='flex flex-col gap-4 p-4'>
                    <button
                        onClick={() =>
                            localStorage.setItem(
                                'avatar',
                                JSON.stringify(base64)
                            )
                        }
                        className='btn btn-secondary'
                    >
                        Set as avatar
                    </button>
                    <img
                        className='m-auto'
                        src={`data:image/png;base64,${base64}`}
                    />
                </div>
            )}
        </div>
    );
};

export default Settings;
