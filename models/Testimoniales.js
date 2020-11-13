import db from '../config/db.js';
import Sequelize from 'sequelize';


export const Testimoniales = db.define('testimoniales', {
    
    nombre: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    }
},

    {
    timestamps: false
    }
);