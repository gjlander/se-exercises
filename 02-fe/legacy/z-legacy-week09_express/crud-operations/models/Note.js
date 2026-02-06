import { DataTypes } from 'sequelize'; // The library provides an object to help you  define types for your model attributes.
import sequelize from '../db/index.js'; // See we needed this
// import User from './User.js';
// Define the Note model
const Note = sequelize.define('Note', {
    // Model attributes are defined here
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Note.belongsTo(User);
// Note.sync(); // Check the block about Model synchronization

export default Note;
