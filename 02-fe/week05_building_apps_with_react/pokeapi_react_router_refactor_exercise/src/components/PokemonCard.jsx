const PokemonCard = ({ name, sprite, id }) => {
    return (
        <div className='card glass bg-base-100 shadow-xl'>
            <figure>
                <img src={sprite} alt={name} />
            </figure>
            <div className='card-body'>
                <h2 className='card-title'>{name}</h2>
                <p>{`ID: ${id}`}</p>
            </div>
        </div>
    );
};

export default PokemonCard;
