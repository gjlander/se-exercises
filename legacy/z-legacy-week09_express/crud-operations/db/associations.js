import sequelize from './index.js';
import User from '../models/User.js';
import Note from '../models/Note.js';

User.hasMany(Note);
Note.belongsTo(User);

sequelize.sync();
