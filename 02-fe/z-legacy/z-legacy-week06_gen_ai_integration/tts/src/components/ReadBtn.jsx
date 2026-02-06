const ReadBtn = ({ content }) => {
    const handleClick = () => {
        console.log(content);
    };
    return (
        <button
            onClick={handleClick}
            className='btn btn-primary btn-outline mt-2'
        >
            Read it to me
        </button>
    );
};

export default ReadBtn;
