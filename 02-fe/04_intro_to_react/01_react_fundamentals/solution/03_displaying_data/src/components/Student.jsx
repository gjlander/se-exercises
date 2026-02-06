const Student = ({ firstName, lastName, age, course, city, picture }) => {
    return (
        <div className='card'>
            <img src={picture} alt={`${firstName} ${lastName}`} />

            <div className='card-body'>
                <h2>
                    {firstName} {lastName}
                </h2>
                <p>Age: {age}</p>
                <p>City: {city}</p>
                <p>Course: {course}</p>
            </div>
        </div>
    );
};

export default Student;
