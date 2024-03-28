'use strict';
const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose'); // Erase if already required


// Declare the Schema of the Mongo model
var UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'Users',
        timestamps: true,
    },
);



//Export the model
module.exports = model('User', UserSchema);
